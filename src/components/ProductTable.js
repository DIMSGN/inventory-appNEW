import React, { forwardRef } from "react";
import styles from "./ProductTable.module.css";

const ProductTable = forwardRef(({ products }, ref) => {
    const getRowColor = (rules) => {
        if (rules.length > 0) {
            return rules[0].color; // Assuming the first rule's color should be applied
        }
        return 'transparent'; // Default color if no rules are applied
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
                        <th>Unit</th>
                        <th>Category</th>
                        <th>Rules</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.product_id} style={{ backgroundColor: getRowColor(product.rules) }}>
                            <td>{product.product_id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.amount}</td>
                            <td>{product.unit}</td>
                            <td>{product.category}</td>
                            <td className={styles.rulesCell}>
                                <select className={styles.select}>
                                    {product.rules.map((rule) => (
                                        <option key={rule.rule_id} value={rule.rule_id}>
                                            {rule.rules} ({rule.comparison} {rule.amount})
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default ProductTable;
