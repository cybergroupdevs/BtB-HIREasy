const fastify = require('fastify')({})
const { microservice_config }=require('./config/config');
const PORT = process.env.PORT || 8080
 
// required plugin for HTTP requests proxy
fastify.register(require('fastify-reply-from'))
 
// gateway plugin
fastify.register(require('k-fastify-gateway'), {
 
  middlewares: [
    require('cors')()
  ],
 
  routes: [{
    prefix: '/email',
    prefixRewrite: '',
    target: `http://${microservice_config.email_microService_URL}:${microservice_config.email_microService_PORT}/admin/v1`,
    middlewares: [],
    hooks: {
      // async onRequest (req, reply) {},
      // onResponse (req, reply, res) { reply.send(res) }
    }
  }]
})
 
// start the gateway HTTP server
fastify.listen(PORT).then((address) => {
  console.log(`API Gateway listening on ${address}`)
})