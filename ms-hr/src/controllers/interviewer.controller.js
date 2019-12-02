const { BaseController } = require("@the-medicsoft/webapi-framework");

const { InterviewerModel } = require("../models");

const interviewer = new InterviewerModel();

class InterviewerController extends BaseController {
  constructor() {
    super();
  }

  async getInterviewers(req, res) {
    try {
      const response = await interviewer.getInterviewers();

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async createInterviewer(req, res) {
    try {
      const response = await interviewer.createInterviewer({ body: req.body });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async updateInterviewer(req, res) {
    try {
      const response = await interviewer.updateInterviewer({
        id: req.body.id,
        body: req.body
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async deleteInterviewer(req, res) {
    try {
      const response = await interviewer.deleteInterviewer({
        id: req.body.id,
        useSoftDelete: false
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

module.exports = { InterviewerController };
