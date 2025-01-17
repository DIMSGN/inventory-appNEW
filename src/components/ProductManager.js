import React, { useState } from "react";
import axios from "axios";
import styles from "./ProductManager.module.css";

const ProductManager = ({ fetchProducts }) => {
    const [newProduct, setNewProduct] = useState({ product_name: "", unit: "", category: "" });

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", newProduct);
            fetchProducts();
            setNewProduct({ product_name: "", unit: "", category: "" });
        } catch (error) {
            console.error("Error adding product:", error);
            alert(`Failed to add product: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Product Manager</h2>
            <form onSubmit={addProduct} className={styles.form}>
                <label className={styles.label}>
                    Product Name:
                    <input
                        type="text"
                        value={newProduct.product_name}
                        onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Unit:
                    <input
                        type="text"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    Category:
                    <input
                        type="text"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>Add Product</button>
            </form>
        </div>
    );
};

export default ProductManager;