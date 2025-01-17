import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./Header.module.css";

const Header = ({ products }) => {
    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Product Table", 20, 10);
        doc.autoTable({
            head: [['Product ID', 'Name', 'Amount', 'Unit', 'Category', 'Rules']],
            body: products.map(product => [
                product.product_id,
                product.product_name,
                product.amount,
                product.unit,
                product.category,
                product.rules.map(rule => `${rule.rules} (${rule.comparison} ${rule.amount})`).join(", ")
            ]),
        });
        doc.save("product_table.pdf");
    };

    return (
        <header className={styles.header}>
            <h1>Inventory Management System</h1>
            <button onClick={exportToPDF} className={styles.exportButton}>Export to PDF</button>
        </header>
    );
};

export default Header;