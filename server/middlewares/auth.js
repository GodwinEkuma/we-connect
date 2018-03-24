import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, verified) => {
      if (error) {
        return res.status(401).json({
          message: 'sign in to continue or signup to get started'
        });
      }
      req.UserId = verified;
      return next();
    });
  }
};

export default auth;
