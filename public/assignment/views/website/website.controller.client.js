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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);

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
            vm.website = WebsiteService.findWebsiteById(websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            console.log(vm.websites);
        }
        init();

        function updateWebsite(website) {
            WebsiteService.updateWebsite(website);
            $location.url("/user/"+vm.userId+"/website");
        }

        function removeWebsite(wid) {
            WebsiteService.removeWebsite(wid);
            $location.url("/user/"+vm.userId+"/website");
        }
    }

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;


        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        init();

        function createWebsite(website) {

            WebsiteService.createWebsite(userId, website);

            $location.url("/user/"+userId+"/website");
        }
    }
})();