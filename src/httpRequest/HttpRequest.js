import axios from "axios";

export const getMedicines = async (setProducts) => {
    const response = await axios
        .get("http://localhost:8080/medicines/filter?pageNumber=1&pageSize=100")
        .catch((err) => console.log(err));

    if (response) {
        const products = response.data;

        console.log("Products: ", products);
        console.log("Products[0]: ", products[0]);
        console.log("Products[15]: ", products[15].treatmentList[0].treatmentName);
        setProducts(products);
    }
};

export const getHistories = async (setProducts) => {
    const response = await axios
        .get("http://localhost:8080/histories?pageNumber=1&pageSize=10")
        .catch((err) => console.log(err));

    if (response) {
        const products = response.data;

        console.log("Products: ", products);
        console.log("Products[0]: ", products[0]);
        setProducts(products);
    }
};