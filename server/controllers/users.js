import Users from '../data/users';

/**
 * A class that mannipulates sign in and  sign up
 */
export default class User {
/**
 * @param {int} req the request object
 * @param {int} res the response object
 */
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  /**
  * checks if a user exists and creates a new user if such user does not exist
  * @returns {init} returns error or status 200
 */
  signUp() {
    const findUser = Users.find(user => this.req.body.email === user.email);
    if (findUser) {
      return this.res.status(400).json({ user: 'already exist' });
    }
    Users.push(this.req.body);
    return this.res.status(200).json({ user: 'has been added' });
  }
  /**
  * checks if a user exists and log's the user in
  * @returns {init} returns error or status 200
 */
  signIn() {
    const findUser = Users.find(user => this.req.body.email === user.email
        && this.req.body.password === user.password);
    if (findUser) {
      return this.res.status(200).json({ login: 'sucessful' });
    }
    return this.res.status(404).json({ login: 'details incorrect or sign to get started' });
  }
}
