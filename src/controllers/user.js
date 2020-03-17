import bcrypt from 'bcrypt';
import { User } from '../models';
import { validateSignup, validateLogin } from '../utils/validation';
import TokenHelper from '../utils/tokenHelper';

/**
 * @description user controller
 * @class UserController
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
              message: 'signup was successful',
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

  /**
   * @description Login method for new users
   * @param  {object} req body of the user's request
   * @param  {object} res  body of the response message
   * @param  {function} next next function to be called
   * @returns {object} The body of the response message
   */
  static login(req, res, next) {
    const { error, isValid } = validateLogin(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: 'error',
        error
      });
    }
    const { email, password } = req.body;

    return User.findOne({
      where: { email }
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            status: 'error',
            error: 'incorrect email or password'
          });
        }
        bcrypt.compare(password, user.hashedPassword).then(isMatch => {
          if (isMatch) {
            const {
              dataValues,
              dataValues: { id, hashedPassword, ...rest }
            } = user;
            const token = TokenHelper.generateToken(dataValues);
            return res.status(200).json({
              status: 'success',
              message: 'login successful',
              user: { ...rest, token }
            });
          }
          return res.status(401).json({
            status: 'error',
            error: 'incorrect email or password'
          });
        });
      })
      .catch(next);
  }
}

export default UserController;
