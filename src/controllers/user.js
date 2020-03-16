import { User } from '../models';
import { validateSignup } from '../utils/validation';
import TokenHelper from '../utils/tokenHelper';

/**
 * @description user controller
 * @class UsersController
 */
class UserController {
  /**
   * @description Signup method for new users
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static signup(req, res, next) {
    const { error, isValid } = validateSignup(req.body);
    const { firstName, lastName, email, password } = req.body;
    const newUser = { firstName, lastName, email, hashedPassword: password };

    if (!isValid) {
      return res.status(400).json({
        error,
        status: 'error'
      });
    }

    return User.findOne({
      where: { email }
    })
      .then(user => {
        if (user) {
          return res.status(409).json({
            status: 'error',
            error: 'Email already exists'
          });
        }
        return User.create(newUser)
          .then(newUserDetails => {
            const { dataValues } = newUserDetails;
            // remove hashedPassword from the user details
            const { id, hashedPassword, ...rest } = dataValues;
            const token = TokenHelper.generateToken(dataValues);

            res.status(200).json({
              status: 'success',
              message: 'Signup was successful',
              user: {
                ...rest,
                token
              }
            });
          })
          .catch(next);
      })
      .catch(next);
  }
}

export default UserController;
