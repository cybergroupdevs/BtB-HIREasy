class Config {
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.IS_NODE_ENV_LOWER = this.isNodeEnvLower();

    // check if server runnig on HEROKU
    this.HEROKU = process.env.HEROKU || false;

    if (this.IS_NODE_ENV_LOWER && !this.HEROKU) {
      require("dotenv").config();
    }

    this.HOST = process.env.HOST || "0.0.0.0";
    this.PORT = process.env.PORT || 8080;

    // jwt auth settings
    this.AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY || "TEST@KEY";
    this.EXPIRES_IN = process.env.EXPIRES_IN || "";

    this.microservice_config = {
      EMAIL_SERVICE: {
        EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL,
        EMAIL_SERVICE_BASE_API_PREFIX:
          process.env.EMAIL_SERVICE_BASE_API_PREFIX || "api",
        EMAIL_SERVICE_BASE_ADMIN_PREFIX:
          process.env.EMAIL_SERVICE_BASE_ADMIN_PREFIX || "admin"
      },
      HR_SERVICE: {
        HR_SERVICE_URL: process.env.HR_SERVICE_URL,
        HR_SERVICE_BASE_API_PREFIX:
          process.env.HR_SERVICE_BASE_API_PREFIX || "api",
        HR_SERVICE_BASE_ADMIN_PREFIX:
          process.env.HR_SERVICE_BASE_ADMIN_PREFIX || "admin"
      },
      RESUME_PARSER: {
        RESUME_PARSER_URL: process.env.RESUME_PARSER_URL
      }
    };
  }

  isNodeEnvLower() {
    const envs = {
      dev: "development",
      qa: "testing",
      stage: "staging"
    };

    for (let kenv in envs) {
      if (envs[kenv] === this.NODE_ENV) return envs[kenv] === this.NODE_ENV;
    }
  }
}

module.exports = new Config();
