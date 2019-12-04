const { BaseConfig } = require("@the-medicsoft/webapi-framework/config");

class Config extends BaseConfig {
  constructor() {
    super();
    this.BASE_API_ROUTE = process.env.BASE_API_ROUTE || "/api";
    this.BASE_ADMIN_ROUTE = process.env.BASE_ADMIN_ROUTE || "/admin";
    this.NODE_MAILER_CONFIG = {
      EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
      FROM_EMAIL_ADDRESS: process.env.FROM_EMAIL_ADDRESS || 'test@test.com',
      FROM_EMAIL_PASSWORD: process.env.FROM_EMAIL_PASSWORD || 'Test@test'
    }
  }
}

module.exports = new Config();
