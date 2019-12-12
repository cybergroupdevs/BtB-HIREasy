const {
    RESUME_PARSER_URL
  } = require("../config/config").microservice_config.RESUME_PARSER;

module.exports = [
    {
        prefix: `/resumeparser`,
        target: RESUME_PARSER_URL
    }
];
