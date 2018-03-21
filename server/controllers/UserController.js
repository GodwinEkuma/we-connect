import users from '../data/users';
import models from '../models';

const { User } = models;
/**
 * A class that mannipulates sign in and  sign up
 */
export default class UserController {
  /**
   * Signs up a user
   * @param {*} req
   * @param {*} res
   * @returns {json} response
   */
  static signUp(req, res) {
    const {
      email, password, firstName, lastName
    } = req.body;
    User.findOne({ where: { email } })
      .then((foundUser) => {
        if (foundUser) {
          return res.status(403).json({
            error: true,
            message: 'A user with email already exist try a new email'
          });
        } else if (!foundUser) {
          User.create({
            email,
            password,
            firstName,
            lastName
          })
            .then((newUser) => {
              if (newUser) {
                return res.status(201).json({
                  error: false,
                  message: 'sign up succesful',
                  user: {
                    id: newUser.id,
                    email: newUser.email,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                  }
                });
              }
            })
            .catch((error) => {
              if (error) {
                return res.status(500).json({
                  error: true,
                  message: 'Internal server error'
                });
              }
            });
        }
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
    users.forEach((aUser) => {
      if (email === aUser.email && password === aUser.password) {
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
