const emailServiceRoutes = require("./email.service.routes");
const hrServiceRoutes = require("./hr.service.routes");
const dashboardRoutes = require('./dashboard.routes');
const resumeParser = require('./resumeParser.service.routes');

module.exports = [].concat(emailServiceRoutes).concat(hrServiceRoutes).concat(dashboardRoutes).concat(resumeParser);
