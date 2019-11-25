const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");

const { EmailSchema } = require("../schemas");

class EmailModel extends BaseModel {
  constructor() {
    super(model("Email", EmailSchema));
  }

  async getEmails() {
    const emails = await super.read();

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

  async createVacancy({ body }) {
    const response = await super.create({ body });

    if (response) {
      return super.success({
        message: "Vacancy Posted"
      });
    } else {
      super.fail({ message: "Error: Vacancy Not Posted" });
    }
  }

  async updateVacancy({ id, body }) {
    const response = await super.update({ id, body });

    if (response) {
      return super.success({
        message: "Vacancy Updated"
      });
    } else {
      super.notFound({ message: "Vacancy Not Found" });
    }
  }

  async deleteVacancy({ id, useSoftDelete, deleteDoc }) {
    const response = await super.delete({ id, useSoftDelete });

    if (response) {
      return super.success({
        message: "Vacancy Deleted"
      });
    } else {
      super.notFound({ message: "Vacancy Not Deleted" });
    }
  }
}

module.exports = { EmailModel };
