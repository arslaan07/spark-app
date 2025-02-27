const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;  

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
  if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken