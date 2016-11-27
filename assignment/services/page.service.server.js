/**
 * Created by sabrinakantor on 11/5/16.
 */
module.exports = function(app, model) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage (req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;


    model.PageModel.createPage(websiteId, page)
    .then(function(page) {
      res.json(page);
    })
  }

  function findAllPagesForWebsite (req, res) {
    var websiteId = req.params.websiteId;

    model.PageModel.findAllPagesForWebsite(websiteId)
    .then(
    function(pages) {
      res.json(pages);
    },
    function(error) {
      res.status(400).send(error);
    }
    );
  }

  function findPageById (req, res) {
    var pageId = req.params.pageId;

    model.PageModel
    .findPageById(pageId)
    .then(
    function(page) {
      res.json(page);
    },
    function(error) {
      res.status(400).send(error);
    }
    );
  }

  function updatePage (req, res) {
    var page = req.body;
    var pageId = req.params.pageId;

    model.PageModel
    .updatePage(pageId, page)
    .then(
    function(page) {
      res.send(200);
    },
    function(error) {
      res.status(404).send(error);
    }
    );

  }

  function deletePage (req, res) {
     var pageId = req.params.pageId;
     var websiteId = req.params.websiteId;
    model.PageModel.deletePage(websiteId, pageId).then(function(pages) {
      res.json(pages);
    })

  }


};