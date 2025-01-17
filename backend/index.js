const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");
const ruleRoutes = require("./routes/rules");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/rules", ruleRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
