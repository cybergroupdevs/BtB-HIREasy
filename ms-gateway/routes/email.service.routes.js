const { EMAIL_SERVICE_URL } = require("../config/config").microservice_config;

module.exports = [
  {
    prefix: "/email/admin",
    target: `${EMAIL_SERVICE_URL}/admin`
  },
  {
    prefix: "/email/api",
    target: `${EMAIL_SERVICE_URL}/api`
  }
];
