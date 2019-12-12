const { BaseController } = require("@the-medicsoft/webapi-framework");
const { UserModel } = require("../models");

const { AUTH_SECRET_KEY, EXPIRES_IN } = require("../../config/config");
const authHelper = require("rapidify-jwt/lib/utils/auth.helper");

const user = new UserModel();

class UserController extends BaseController {
  constructor() {
    super();
  }

  async login(req,res){
    const token = authHelper.generateToken({
      payload: { email: req.body.email },
      secret: AUTH_SECRET_KEY,
      expiresIn: EXPIRES_IN
    });
    super.sendResponse({req,res,response:{statusCode: 200, success:true,data:{token:token}}});
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
      let response = await user.createUser({ body: req.body });
      response = JSON.parse(JSON.stringify(response));

      if (response) {
        const token = authHelper.generateToken({
          payload: { email: response.data.email },
          secret: AUTH_SECRET_KEY,
          expiresIn: EXPIRES_IN
        });

        response.data.token = token;

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
