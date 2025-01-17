import React, { useState, useEffect, useRef } from "react";
import ProductManager from "./ProductManager";
import RuleManager from "./RuleManager";
import ProductTable from "./ProductTable";
import Header from "./Header";
import axios from "axios";
import styles from "./MainComponent.module.css";

const MainComponent = () => {
    const [products, setProducts] = useState([]);
    const productTableRef = useRef();

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert(`Failed to fetch products: ${error.response?.data?.error || error.message}`);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className={styles.container}>
            <Header products={products} />
            <div className={styles.productManager}>
                <ProductManager fetchProducts={fetchProducts} />
            </div>
            <div className={styles.productTable}>
                <ProductTable ref={productTableRef} products={products} />
            </div>
            <div className={styles.ruleManager}>
                <RuleManager />
            </div>
        </div>
    );
};

export default MainComponent;