const { CandidateController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const candidates = new CandidateController();

  fastify.get("/candidates/:id", candidates.selectCandidates);

  done();
};
