const { Schema } = require("mongoose");

exports.VacancySchema = new Schema({
  vacancy_id: Number,
  vacancy_name: String,
  exp_start: Number,
  exp_end: Number,
  skillset_req: Array,
  skillset_pref: Array
});
