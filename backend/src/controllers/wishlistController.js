const db = require("../config/db");

// Add to Wishlist
exports.addToWishlist = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const sql = `
    INSERT INTO wishlist (user_id, product_id)
    VALUES (?, ?)
  `;

  db.query(sql, [userId, productId], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          message: "Product already in wishlist",
        });
      }

      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Added to wishlist",
    });
  });
};

// Get Wishlist
exports.getWishlist = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      wishlist.id,
      products.id AS productId,
      products.name,
      products.price,
      products.image,
      products.category
    FROM wishlist
    JOIN products
      ON wishlist.product_id = products.id
    WHERE wishlist.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

// Remove from Wishlist
exports.removeWishlist = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM wishlist WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Removed from wishlist",
      });
    }
  );
};