import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      message: 'Sign up to get started'
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, verified) => {
    if (error) {
      return res.status(401).json({
        message: 'sign in to continue or signup to get started'
      });
    }
    req.userId = verified.sub;
    return next();
  });
};

export default auth;
