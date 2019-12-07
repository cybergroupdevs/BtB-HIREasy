const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");
const { UserSchema } = require("../schemas");

class UserModel extends BaseModel {
  constructor() {
    super(model("user", UserSchema));
  }

  async getUsers() {
    const response = await super.read();

    if (response.length) {
      return super.success({ total: response.length, data: response });
    } else if (!response.length) {
      super.notFound();
    } else {
      super.fail();
    }
  }

  async getUserByQuery({ query }) {
    const response = await super.readByQuery({ query });

    if (response.length) {
      return super.success({ total: response.length, data: response });
    } else if (!response.length) {
      super.notFound();
    } else {
      super.fail();
    }
  }

  async createUser({ body }) {
    const response = await super.create({ body });

    if (response) return super.success();
    else super.fail();
  }

  async updateUser({ email, body }) {
    const user = await this.Model.findOne({ email });

    if (user && user.email === email) {
      const response = await super.update({
        id: user._id,
        body
      });

      if (response) return super.success();
    } else {
      super.notFound({ message: `User with email: ${email} doesn't exists` });
    }
  }

  async deleteUser({ email }) {
    const user = await this.Model.findOne({ email });

    if (user && user.email === email) {
      const response = await super.delete({
        id: user._id,
        useSoftDelete: false
      });

      if (response) return super.success();
    } else {
      super.notFound({ message: `User with email: ${email} doesn't exists` });
    }
  }
}

module.exports = { UserModel };
