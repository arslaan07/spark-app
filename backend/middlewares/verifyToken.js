const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const sessionToken = req.cookies.sessionToken;  

    if (!sessionToken) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
  try {
      const decoded = jwt.verify(sessionToken, process.env.SESSION_TOKEN_SECRET);
      req.user = decoded;
      next();
  } catch (err) {
      console.error('Token verification error:', err);
      res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken