const { BaseController } = require("@the-medicsoft/webapi-framework");
const {
  CandidateModel,
  VacancyModel,
  SelectedCandidateModel
} = require("../models");

const candidate = new CandidateModel();
const vacancy = new VacancyModel();
const selectedCandidate = new SelectedCandidateModel();

class CandidateController extends BaseController {
  constructor() {
    super();
  }

  async selectCandidates(req, res) {
    try {
      var vacancyInfo = await vacancy.getVacancyById({
        id: req.params.id
      });
      var vacancyDetails = vacancyInfo.data[0];
      var allCandidates = await candidate.getCandidatesByExperience(
        vacancyDetails.minRequiredExperience,
        vacancyDetails.maxRequiredExperience,
        vacancyDetails.skills
      );
      var candidates = new Array();
      allCandidates.data.forEach(element => {
        candidates.push({
          isSent: false,
          emailAddress: element.email,
          fullName: element.name,
          phone: element.contact
        });
      });
      var data = {
        vacancyId: req.params.id,
        candidates: candidates
      };
      const response = await selectedCandidate.createRecord({ body: data });
      super.sendResponse({ req, res, response });
    } catch (err) {
      super.sendErrorResponse({ req, res, errResponse: err });
    }
  }
}

module.exports = { CandidateController };
