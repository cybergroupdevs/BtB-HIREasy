const { BaseController } = require("@the-medicsoft/webapi-framework");

const { VacancyModel } = require("../models");

const vacancy = new VacancyModel();

class VacancyController extends BaseController {
  constructor() {
    super();
  }

  async getVacancies(req, res) {
    try {
      const response = await vacancy.getVacancies();

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async createVacancy(req, res) {
    try {
      const response = await vacancy.createVacancy({ body: req.body });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async updateVacancy(req, res) {
    try {
      const response = await vacancy.updateVacancy({
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
      const response = await vacancy.deleteVacancy({
        id: req.body.id,
        useSoftDelete: false
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }

  async getVacancyById(req, res) {
    try {
      const response = await vacancy.getVacancyById({
        id: req.params.id
      });

      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

module.exports = { VacancyController };
