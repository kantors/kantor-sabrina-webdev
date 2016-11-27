
module.exports = function() {
  var model = {};
  var mongoose = require("mongoose");
  var PageSchema = require("./page.schema.server.js")();
  var PageModel = mongoose.model("PageModel", PageSchema);

  var api = {
    createPage: createPage,
    findAllPagesForWebsite: findAllPagesForWebsite,
    findPageById: findPageById,
    updatePage: updatePage,
    deletePage: deletePage,
    setModel: setModel,
  };
  return api;

  function setModel (_model) {
    model = _model;
  }

  function createPage (websiteId, page) {
    return PageModel.create(page)
    .then(function(page){
      model.WebsiteModel.findWebsiteById(websiteId).then(
      function(website) {
        website.pages.push(page);
        return website.save();
      }, function(error) {
        console.log(error);
      }
      )
    });
  }

  function findAllPagesForWebsite (websiteId) {

    return model.WebsiteModel.findAllPagesForWebsite(websiteId);
  }


  function findPageById (pageId) {
    return PageModel.findById(pageId);
  }

  function updatePage (pageId, page) {
    return PageModel.update(
    {_id: pageId},
    {
        name: page.name,
        description: page.description,

    }
    );
  }

  function deletePage  (websiteId, pageId) {
    return PageModel.remove({_id: pageId})
    .then(function(pageId){
      model.WebsiteModel.findById(websiteId).then(
      function(websiteId) {
        model.WebsiteModel.update(
        {_id: websiteId},
        { $pull: { '_id': pageId } }
        );
        return website.save();

      }, function(error) {

      }
      )
    });
  }
};