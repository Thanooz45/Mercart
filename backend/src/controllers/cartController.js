const db = require("../config/db");

// Add Product to Cart
const addToCart = (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const sql = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [userId, productId, quantity], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to add product to cart",
      });
    }

    res.status(201).json({
      message: "Product added to cart",
    });
  });
};

// Get Logged-in User Cart
const getCart = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      cart.id,
      cart.quantity,
      products.id AS productId,
      products.name,
      products.price,
      products.image
    FROM cart
    JOIN products
      ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch cart",
      });
    }

    res.json(results);
  });
};

// Update Quantity
const updateCart = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const sql = `
    UPDATE cart
    SET quantity = ?
    WHERE id = ?
  `;

  db.query(sql, [quantity, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to update cart",
      });
    }

    res.json({
      message: "Cart updated successfully",
    });
  });
};

// Remove Item
const removeFromCart = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM cart
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to remove item",
      });
    }

    res.json({
      message: "Item removed from cart",
    });
  });
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
};