import bcrypt from 'bcrypt';
import models from '../models';
import signToken from '../helpers/signToken';

const { User } = models;
/**
 * A class that mannipulates sign in and  sign up
 */
export default class UserController {
  /**
   * Signs up a user
   * @param {Object} req
   * @param {Object} res
   * @returns {json} response
   */
  static signUp(req, res) {
    const {
      email, password, firstName, lastName
    } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    return User.findOrCreate({
      where: { email },
      defaults: {
        email, password: hashPassword, firstName, lastName
      }
    })
      .spread((user, created) => {
        if (created === false) {
          return res.status(401).json({
            message: 'Email already exist try a new one'
          });
        }
        const token = signToken(user);
        const name = `${user.firstName} ${user.lastName}`;
        return res.status(201).json({
          message: 'User has been creaated succesfully',
          token,
          user: {
            id: user.id,
            email: user.email,
            name
          }
        });
      })
      .catch((error) => {
        if (error) {
          return res.status(500).json({
            // error: true,
            message: 'Internal server error',
            error
          });
        }
      });
  }
  /**
   * Signs in a user
   * @param {Object} req
   * @param {Object} res
   * @returns {json} response
   */
  static signIn(req, res) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then((foundUser) => {
        if (!foundUser) {
          return res.status(401).json({
            error: true,
            message: 'Email does not exist'
          });
        } else if (!bcrypt.compareSync(password, foundUser.password)) {
          return res.status(401).json({
            error: true,
            message: 'the password does not match the user'
          });
        }
        const token = signToken(foundUser);
        return res.status(200).json({
          error: false,
          message: 'Login was succesful',
          token,
          user: {
            id: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName
          }
        });
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
}
