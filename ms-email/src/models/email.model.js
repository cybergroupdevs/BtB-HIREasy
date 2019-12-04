const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");

const { selectedCandidate } = require("../schemas");

const consts = require('../helpers/constants.js');
const { EmailHelper } = require('../helpers/emailHelper.js');

class EmailModel extends BaseModel {
  constructor() {
    super(model("selectedCandidate", selectedCandidate));
  }

  async getEmails(Id) {
    const emails = await super.readByQuery({ query: { vacancyId: Id } });

    if (emails.length) {
      return {
        isSuccess: true,
        data: emails[0],
        message: ""
      };
    } else {
      return {
        isSuccess: false,
        message: consts.NonFound_Message
      };
    }
  }

  async sendEmails(query) {
    const emails = await super.readByQuery({ query });
    const emailHelper = new EmailHelper();

    if (emails.length) {
      for (let candidate of emails[0].candidates) {
        try {
          await emailHelper.sendEmails(candidate.emailAddress);

          // Set flag 'isSent' to true. To indicate email has been sent to the candidate.
          await this.Model.updateOne({
            vacancyId: query.vacancyId,
            "candidates._id": candidate._id,
            "candidates.emailAddress": candidate.emailAddress
          }, {
            "candidates.$.isSent": true
          });
        } catch (error) {
          super.fail({ message: error.message });
        }
      }

      return super.success({
        message: consts.Mail_Success
      });
    } else {
      super.fail({ message: "Error: Email Not Sent" });
    }
  }
}

module.exports = { EmailModel };
