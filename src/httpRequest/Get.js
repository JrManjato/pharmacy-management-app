import axios from "axios";

export const getMedicines = async (setProducts, page, nbrPerPage) => {
    const response = await axios
        .get("http://localhost:8080/medicines?pageNumber="+page+"&pageSize="+nbrPerPage)
        .catch((err) => console.log(err));

    if (response) {
        const medicines = response.data;
        setProducts(medicines);
    }
};

export const getMedicinesByThreshold = async (setProducts, threshold, pageNumber, pageSize) => {
    const response = await axios
        .get("http://localhost:8080/medicines/"+threshold+"?pageNumber="+pageNumber+"&pageSize="+pageSize)
        .catch((err) => console.log(err));

    if (response) {
        const medicines = response.data;
        setProducts(medicines);
    }    
};

export const getTreatments = async (setProducts) => {
    const response = await axios
        .get("http://localhost:8080/histories?pageNumber=1&pageSize=10")
        .catch((err) => console.log(err));

    if (response) {
        const histories = response.data;
        setProducts(histories);
    }
};