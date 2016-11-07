/**
 * Created by sabrinakantor on 10/19/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "removePage": removePage
        };
        return api;
        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId +"/page";
            return $http.post(url, page);

        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);

        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }


        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            $http.put(url, page);


        }

        function removePage(pageId) {
            var url = "/api/page/" + pageId;
            $http.delete(url);
        }
    }
})();