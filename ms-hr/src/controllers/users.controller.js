const { BaseController } = require("@the-medicsoft/webapi-framework");
const { UserModel } = require("../models");

const user = new UserModel();

class UserController extends BaseController {
  constructor() {
    super();
  }

  async getUsers(req, res) {
    try {
      let response = undefined;

      if (Object.keys(req.query).length) {
        response = await user.getUserByQuery({ query: req.query });
      } else {
        response = await user.getUsers();
      }

      if (response) {
        super.sendResponse({ req, res, response });
      }
    } catch (error) {
      super.sendErrorResponse({ req, res, errResponse: error });
    }
  }

  async createUser(req, res) {
    try {
      const response = await user.createUser({ body: req.body });

      if (response) {
        super.sendResponse({ req, res, response });
      }
    } catch (error) {
      super.sendErrorResponse({ req, res, errResponse: error });
    }
  }

  async updateUser(req, res) {
    try {
      const response = await user.updateUser({
        email: req.params.email,
        body: req.body
      });

      if (response) {
        super.sendResponse({ req, res, response });
      }
    } catch (error) {
      super.sendErrorResponse({ req, res, errResponse: error });
    }
  }

  async deleteUser(req, res) {
    try {
      const response = await user.deleteUser({ email: req.params.email });

      if (response) {
        super.sendResponse({ req, res, response });
      }
    } catch (error) {
      super.sendErrorResponse({ req, res, errResponse: error });
    }
  }
}

module.exports = { UserController };
