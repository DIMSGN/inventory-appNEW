const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Get all rules
router.get("/", (req, res) => {
    const query = "SELECT * FROM rules";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new rule
router.post("/", (req, res) => {
    const { product_id, rules, comparison, amount, color } = req.body;
    if (!product_id || !rules || !comparison || !amount || !color) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = "INSERT INTO rules (product_id, rules, comparison, amount, color) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [product_id, rules, comparison, amount, color], (err, results) => {
        if (err) {
            console.error("Error adding rule:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Rule added", id: results.insertId });
    });
});

// Delete a rule
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM rules WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error deleting rule:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Rule not found" });
        }
        res.status(200).json({ message: "Rule deleted" });
    });
});

module.exports = router;
