import axios from "axios";

export const PostMedicine = async () => {
    const response = await axios
        .get("http://localhost:8080/create-medicine",
            {
                "medicineName": "testPost",
                "treatmentName": ["maux d'estomac", "maux de tete"],
                "admissionName": "injectables",
                "compartmentName": "C2"
            }
        )
        .catch((err) => console.log(err));

    if (response) {
        const medicines = response.data;
    }
};