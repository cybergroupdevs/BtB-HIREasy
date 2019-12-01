const { InterviewerController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const interviewers = new InterviewerController();

  fastify.get("/interviewers", interviewers.getInterviewers);

  fastify.post("/interviewers", interviewers.createInterviewer);

  fastify.patch("/interviewers", interviewers.updateInterviewer);

  fastify.delete("/interviewers", interviewers.deleteInterviewer);

  done();
};
