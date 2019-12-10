const { BASE_ADMIN_ROUTE } = require("../../../config/config");

const registerOptions = { prefix: `${BASE_ADMIN_ROUTE}/v1` };

module.exports = fastify => {
  fastify.register(require("./vacancy.route"), registerOptions);
  fastify.register(require("./interviewer.route"), registerOptions);
  fastify.register(require("./user.route"), registerOptions);
  fastify.register(require("./candidate.route"), registerOptions);
};
