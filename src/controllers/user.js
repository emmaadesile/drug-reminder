import { Users } from '../models';

class UserController {
  /**
   * @description Signup method for new users
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static signup(req, res, next) {
    const newUser = {
      firstName: 'dave',
      lastName: 'batista',
      email: 'davebatista@mail.com',
      password: 'davebatista'
    };
    return Users.create(newUser).then(userDetails => {
      res.status(200).json({
        status: 'success',
        message: 'Signup was successful',
        user: userDetails
      });
    });
  }
}

export default UserController;
