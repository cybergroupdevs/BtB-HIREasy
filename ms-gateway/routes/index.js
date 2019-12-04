const emailServiceRoutes = require("./email.service.routes");
const hrServiceRoutes = require("./hr.service.routes");

module.exports = [].concat(emailServiceRoutes).concat(hrServiceRoutes);
