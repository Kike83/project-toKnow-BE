const jwt = require("jsonwebtoken");

const { JWT_TOKEN } = process.env

const sign = (payload = {} ) => {
    return jwt.sign(payload, JWT_TOKEN, {expiresIn: "10h"})
}

const verify = (token) => {
    return jwt.verify(token, JWT_TOKEN)
}

module.exports = { sign, verify }