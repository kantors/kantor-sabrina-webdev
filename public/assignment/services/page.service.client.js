/**
 * Created by sabrinakantor on 10/19/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "541", "name": "Post 4", "websiteId": "567", "description": "Lorem"}
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "removePage": removePage
        };
        return api;
        function createPage(websiteID, page) {

            websites.push({
                "_id": page._id,
                "name": page.name,
                "websiteId": websiteID,
                "description": page.description
            })

        }

        function findPageByWebsiteId(websiteId) {

            var result = [];

            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    result.push(pages[p]);


                }
            }
            return result;
        }

        function findPageById(pageId) {

            for (var p in pages) {
                var page = pages[p];

                if (parseInt(page._id) === pageId) {
                    return page;

                }
            }

            return null;
        }


        function updatePage(pageId, newPage) {
            var oldPage;

            for (var p in pages) {
                oldPage = pages[p];
                if (parseInt(oldPage._id) === pageId) {
                    oldPage = newPage;

                }
            }

        }

        function removePage(pageId) {

            for (var p in pages) {
                var page = pages[p];
                if (page._id === pageId) {
                    pages.splice(parseInt(p), 1);
                }
            }

        }
    }
})();