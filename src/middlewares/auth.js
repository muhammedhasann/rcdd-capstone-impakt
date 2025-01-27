const jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    return next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid.' });
  }
};

module.exports = isAuthorized;
