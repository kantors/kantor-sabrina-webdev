/**
 * Created by sabrinakantor on 11/18/16.
 */
module.exports = function () {
  var mongoose = require("mongoose");
  var WebsiteSchema = mongoose.Schema({
    name: String,
    description: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref:'PageModel'}],
  });
  return WebsiteSchema;
};
