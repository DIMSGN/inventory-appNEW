const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Get all products with their associated rules
router.get("/", (req, res) => {
    const query = `
        SELECT p.product_id, p.product_name, p.unit, p.category, p.amount,
               r.id AS rule_id, r.rules, r.comparison, r.amount AS rule_amount, r.color
        FROM products p
        LEFT JOIN rules r ON p.product_id = r.product_id
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: err.message });
        }
        try {
            const products = results.reduce((acc, row) => {
                const product = acc.find(p => p.product_id === row.product_id);
                if (product) {
                    product.rules.push({
                        rule_id: row.rule_id,
                        rules: row.rules,
                        comparison: row.comparison,
                        amount: row.rule_amount,
                        color: row.color
                    });
                } else {
                    acc.push({
                        product_id: row.product_id,
                        product_name: row.product_name,
                        unit: row.unit,
                        category: row.category,
                        amount: row.amount,
                        rules: row.rule_id ? [{
                            rule_id: row.rule_id,
                            rules: row.rules,
                            comparison: row.comparison,
                            amount: row.rule_amount,
                            color: row.color
                        }] : []
                    });
                }
                return acc;
            }, []);
            res.json(products);
        } catch (processingError) {
            console.error("Error processing results:", processingError);
            res.status(500).json({ error: processingError.message });
        }
    });
});

// Add a new product
router.post("/", (req, res) => {
    const { product_name, unit, category, amount } = req.body;
    if (!product_name || !unit || !category || amount === undefined) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = "INSERT INTO products (product_name, unit, category, amount) VALUES (?, ?, ?, ?)";
    db.query(query, [product_name, unit, category, amount], (err, results) => {
        if (err) {
            console.error("Error adding product:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Product added", id: results.insertId });
    });
});

// Other routes...

module.exports = router;