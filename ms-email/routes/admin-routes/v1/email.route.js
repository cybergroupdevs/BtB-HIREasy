const { EmailController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const email = new EmailController();

  fastify.post("/sendEmails", email.sendEmail);

  done();
};
