const { EmailController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const email = new EmailController();

  fastify.post("/emails", email.sendEmail);

  done();
};
