import { isEmpty, validateEmail } from './utilHelpers';

/**
 * @description Validates signup
 *
 * @param {string} data
 * @returns {object} isVlaid, error
 */
const validateSignup = data => {
  const error = {};
  const { firstName, lastName, email, password } = data;

  if (!firstName) {
    error.firstName = 'Please enter your firstName';
  }

  if (!lastName) {
    error.lastName = 'Please enter your lastName';
  }

  if (!email || email.trim() === '') {
    error.email = 'Please enter your email';
  } else if (!validateEmail(email)) {
    error.email = 'Please enter a valid email';
  }

  if (!password) {
    error.password = 'Please enter your password';
  } else if (!/\d+/.test(password)) {
    error.password = 'Password must contain a number';
  }

  return { error, isValid: isEmpty(error) };
};

/**
 * @description Validates login
 *
 * @param {string} data
 * @returns {object} isVlaid, error
 */
const validateLogin = data => {
  const { email, password } = data;
  const error = {};

  if (!email) {
    error.email = 'Please enter your email';
  } else if (!validateEmail(email)) {
    error.email = 'Please enter a valid email';
  }

  if (!password) {
    error.password = 'Please enter your password';
  }

  return { error, isValid: isEmpty(error) };
};

export { validateSignup, validateLogin };
