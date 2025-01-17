import React from "react";
import ProductManager from "./ProductManager";
import RuleManager from "./RuleManager";
import ProductTable from "./ProductTable";

const MainComponent = () => {
    const productTableRef = React.useRef();

    const fetchProducts = () => {
        if (productTableRef.current) {
            productTableRef.current.fetchProducts();
        }
    };

    return (
        <div>
            <ProductManager fetchProducts={fetchProducts} />
            <RuleManager />
            <ProductTable ref={productTableRef} />
        </div>
    );
};

export default MainComponent;