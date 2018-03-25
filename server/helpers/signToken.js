import jwt from 'jsonwebtoken';

const signToken = (user) => {
  if (user) {
    return jwt.sign({
      sub: user.id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 30)
    }, process.env.JWT_SECRET);
  }
};

export default signToken;
