const db = require("../config/db");

// Place Order (Checkout)
const placeOrder = (req, res) => {
  const userId = req.user.id;

  // Get all cart items
  const cartSql = `
    SELECT
      cart.product_id,
      cart.quantity,
      products.price
    FROM cart
    JOIN products
      ON cart.product_id = products.id
    WHERE cart.user_id = ?
  `;

  db.query(cartSql, [userId], (err, cartItems) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch cart",
      });
    }

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Change this later when you implement payment gateway
    const paymentMethod = "Cash on Delivery";

    // Create Order
    const orderSql = `
      INSERT INTO orders (user_id, total, payment_method)
      VALUES (?, ?, ?)
    `;

    db.query(
      orderSql,
      [userId, totalAmount, paymentMethod],
      (err, orderResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Failed to create order",
          });
        }

        const orderId = orderResult.insertId;

        // Prepare order_items values
        const values = cartItems.map((item) => [
          orderId,
          item.product_id,
          item.quantity,
          item.price,
        ]);

        const orderItemsSql = `
          INSERT INTO order_items
          (order_id, product_id, quantity, price)
          VALUES ?
        `;

        db.query(orderItemsSql, [values], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({
              message: "Failed to save order items",
            });
          }

          // Clear Cart
          const clearCartSql = `
            DELETE FROM cart
            WHERE user_id = ?
          `;

          db.query(clearCartSql, [userId], (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                message: "Order placed but cart wasn't cleared",
              });
            }

            res.status(201).json({
              message: "Order placed successfully",
              orderId,
              total: totalAmount,
            });
          });
        });
      }
    );
  });
};

// Get Logged-in User Orders
const getMyOrders = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM orders
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch orders",
      });
    }

    res.json(results);
  });
};


// Get Single Order Details
const getOrderDetails = (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;

  const sql = `
    SELECT
      orders.id AS orderId,
      orders.total,
      orders.payment_method,
      orders.status,
      orders.created_at,
      products.id AS productId,
      products.name,
      products.image,
      order_items.quantity,
      order_items.price
    FROM orders
    JOIN order_items
      ON orders.id = order_items.order_id
    JOIN products
      ON order_items.product_id = products.id
    WHERE orders.id = ? AND orders.user_id = ?
  `;

  db.query(sql, [orderId, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to fetch order details",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(results);
  });
};


module.exports = {
  placeOrder,
  getMyOrders,
  getOrderDetails,
};