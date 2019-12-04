const { BASE_ADMIN_ROUTE } = require("../../../config/config");

const registerOptions = { prefix: `${BASE_ADMIN_ROUTE}/v1` };

module.exports = fastify => {
  fastify.register(require("./email.route"), registerOptions);
};
