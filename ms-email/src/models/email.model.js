const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");

const { selectedCandidate } = require("../schemas");

const consts = require('../helpers/constants.json');

class EmailModel extends BaseModel {
  constructor() {
    super(model("selectedCandidate", selectedCandidate));
  }

  async getEmails(Id) {
    const emails = await super.readByQuery({ query: { vacancyId: Id } });

    if (emails.length) {
      return super.success({
        total: emails.length,
        data: emails,
        message: ""
      });
    } else {
      super.notFound({ message: "No Vacancies Found" });
    }
  }

  async sendEmails({ body }) {
    const response = await super.create({ body });

    if (response) {
      return super.success({
        message: consts.email.success
      });
    } else {
      super.fail({ message: "Error: Vacancy Not Posted" });
    }
  }

}

module.exports = { EmailModel };
