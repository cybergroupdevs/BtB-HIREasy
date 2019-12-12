const fastify = require("fastify")({});

const { PORT, AUTH_SECRET_KEY } = require("./config/config");

const dashboard = require('./services/dashboard.service');

// required plugin for HTTP requests proxy
fastify.register(require("fastify-reply-from"));

// gateway plugin
fastify.register(require("k-fastify-gateway"), {
  middlewares: [],

  routes: require("./routes")
});

// cors
fastify.register(require("fastify-cors"));

fastify.register(require("rapidify-jwt"), {
  secret: AUTH_SECRET_KEY,
  ignoreRoutes: [
    {
      url: "/hr/admin/v1/users"
    }
  ]
});

// start the gateway HTTP server
fastify.listen(PORT).then(address => {
  console.log(`API Gateway listening on ${address}`);
});

fastify.get('/admin/v1/dashboard', async (req, res) => {
  res.send({
    data: await dashboard.dashboardData()
  });
});