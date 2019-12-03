class Config {
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.IS_NODE_ENV_LOWER = this.isNodeEnvLower();

    if (this.IS_NODE_ENV_LOWER) {
      require("dotenv").config();
    }

    this.HOST = process.env.HOST || "0.0.0.0";
    this.PORT = process.env.PORT || 8080;

    this.microservice_config = {
      EMAIL_SERVICE_URL: process.env.EMAIL_SERVICE_URL,
      HR_SERVICE_URL: process.env.HR_SERVICE_URL
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
