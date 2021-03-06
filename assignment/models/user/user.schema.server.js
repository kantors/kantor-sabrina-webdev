/**
 * Created by sabrinakantor on 11/14/16.
 */
module.exports = function() {
  var mongoose = require("mongoose");

  var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    first: String,
    last:String,
    email: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
  }, {collection: 'usermodel'});

  return UserSchema;

};

