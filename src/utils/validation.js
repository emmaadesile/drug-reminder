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

/**
 * @description Validates Prescription details
 *
 * @param {string} data
 * @returns {object} isVlaid, error
 */
const validatePrescription = data => {
  const error = {};
  const { drugName, dosePerTime, dosePerDay, usageDuration, usageFreq } = data;
  const frequencies = [
    'Morning',
    'Evening',
    'Morning Evening',
    'Morning Afternoon',
    'Afternoon Evening',
    'Morning Afternoon Evening'
  ];

  if (!drugName || drugName.trim() === '') {
    error.drugName = 'Please enter the drug name';
  }

  if (!dosePerDay) {
    error.dosePerDay = 'Please enter the doses per day';
  }

  if (!dosePerTime) {
    error.dosePerTime = 'Please enter the doses per time';
  }

  if (!usageDuration) {
    error.usageDuration = 'Please the duration of the drug';
  }

  if (!usageFreq || usageFreq.trim() === '') {
    error.usageFreq = 'Please enter the usage frequency';
  } else if (usageFreq && !frequencies.includes(usageFreq)) {
    error.usageFreq = `Usage frequency has to be one of [
      'Morning',
      'Evening',
      'Morning Evening',
      'Morning Afternoon',
      'Afternoon Evening',
      'Morning Afternoon Evening'
    ]`;
  }

  return { error, isValid: isEmpty(error) };
};

export { validateSignup, validateLogin, validatePrescription };
