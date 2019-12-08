const { BaseConfig } = require("@the-medicsoft/webapi-framework/config");

class Config extends BaseConfig {
  constructor() {
    super();
    this.BASE_API_ROUTE = process.env.BASE_API_ROUTE || "/api";
    this.BASE_ADMIN_ROUTE = process.env.BASE_ADMIN_ROUTE || "/admin";

    // jwt auth settings
    this.AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY || "TEST@KEY";
    this.EXPIRES_IN = process.env.EXPIRES_IN || "2d";
  }
}

module.exports = new Config();
