const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");
const { SelectedCandidatesSchema } = require("../schemas");
var constants = require("../helpers/constants");

class SelectedCandidateModel extends BaseModel {
  constructor() {
    super(model("selectedcandidates", SelectedCandidatesSchema));
  }

  async createRecord({ body }) {
    const response = await super.create({ body });

    if (response) {
      return super.success({
        message: constants.Success_Message
      });
    } else {
      super.fail({ message: constants.Error_Message });
    }
  }
}

module.exports = { SelectedCandidateModel };
