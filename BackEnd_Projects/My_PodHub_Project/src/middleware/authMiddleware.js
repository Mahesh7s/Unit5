const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and attach user info to req
exports.authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
      return res.status(401).json({ ok: false, message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
      name: decoded.name
    };

    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ ok: false, message: "Invalid or expired token" });
  }
};

// Middleware to check user roles
exports.roleMiddleware = (allowedRoles = []) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ ok: false, message: "You do not have permission to perform this action" });
  }
  next();
};
