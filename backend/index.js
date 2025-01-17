const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());
const ruleRoutes = require("./routes/rules");
app.use("/api/rules", ruleRoutes);

// Use product routes
app.use("/api/products", productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
