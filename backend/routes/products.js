const express = require("express");
const db = require("../db/connection");
const router = express.Router();

// Get all products
router.get("/", (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new product
router.post("/", (req, res) => {
    const { product_name, unit, category } = req.body;
    if (!product_name || !unit || !category) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const query = "INSERT INTO products (product_name, unit, category) VALUES (?, ?, ?)";
    db.query(query, [product_name, unit, category], (err, results) => {
        if (err) {
            console.error("Error adding product:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Product added", id: results.insertId });
    });
});

// Delete a product
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE product_id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted" });
    });
});

module.exports = router;
