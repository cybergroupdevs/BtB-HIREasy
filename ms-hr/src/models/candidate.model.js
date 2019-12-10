const { BaseModel } = require("@the-medicsoft/webapi-framework");
const { model } = require("mongoose");
const { CandidateSchema } = require("../schemas");
var constants = require("../helpers/constants");

class CandidateModel extends BaseModel {
  constructor() {
    super(model("candidates", CandidateSchema));
  }

  async getCandidates() {
    const candidates = await super.read();

    if (candidates.length) {
      return super.success({
        total: candidates.length,
        data: candidates,
        message: ""
      });
    } else {
      super.notFound({ message: constants.NonFound_Message });
    }
  }

  async getCandidatesByExperience(minExp, maxExp, skills) {
    var query = { experience: { $lte: maxExp, $gte: minExp } };
    var candidates = await super.readByQuery({ query });
    if (candidates.length) {
      candidates.forEach(element => {
        element.skillCount = this.compareArrayElements(element.skills, skills);
      });
      candidates = candidates
        .filter(candidate => candidate.skillCount > 0)
        .sort((x, y) => {
          return y.skillCount - x.skillCount;
        });
      return super.success({
        total: candidates.length,
        data: candidates,
        message: ""
      });
    } else {
      super.notFound({ message: constants.NonFound_Message });
    }
  }

  compareArrayElements(array1, array2) {
    array1 = array1.map(function(x) {
      return x.toUpperCase().trim();
    });
    array2 = array2.map(function(x) {
      return x.toUpperCase().trim();
    });
    return array1.filter(name => {
      return array2.includes(name);
    }).length;
  }
}

module.exports = { CandidateModel };
