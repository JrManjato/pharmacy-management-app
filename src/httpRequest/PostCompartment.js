import axios from "axios";
import { success, error } from "../components/ux/Message";

export const PostCompartment = async (compartmentName) => {
    const response = await axios
        .post("http://localhost:8080/compartment",
            {
                "compartmentName": compartmentName,
            }
        )
        .catch((err) => console.log(err));

        if (response) {
            success(compartmentName + " a été ajouté aux listes des compartiments.");
        } else {
            error("L'opération a échoué.")
        }
};