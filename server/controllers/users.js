import users from '../data/users';

/**
 * A class that mannipulates sign in and  sign up
 */
export default class User {
  /**
   * Signs up a user
   * @param {*} req
   * @param {*} res
   * @returns {json} response
   */
  static signUp(req, res) {
    const { email } = req.body;
    users.forEach((user) => {
      if (user.email === email) {
        return res.status(403).json({
          message: 'A user with that email already exists',
        });
      }
    });
    users.push(req.body);
    return res.status(201).json({
      message: 'User Created Successfully'
    });
  }
  /**
   * Signs in a user
   * @param {*} req
   * @param {*} res
   * @returns {json} response
   */
  static signIn(req, res) {
    const { email, password } = req.body;
    users.forEach((user) => {
      if (email === user.email && password === user.password) {
        return res.status(200).json({
          message: 'Logged in successfully'
        });
      }
    });
    return res.status(400).json({
      message: 'Unable to Log in'
    });
  }
}
