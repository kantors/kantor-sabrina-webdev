/**
 * Created by sabrinakantor on 10/13/16.
 */

/* Singleton (single instance) Factory
 Share by name between controllers
 User Data is here until we put it on the server
 * */

(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "removeWebsite": removeWebsite
        };
        return api;

        function createWebsite( userID ,website) {
            websites.push({
                _id: Date.now().toString(),
                name: website.name,
                developerId: userID.toString(),
                description: website.description,
            })

            console.log(website);
            console.log(websites);
        }

        function findWebsitesByUser(userId) {
            var result = [];
            for (var w in websites) {
                if (websites[w].developerId === userId) {
                    result.push(websites[w]);
                }
            }
            return result;
        }

        function findWebsiteById(websiteId) {

            for (var w in websites) {
                var website = websites[w];

                if (parseInt(website._id) === websiteId) {
                    return website;
                }
            }

            return null;
        }

        function updateWebsite(website) {

            for (var w in websites) {
                var oldWebsite = websites[w];

                if (oldWebsite._id === website._id) {

                    oldWebsite = website;

                }
            }
        }

        function removeWebsite(websiteId) {
            for (var w in websites) {
                var website = websites[w];
                if (website._id === websiteId) {
                    websites.splice(parseInt(w), 1);
                }
            }

        }
    }
})();