import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import styles from "./ProductTable.module.css";

const ProductTable = forwardRef((props, ref) => {
    const [products, setProducts] = useState([]);
    const [rules, setRules] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert(`Failed to fetch products: ${error.response?.data?.error || error.message}`);
        }
    };

    const fetchRules = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/rules");
            setRules(response.data);
        } catch (error) {
            console.error("Error fetching rules:", error);
            alert(`Failed to fetch rules: ${error.response?.data?.error || error.message}`);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchRules();
    }, []);

    useImperativeHandle(ref, () => ({
        fetchProducts,
    }));

    const applyRules = (product) => {
        for (const rule of rules) {
            if (rule.product_id === product.product_id && evaluateRule(product.amount, rule)) {
                return rule.color;
            }
        }
        return "#FFFFFF"; // Default color if no rule matches
    };

    const evaluateRule = (amount, rule) => {
        switch (rule.comparison) {
            case ">":
                return amount > rule.amount;
            case "<":
                return amount < rule.amount;
            case "=":
                return amount === rule.amount;
            case ">=":
                return amount >= rule.amount;
            case "<=":
                return amount <= rule.amount;
            case "!=":
                return amount !== rule.amount;
            default:
                return false;
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            alert(`Failed to delete product: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleEditClick = (product) => {
        // Placeholder function for edit functionality
        console.log("Edit product:", product);
    };

    return (
        <div className={styles.container}>
            <h2>Product Table</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Color</th>
                        <th>Unit</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id} style={{ backgroundColor: applyRules(product) }}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.amount}</td>
                            <td>{product.color}</td>
                            <td>{product.unit}</td>
                            <td>{product.category}</td>
                            <td>
                                <button className={styles.editButton} onClick={() => handleEditClick(product)}>Edit</button>
                                <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default ProductTable;
