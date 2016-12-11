/**
 * Created by sabrinakantor on 10/19/16.
 */
/**
 * Created by sabrinakantor on 10/13/16.
 */
(function () {
    angular.module("WebAppMaker").controller("WebsiteListController", WebsiteListController)
        .controller("WebsiteEditController", WebsiteEditController)
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (websites) {
                vm.websites = websites;


            }).error(function () {

            });

        }

        init();
    }

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {

            var websitesPromise = WebsiteService.findWebsitesByUser(vm.userId);
            websitesPromise.success(function (websites) {
                vm.websites = websites;
            }).error(function () {

            });

            var websitePromise =  WebsiteService.findWebsiteById(websiteId);
            websitePromise.success(function (website) {

                vm.website = website;
            }).error(function (error) {

            });
        }

        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/" + vm.userId + "/website");


        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId, vm.userId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = $routeParams.uid;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            var websitesPromise = WebsiteService.findWebsitesByUser(vm.userId)
            websitesPromise.success(function (websites) {

                vm.websites = websites;

            }).error(function () {

            });
        }

        init();


        function createWebsite(website) {
            var promise = WebsiteService.createWebsite(userId, website);
            promise.success(function () {
                $location.url("/user/" + userId + "/website");

            }).error(function () {

            });

        }
    }
})();