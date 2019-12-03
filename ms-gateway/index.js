const fastify = require("fastify")({});

const { PORT } = require("./config/config");

// required plugin for HTTP requests proxy
fastify.register(require("fastify-reply-from"));

// gateway plugin
fastify.register(require("k-fastify-gateway"), {
  middlewares: [require("cors")()],

  routes: require("./routes")
});

// start the gateway HTTP server
fastify.listen(PORT).then(address => {
  console.log(`API Gateway listening on ${address}`);
});
