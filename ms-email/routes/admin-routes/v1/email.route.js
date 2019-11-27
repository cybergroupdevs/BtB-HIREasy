const { EmailController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const email = new EmailController();

  fastify.get("/email", email.getCandidates);

  fastify.post("/email", email.sendEmail);

  done();
};
