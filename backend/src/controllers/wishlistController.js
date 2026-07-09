const db = require("../config/db");

// Add to Wishlist
exports.addToWishlist = (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      message: "Product ID is required",
    });
  }

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

      console.error(err);

      return res.status(500).json({
        message: "Failed to add to wishlist",
      });
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
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Failed to fetch wishlist",
      });
    }

    res.json(result);
  });
};

// Remove from Wishlist
exports.removeWishlist = (req, res) => {
  console.log("Params:", req.params);

  const userId = req.user.id;
  const productId = req.params.productId;

  console.log("User ID:", userId);
  console.log("Product ID:", productId);

  db.query(
    "DELETE FROM wishlist WHERE user_id = ? AND product_id = ?",
    [userId, productId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Database error",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Wishlist item not found",
        });
      }

      res.json({
        message: "Removed from wishlist",
      });
    }
  );
};