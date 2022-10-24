import axios from "axios";
import { success, error } from "../components/ux/Message";

export const putMedicines = async (setProducts, idMedicine, medicineName, treatmentList, admissionName, compartmentName) => {

    const treatmentNameTable = [];

    treatmentList.map((elt) => treatmentNameTable.push(elt.treatmentName));

    console.log(idMedicine);
    console.log(medicineName);
    console.log(treatmentNameTable);
    console.log(admissionName);
    console.log(compartmentName);

    const response = await axios
        .put("http://localhost:8080/modify-medicine",
            {
                "idMedicine": 12,
                "medicineName": medicineName,
                "treatmentName": ["maux d'estomac", "maux de tete"],
                "admissionName": "injectables",
                "compartmentName": "C2"
            })
        .catch((err) => console.log(err));

    if (response) {
        success("L'élément a bien été modifié !");
    } else {
        error("L'opération a échoué.")
    }
};

export const putMedicinesTrafic = async (idMedicine, description, operation, quantity, scale, setTes, tes) => {

    const response = await axios
        .put("http://localhost:8080/medicine/" + scale + "/" + idMedicine,
            {
                "description": description,
                "operation": operation,
                "quantity": quantity
            })
        .catch((err) => console.log(err));

    if (response) {
        tes = tes + 1;
        setTes(tes);
        if (scale == "replenishement") {
            success("Le médicament a bien été approvisionné !");
        }else if (scale == "consumption"){
            success("Le médicament a bien été exporté !");
        } else {
            error("L'opération a échoué.")
        }
    } else {
        error("L'opération a échoué.")
    }
};