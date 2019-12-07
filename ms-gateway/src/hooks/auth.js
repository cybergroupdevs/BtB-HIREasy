const _ = require("lodash");
const jwt = require("jsonwebtoken");

const { AUTH_SECRET_KEY, EXPIRES_IN } = require("../../config/config");

module.exports = fastify => {
  fastify.addHook("onRequest", (req, res, done) => {
    console.log(extractToken(req));

    done();
  });
};

function generateToken(email, data) {
  try {
    tokendata = {
      email: email
    };

    return jwt.sign({ tokendata }, AUTH_SECRET_KEY, {
      expiresIn: EXPIRES_IN
    });
  } catch (err) {
    throw err;
  }
}

function extractToken(req) {
  const tokenHeaders = ["x-access-token", "authorization", "token", "auth"];

  let token = "";

  _.map(tokenHeaders, tokeHeader => {
    const keyTokenInReq = _.findKey(req, tokeHeader);

    if (keyTokenInReq) {
      token = req[keyTokenInReq][tokeHeader];
    }
  });

  return token ? token : false;
}

function verifyToken(token) {
  try {
    let result;
    jwt.verify(token, AUTH_SECRET_KEY, (err, decoded) => {
      if (err) {
        result = {
          success: false,
          message: "Token is invalid"
        };
      } else {
        result = {
          decoded
        };
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}
