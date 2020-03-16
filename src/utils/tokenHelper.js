import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.JWT_SECRET;

/**
 * Token helper utility class
 *
 * @export
 * @class TokenHelper
 */
class TokenHelper {
  /**
   * Generates jwt token
   *
   * @static
   * @param {object} user
   * @returns {string} jwt token
   * @memberof TokenHelper
   */
  static generateToken(user) {
    const { id, firstName, lastName, email } = user;
    const token = jwt.sign({ id, firstName, lastName, email }, secret, {
      expiresIn: '24h'
    });

    return token;
  }

  /**
   * Decode jwt token
   *
   * @static
   * @param {object} user
   * @returns {string} decoded user id or error if invalid
   * @memberof TokenHelper
   */
  static decodeToken(token) {
    return jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return {
          error: new Error(err),
          status: 401
        };
      }
      return decoded;
    });
  }
}

export default TokenHelper;
