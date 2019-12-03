const { HR_SERVICE_URL } = require("../config/config").microservice_config;

module.exports = [
  {
    prefix: "/hr/admin",
    target: `${HR_SERVICE_URL}/admin`
  },
  {
    prefix: "/hr/api",
    target: `${HR_SERVICE_URL}/api`
  }
];
