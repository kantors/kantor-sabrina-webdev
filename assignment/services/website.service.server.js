/**
 * Created by sabrinakantor on 11/5/16.
 */
module.exports = function (app, model) {

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];


    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.userId;
        model.WebsiteModel.createWebsite(userId, website)
        .then(function(website){
            res.json(website);
        })
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        model.WebsiteModel.findAllWebsitesForUser(userId)
        .then(function(user) {

            res.json(user.websites);
        });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model.WebsiteModel.findWebsiteById(websiteId)
        .then(function(website){
            res.json(website);
        })
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;

        model.WebsiteModel.updateWebsite(websiteId, website).then(
        function(status) {
            res.sendStatus(status);
        }, function(error) {
            res.sendStatus(400).send(error);
        }
        )

    }


    function deleteWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        model.WebsiteModel.deleteWebsite(userId, websiteId).then(function(websites) {
            res.json(websites);
        })
    }


}