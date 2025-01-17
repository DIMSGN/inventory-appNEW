import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

const productService = {
    getProducts: () => {
        return axios.get(API_URL);
    },
    addProduct: (product) => {
        return axios.post(API_URL, product);
    },
    updateProduct: (id, product) => {
        return axios.put(`${API_URL}/${id}`, product);
    },
    deleteProduct: (id) => {
        return axios.delete(`${API_URL}/${id}`);
    },
};

export default productService;
