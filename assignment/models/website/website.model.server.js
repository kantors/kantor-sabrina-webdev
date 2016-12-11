/**
 * Created by sabrinakantor on 11/18/16.
 */
module.exports = function() {
  var model = {};
  var mongoose = require("mongoose");
  var WebsiteSchema = require("./website.schema.server")();
  var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);

  var api = {
    createWebsite: createWebsite,
    findAllWebsitesForUser: findAllWebsitesForUser,
    findWebsiteById: findWebsiteById,
    updateWebsite: updateWebsite,
    deleteWebsite: deleteWebsite,
    findAllPagesForWebsite: findAllPagesForWebsite,
    setModel: setModel,
  };

  return api;

  function setModel (_model) {
    model = _model;
  }

  function createWebsite (userId, website) {
    return WebsiteModel.create(website)
    .then(function(website) {
      model.UserModel.findUserById(userId).then(
      function(user) {

        user.websites.push(website);
        return user.save();
      }, function(error) {
        console.log(error);
      }
      )
    });
  };

  function findAllWebsitesForUser (userId) {
    return model.UserModel.findAllWebsitesForUser(userId);
  }

  function findWebsiteById (websiteId) {
    return WebsiteModel.findById(websiteId);
  }

  function updateWebsite (websiteId, website) {
    return WebsiteModel.update({
      _id: websiteId
    }, {
      name: website.name,
      description: website.description,
    }
    );
  }

  function deleteWebsite (userId, websiteId) {
    return WebsiteModel.remove({_id: websiteId})
    .then(function(websitesId) {
      model.UserModel.findUserById(userId).then(
      function(user) {
        model.UserModel.update(
        {_id: userId},
        {$pull: {'_id': websitesId}}
        );
        return user.save();
      }, function(error) {
        console.log(error);
      })
    });
  }

  function findAllPagesForWebsite (websiteId) {
    return WebsiteModel.findById(websiteId).populate("pages", "name").exec();
  }
};