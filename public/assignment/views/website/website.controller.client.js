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
        var websiteId = parseInt($routeParams.wid);
        vm.updateWebsite = updateWebsite;
        vm.removeWebsite = removeWebsite;

        function init() {

            var websitePromise = WebsiteService.findWebsiteById(websiteId)
            websitePromise.success(function (website) {
                vm.website = website;
            }).error(function () {

            });

            var websitesPromise = WebsiteService.findWebsitesByUser(vm.userId);
            websitesPromise.success(function (websites) {
                vm.websites = websites;
            }).error(function () {

            });


        }

        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/" + vm.userId + "/website");


        }

        function removeWebsite(wid) {
            WebsiteService.removeWebsite(wid);
            $location.url("/user/" + vm.userId + "/website");
        }
    }

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;


        function init() {
            var promise = WebsiteService.findWebsitesByUser(vm.userId);
            promise.success(function (websites) {
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