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

    function WebsiteService($http) {


        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "removeWebsite": deleteWebsite
        };


        return api;

        function createWebsite( userId ,website) {
            var url = "/api/user/" +userId +"/website";
           return $http.post(url, website);

        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);

        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(website) {
            var url = "/api/website/" + website._id;
            $http.put(url, website);

        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            $http.delete(url);
        }
    }
})();