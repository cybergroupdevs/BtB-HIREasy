const { 
  HR_SERVICE_URL,
  HR_SERVICE_BASE_API_PREFIX,
  HR_SERVICE_BASE_ADMIN_PREFIX
} = require("../config/config").microservice_config.HR_SERVICE;

module.exports = [
  {
    prefix: `/hr/${HR_SERVICE_BASE_ADMIN_PREFIX}`,
    target: `${HR_SERVICE_URL}/${HR_SERVICE_BASE_ADMIN_PREFIX}`
  },
  {
    prefix: `/hr/${HR_SERVICE_BASE_API_PREFIX}`,
    target: `${HR_SERVICE_URL}/${HR_SERVICE_BASE_API_PREFIX}`
  }
];
