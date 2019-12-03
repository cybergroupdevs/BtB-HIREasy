const { NODE_MAILER_CONFIG } = require('../../config/config');
const nodemailer = require('nodemailer');

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

  async sendEmails(toSelectedCandidate) {
    this.mailOptions.to = toSelectedCandidate;

    await this.transporter.sendMail(this.mailOptions, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Mail Sent');
      }
    });
  };
}

module.exports = { EmailHelper };
