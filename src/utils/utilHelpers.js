const isEmpty = val =>
  (typeof val === 'string' && val.trim() === '') ||
  (typeof val === 'object' && Object.keys(val).length === 0) ||
  (Array.isArray(val) && val.length === 0);

const isUndefined = val => val === undefined || val === null;

const validateEmail = email => {
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const generateId = name => {
  const splitName = name.split(' ').join('-');
  const randomNum = () => Math.floor(Math.random() * (100000 - 15000) + 15000)

  return `${splitName}-${randomNum()}`
};

export { isEmpty, isUndefined, validateEmail, generateId };
