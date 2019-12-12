const { NODE_MAILER_CONFIG } = require("../../config/config");
const nodemailer = require("nodemailer");
const fs = require("fs");
const axios = require("axios");

require.extensions[".html"] = function(module, filename) {
  module.exports = fs.readFileSync(filename, "utf8");
};
const interviewEmail = require("../templates/interviewEmail.html");

class EmailHelper {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: NODE_MAILER_CONFIG.EMAIL_SERVICE,
      auth: {
        user: NODE_MAILER_CONFIG.FROM_EMAIL_ADDRESS,
        pass: NODE_MAILER_CONFIG.FROM_EMAIL_PASSWORD
      }
    });

    this.mailOptions = {
      from: NODE_MAILER_CONFIG.FROM_EMAIL_ADDRESS
    };
  }

  async updateEmail(candidate, vacancyId) {
    var candidateEmail = interviewEmail;

    let vacancyData = await axios.get(
      "http://localhost:5000/admin/v1/vacancies/" + vacancyId
    );
    var vacancy = vacancyData.data.data[0];
    candidateEmail = candidateEmail.replace(
      /{insert job title here}/g,
      vacancy.jobTitle
    );
    candidateEmail = candidateEmail.replace(
      /{insert job description here}/g,
      vacancy.jobDescription
    );
    let date = new Date();
    let interviewDate = date.getDate() + 1;
    interviewDate += "-" + date.getMonth() + "-" + date.getFullYear();
    candidateEmail = candidateEmail.replace(
      /{insert date here}/g,
      interviewDate
    );
    candidateEmail = candidateEmail.replace(/{insert time here}/g, "10:00 AM");
    candidateEmail = candidateEmail.replace(
      /{insert name here}/g,
      candidate.fullName
    );

    return candidateEmail;
  }

  async sendEmails(toSelectedCandidate, vacancyId) {
    this.mailOptions.to = toSelectedCandidate.emailAddress;

    this.mailOptions.html = await this.updateEmail(
      toSelectedCandidate,
      vacancyId
    );

    // this.mailOptions.html = interviewEmail;
    this.mailOptions.subject = "You have been shortlisted!";

    await this.transporter.sendMail(this.mailOptions, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Mail Sent");
      }
    });
  }
}

module.exports = { EmailHelper };
