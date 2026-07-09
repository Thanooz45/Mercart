const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

console.log("Decoded JWT:", decoded);

req.user = decoded;
next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
    }
};

module.exports = authMiddleware;