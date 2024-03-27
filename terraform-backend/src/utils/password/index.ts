import generatePassword from 'generate-password';

const options = {
  length: 12,
  numbers: true,
  symbols: true,
  strict: true,
};

export default () => generatePassword.generate(options);
