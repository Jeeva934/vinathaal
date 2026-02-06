const dotenv = require('dotenv');
dotenv.config();

const getSecret = async (secretName) => {
    // AWS Secret Manager-ah skip panni local .env use panna
    return process.env[secretName] || null;
};

module.exports = { getSecret };
