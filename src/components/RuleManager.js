import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RuleManager.module.css";

const RuleManager = () => {
    const [rules, setRules] = useState([]);
    const [newRule, setNewRule] = useState({ product_id: "", rules: "", comparison: "<=", amount: 0, color: "#FFFFFF" });

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
        fetchRules();
    }, []);

    const addRule = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/rules", newRule);
            fetchRules();
            setNewRule({ product_id: "", rules: "", comparison: "<=", amount: 0, color: "#FFFFFF" });
        } catch (error) {
            console.error("Error adding rule:", error);
            alert(`Failed to add rule: ${error.response?.data?.error || error.message}`);
        }
    };

    const deleteRule = async (rule) => {
        try {
            await axios.delete("http://localhost:5000/api/rules", { data: rule });
            fetchRules();
        } catch (error) {
            console.error("Error deleting rule:", error);
            alert(`Failed to delete rule: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Rule Manager</h2>
            <form onSubmit={addRule} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Product ID:
                        <input
                            type="text"
                            value={newRule.product_id}
                            onChange={(e) => setNewRule({ ...newRule, product_id: e.target.value })}
                            className={styles.input}
                        />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Name:
                        <input
                            type="text"
                            value={newRule.rules}
                            onChange={(e) => setNewRule({ ...newRule, rules: e.target.value })}
                            className={styles.input}
                        />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Comparison Operator:
                        <select
                            value={newRule.comparison}
                            onChange={(e) => setNewRule({ ...newRule, comparison: e.target.value })}
                            className={styles.select}
                        >
                            <option value=">">Greater Than (&gt;)</option>
                            <option value="<">Less Than (&lt;)</option>
                            <option value="=">Equal To (=)</option>
                            <option value=">=">Greater Than or Equal To (&gt;=)</option>
                            <option value="<=">Less Than or Equal To (&lt;=)</option>
                            <option value="!=">Not Equal (!=)</option>
                        </select>
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Amount:
                        <input
                            type="number"
                            value={newRule.amount}
                            onChange={(e) => setNewRule({ ...newRule, amount: parseInt(e.target.value) })}
                            className={styles.input}
                            required
                        />
                    </label>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Color:
                        <input
                            type="color"
                            value={newRule.color}
                            onChange={(e) => setNewRule({ ...newRule, color: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className={styles.button}>Add Rule</button>
            </form>

            <h3 className={styles.heading}>Existing Rules</h3>
            <ul className={styles.list}>
                {rules.map((rule) => (
                    <li key={rule.rule_id} className={styles.listItem} style={{ backgroundColor: rule.color }}>
                        {rule.product_id} - - ("{rule.rules}", "{rule.comparison}", "{rule.amount}", "{rule.color}")
                        <button onClick={() => deleteRule({ rule_id: rule.rule_id })} className={styles.deleteButton}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RuleManager;
