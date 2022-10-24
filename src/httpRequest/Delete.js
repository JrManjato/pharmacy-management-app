import axios from "axios";
import { success, error } from "../components/ux/Message";
import { NavLink, useLocation } from "react-router-dom";

export const DeleteMedicine = async (id, setTes, tes) => {
    console.log(id);
    const response = await axios
        .delete("http://localhost:8080/medicine/" + id)
        .catch((err) => console.log(err));

    if (response) {
        success("Le médicament a été supprimé !");
        tes = tes + 1;
        setTes(tes)
    } else {
        error("L'opération a échoué.")
    }
};

export const DeleteMedicines = async (ids) => {
    const response = await axios
        .delete("http://localhost:8080/medicines/" + ids)
        .catch((err) => console.log(err));

    if (response) {
        success("L'élément a été supprimé !");
    } else {
        error("L'opération a échoué.")
    }
};

export const DeleteHistory = async (id, setTes, tes) => {
    console.log(id);
    const response = await axios
        .delete("http://localhost:8080/history/" + id)
        .catch((err) => console.log(err));

    if (response) {
        success("L'historique a été supprimé !");
        tes = tes + 1;
        setTes(tes)
        // setTimeout(function () { window.location.reload(true); }, 500);
    } else {
        error("L'opération a échoué.")
    }
};

export const DeleteHistories = async (ids) => {
    const response = await axios
        .delete("http://localhost:8080/histories/" + ids)
        .catch((err) => console.log(err));

    if (response) {
        success("L'élément a été supprimé !");
    } else {
        error("L'opération a échoué.")
    }
};