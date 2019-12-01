const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");
const { VacancySchema } = require("../schemas");
var constants = require("../helpers/constants");

class VacancyModel extends BaseModel {
  constructor() {
    super(model("Vacancy", VacancySchema));
  }

  async getVacancies() {
    const vacancies = await super.read();

    if (vacancies.length) {
      return super.success({
        total: vacancies.length,
        data: vacancies,
        message: ""
      });
    } else {
      super.notFound({ message: constants.NonFound_Message });
    }
  }

  async createVacancy({ body }) {
    const response = await super.create({ body });

    if (response) {
      return super.success({
        message: constants.Success_Message
      });
    } else {
      super.fail({ message: constants.Error_Message });
    }
  }

  async updateVacancy({ id, body }) {
    const response = await super.update({ id, body });

    if (response) {
      return super.success({
        message: constants.Update_Message
      });
    } else {
      super.notFound({ message: constants.NonFound_Message });
    }
  }

  async deleteVacancy({ id, useSoftDelete, deleteDoc }) {
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

module.exports = { VacancyModel };
