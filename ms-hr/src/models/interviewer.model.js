const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");

const { InterviewerSchema } = require("../schemas");

class InterviewerModel extends BaseModel {
  constructor() {
    super(model("Interviewer", InterviewerSchema));
  }

  async getInterviewers() {
    const interviewers = await super.read();

    if (interviewers) {
      return super.success({
        total: interviewers.length,
        data: interviewers,
        message: ""
      });
    } else {
      super.notFound();
    }
  }

  async createInterviewer({ body }) {
    console.log(body);
    const response = await super.create({ body });

    if (response) {
      return super.success({
        message: "Interviewer Added"
      });
    } else {
      super.fail({ message: "Error: Interviewer could not be added" });
    }
  }

  async updateInterviewer({ id, body }) {
    const response = await super.update({ id, body });

    if (response) {
      return super.success({
        message: "Interviewer Updated"
      });
    } else {
      super.notFound({ message: "Interviewer Not Found" });
    }
  }

  async deleteInterviewer({ id, useSoftDelete, deleteDoc }) {
    const response = await super.delete({ id, useSoftDelete });

    if (response) {
      return super.success({
        message: "Interviewer Deleted"
      });
    } else {
      super.notFound({ message: "Interviewer Not Deleted" });
    }
  }
}

module.exports = { InterviewerModel };
