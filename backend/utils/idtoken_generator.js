// function generateIdToken(prefix, length) {
//   if (typeof prefix !== 'string' || typeof length !== 'number' || length <= 0) {
//     throw new Error('Invalid input: Prefix must be a non-empty string and length must be a positive number.');
//   }
  
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   let randomPart = '';

//   for (let i = 0; i < length; i++) {
//     randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
//   }

//   return prefix + randomPart;
// }

// module.exports = generateIdToken;

const crypto = require('crypto');

module.exports = function(prefix, length) {
    const randomPart = crypto.randomBytes(length).toString('hex');
    return `${prefix}_${randomPart}`;
};