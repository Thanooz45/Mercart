const db = require("../config/db");

// Get all products
const getAllProducts = (req, res) => {
    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching products",
                error: err.message,
            });
        }

        res.status(200).json(result);
    });
};

const getProductById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching product",
                error: err.message,
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json(result[0]);
    });
};

module.exports = {
    getAllProducts,
    getProductById,
};