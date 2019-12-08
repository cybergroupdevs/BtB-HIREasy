const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");
const { InterviewerSchema } = require("../schemas");
var constants = require("../helpers/constants");

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
    const response = await super.create({ body });

    if (response) {
      return super.success({
        message: constants.Success_Message
      });
    } else {
      super.fail({ message: constants.Error_Message });
    }
  }

  async updateInterviewer({ id, body }) {
    const response = await super.update({ id, body });

    if (response) {
      return super.success({
        message: constants.Update_Message
      });
    } else {
      super.notFound({ message: constants.NonFound_Message });
    }
  }

  async deleteInterviewer({ id, useSoftDelete, deleteDoc }) {
    const response = await super.delete({ id, useSoftDelete });

    if (response) {
      return super.success({
        message: constants.Delete_Message
      });
    } else {
      super.notFound({ message: constants.Error_Message });
    }
  }
}

module.exports = { InterviewerModel };
