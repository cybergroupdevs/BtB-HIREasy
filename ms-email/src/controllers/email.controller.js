const { BaseController } = require("@the-medicsoft/webapi-framework");

const { EmailModel } = require("../models");

const email = new EmailModel();

class EmailController extends BaseController {
  constructor() {
    super();
  }

  async getCandidates(req, res) {
    try {
      const response = await email.getEmails(req.query.id);
      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async sendEmail(req, res) {
    try {
      const response = await email.sendEmails({ body: req.body });
      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

module.exports = { EmailController };
