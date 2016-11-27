/**
 * Created by sabrinakantor on 11/18/16.
 */
module.exports = function () {
  var mongoose = require("mongoose");
  var PageSchema = mongoose.Schema({
    name: String,
    description: String,
  });
  return PageSchema;
};
