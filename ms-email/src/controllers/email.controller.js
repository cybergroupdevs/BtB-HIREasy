const { BaseController } = require("@the-medicsoft/webapi-framework");

const { EmailModel } = require("../models");

const email = new EmailModel();

class EmailController extends BaseController {
  constructor() {
    super();
  }

  async getVacancies(req, res) {
    try {
      const response = await email.getEmails();

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async createVacancy(req, res) {
    try {
      const response = await email.createVacancy({ body: req.body });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async updateVacancy(req, res) {
    try {
      const response = await email.updateVacancy({
        id: req.body.id,
        body: req.body
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async deleteVacancy(req, res) {
    try {
      const response = await email.deleteVacancy({
        id: req.body.id,
        useSoftDelete: false
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

module.exports = { EmailController };
