import React, { useState } from "react";
import axios from "axios";

const EditProductForm = ({ product, onUpdate }) => {
    const [formData, setFormData] = useState(product);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${product.product_id}`, formData);
            onUpdate();
        } catch (error) {
            console.error("Error updating product:", error);
            alert(`Failed to update product: ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={formData.product_name}
                    onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
                />
            </label>
            <label>
                Amount:
                <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                />
            </label>
            <label>
                Unit:
                <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                />
            </label>
            <label>
                Category:
                <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
            </label>
            <button type="submit">Update</button>
        </form>
    );
};

export default EditProductForm;
