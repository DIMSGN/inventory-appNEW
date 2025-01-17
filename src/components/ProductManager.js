import React, { useState } from "react";
import ProductService from "../services/productService";
import styles from "./ProductManager.module.css";

const ProductManager = ({ fetchProducts }) => {
    const [newProduct, setNewProduct] = useState({ product_name: "", unit: "", category: "", amount: 0 });

    const addProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.product_name || !newProduct.unit || !newProduct.category || newProduct.amount === undefined) {
            alert("All fields are required");
            return;
        }
        try {
            await ProductService.addProduct(newProduct);
            fetchProducts();
            setNewProduct({ product_name: "", unit: "", category: "", amount: 0 });
        } catch (error) {
            console.error("Error adding product:", error);
            alert(`Failed to add product: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Product Manager</h2>
            <form onSubmit={addProduct} className={styles.form}>
                <div className={styles.formRow}>
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
                    <label className={styles.label}>
                        Amount:
                        <input
                            type="number"
                            value={newProduct.amount}
                            onChange={(e) => setNewProduct({ ...newProduct, amount: parseInt(e.target.value) })}
                            className={styles.input}
                        />
                    </label>
                    <button type="submit" className={styles.button}>Add Product</button>
                </div>
            </form>
        </div>
    );
};

export default ProductManager;