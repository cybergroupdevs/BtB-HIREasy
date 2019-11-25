const { server } = require("@the-medicsoft/webapi-framework");

// register routes
require("./routes/routeRegister")(server);

module.exports = server;
