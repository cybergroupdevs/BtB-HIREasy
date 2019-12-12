const { UserController } = require("../../../src/controllers");

module.exports = (fastify, option, done) => {
  const users = new UserController();

  fastify.get("/users", users.getUsers);
  
  fastify.post("/login",users.login);

  fastify.post("/users", users.createUser);

  fastify.patch("/users/:email", users.updateUser);

  fastify.delete("/users/:email", users.deleteUser);

  done();
};
