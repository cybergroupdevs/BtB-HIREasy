const fastify = require("fastify")({});

const { PORT, AUTH_SECRET_KEY } = require("./config/config");

// required plugin for HTTP requests proxy
fastify.register(require("fastify-reply-from"));

// gateway plugin
fastify.register(require("k-fastify-gateway"), {
  middlewares: [require("cors")()],

  routes: require("./routes")
});

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
