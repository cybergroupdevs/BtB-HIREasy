const { 
  EMAIL_SERVICE_URL,
  EMAIL_SERVICE_BASE_API_PREFIX,
  EMAIL_SERVICE_BASE_ADMIN_PREFIX
} = require("../config/config").microservice_config.EMAIL_SERVICE;

module.exports = [
  {
    prefix: `/email/${BASE_ADMIN_PREFIX}`,
    target: `${EMAIL_SERVICE_URL}/${EMAIL_SERVICE_BASE_ADMIN_PREFIX}`
  },
  {
    prefix: "/email/api",
    target: `${EMAIL_SERVICE_URL}/${EMAIL_SERVICE_BASE_API_PREFIX}`
  }
];
