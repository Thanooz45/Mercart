const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
};

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters long",
      });
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    db.query(
      "SELECT id FROM users WHERE email = ?",
      [email.toLowerCase()],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        if (result.length > 0) {
          return res.status(409).json({
            success: false,
            message: "Email already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name.trim(), email.toLowerCase(), hashedPassword],
          (err) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Unable to register user",
              });
            }

            return res.status(201).json({
              success: true,
              message: "User registered successfully",
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email.toLowerCase()],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        const user = result[0];

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: "Invalid Password",
          });
        }

        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        res.cookie("token", token, {
          ...cookieOptions,
          maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ================= LOGOUT =================

const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// ================= GET PROFILE =================

const getProfile = (req, res) => {
  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json(result[0]);
    }
  );
};

// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.user.id;

  try {
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required",
      });
    }

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "UPDATE users SET name=?, email=?, password=? WHERE id=?",
        [name.trim(), email.toLowerCase(), hashedPassword, id],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Database Error",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
          });
        }
      );
    } else {
      db.query(
        "UPDATE users SET name=?, email=? WHERE id=?",
        [name.trim(), email.toLowerCase(), id],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Database Error",
            });
          }

          return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
          });
        }
      );
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};
