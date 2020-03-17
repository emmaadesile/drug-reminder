import TokenHelper from './tokenHelper';

/**
 * @description Authenticate a user
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} next
 */
const authenticateUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({
      status: 'error',
      error: 'no token provided'
    });
  }

  if (authorization.split(' ')[0] !== 'Bearer') {
    return res.status(401).json({
      status: 'error',
      error: 'invalid authorization format'
    });
  }

  // eslint-disable-next-line prefer-destructuring
  const token = authorization.split(' ')[1];

  const decoded = TokenHelper.decodeToken(token);

  if (typeof decoded.id === 'undefined') {
    return res.status(403).json({
      status: 'error',
      error: 'token has missing properties'
    });
  }

  if (decoded) {
    const { id, firstName, lastName, email } = decoded;
    req.userId = id;
    req.firstName = firstName;
    req.lastName = lastName;
    req.email = email;

    return next();
  }
};

export default authenticateUser;
