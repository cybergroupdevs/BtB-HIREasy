const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");

const { selectedCandidate } = require("../schemas");

const consts = require('../helpers/constants.js');
const emailHelper=require('../helpers/emailHelper.js');

class EmailModel extends BaseModel {
  constructor() {
    super(model("selectedCandidate", selectedCandidate));
  }

  async getEmails(Id) {
    const emails = await super.readByQuery({ query: { vacancyId: Id } });

    if (emails.length) {
      return {
        isSuccess: true,
        data: emails,
        message: ""
      };
    } else {
      return { 
        isSuccess:false,
        message: consts.NonFound_Message
      };
    }
  }

  async sendEmails(Id) {
    // const response = await super.create({ body });
    const emails= await this.getEmails(Id);
    if(emails.isSuccess){
      emails.data["candidate"].forEach(candidate=>{
        emailHelper.sendEmails(candidate.emailAddress)
      })
      
    }

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
