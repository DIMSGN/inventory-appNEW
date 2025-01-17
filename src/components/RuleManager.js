import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./RuleManager.module.css";

const RuleManager = () => {
    const [rules, setRules] = useState([]); // Define rules and setRules state variables
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
        if (!newRule.product_id || newRule.amount === undefined || !newRule.color) {
            alert("Product ID, Amount, and Color are required");
            return;
        }
        try {
            await axios.post("http://localhost:5000/api/rules", newRule);
            fetchRules();
            setNewRule({ product_id: "", rules: "", comparison: "<=", amount: 0, color: "#FFFFFF" });
        } catch (error) {
            console.error("Error adding rule:", error);
            alert(`Failed to add rule: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Rule Manager</h2>
            <form onSubmit={addRule} className={styles.form}>
                <div className={styles.formRow}>
                    <label className={styles.label}>
                        Product ID:
                        <input
                            type="text"
                            value={newRule.product_id}
                            onChange={(e) => setNewRule({ ...newRule, product_id: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Name (Optional):
                        <input
                            type="text"
                            value={newRule.rules}
                            onChange={(e) => setNewRule({ ...newRule, rules: e.target.value })}
                            className={styles.input}
                        />
                    </label>
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
                    <button type="submit" className={styles.button}>Add Rule</button>
                </div>
            </form>
        </div>
    );
};

export default RuleManager;
