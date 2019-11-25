const { EmailController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const email = new EmailController();

  fastify.get("/email", email.getVacancies);

  fastify.post("/email", email.createVacancy);

  fastify.patch("/email", email.updateVacancy);

  fastify.delete("/email", email.deleteVacancy);

  done();
};
