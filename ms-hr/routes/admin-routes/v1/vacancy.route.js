const { VacancyController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const vacancies = new VacancyController();

  fastify.get("/vacancies", vacancies.getVacancies);

  fastify.post("/vacancies", vacancies.createVacancy);

  fastify.patch("/vacancies", vacancies.updateVacancy);

  fastify.delete("/vacancies", vacancies.deleteVacancy);  

  done();
};
