import axios from "axios";
import { success, error } from "../components/ux/Message";

export const PostTreatment = async (treatmentName) => {
    const response = await axios
        .post("http://localhost:8080/treatment",
            {
                "treatmentName": treatmentName,
            }
        )
        .catch((err) => console.log(err));

    if (response) {
        success(treatmentName + " a été ajouté aux listes des traitements.");
    } else {
        error("L'opération a échoué.")
    }
};