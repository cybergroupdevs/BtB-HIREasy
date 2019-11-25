const { BaseConfig } = require("@the-medicsoft/webapi-framework/config");

class Config extends BaseConfig {
  constructor() {
    super();
    this.BASE_API_ROUTE = process.env.BASE_API_ROUTE || "/api";
    this.BASE_ADMIN_ROUTE = process.env.BASE_ADMIN_ROUTE || "/admin";
  }
}

module.exports = new Config();
