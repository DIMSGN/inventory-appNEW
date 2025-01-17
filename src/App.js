import React, { useState, useEffect } from "react";
import ProductManager from "./components/ProductManager";
import RuleManager from "./components/RuleManager";
import ProductTable from "./components/ProductTable";
import axios from "axios";

const App = () => {
    const [products, setProducts] = useState([]);

    // Fetch products from the backend
    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Inventory Management System</h1>
            <ProductTable products={products} setProducts={setProducts} fetchProducts={fetchProducts} />
            <ProductManager fetchProducts={fetchProducts} />
            <RuleManager />
            
        </div>
    );
};

export default App;
