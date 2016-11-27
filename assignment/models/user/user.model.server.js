/**
 * Created by sabrinakantor on 11/14/16.
 */
module.exports = function() {
  var model = {};
  var mongoose = require("mongoose");
  var UserSchema = require("./user.schema.server")();
  var UserModel = mongoose.model("UserModel", UserSchema);

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    removeUser: removeUser,
    findAllWebsitesForUser: findWebsitesForUser,
    setModel: setModel,
  };
  return api;

  function setModel (_model) {
    model = _model;
  }

  function findWebsitesForUser (userId) {
    return UserModel.findById(userId).populate("websites", "name").exec();

  }

  function createUser (user) {
    return UserModel.create(user);
  }

  function findUserById (userId) {
    return UserModel.findById(userId);
  }

  function findUserByCredentials (username, password) {
    return UserModel.find({
      username: username,
      password: password,
    });
  }

  function updateUser (userID, user) {
    return UserModel.update({
      _id: userID
    }, {
      first: user.first,
      last: user.last,
      email: user.email,
    }
    );
  }

  function removeUser (userId) {
    return UserModel.remove({_id: userId});
  }

};