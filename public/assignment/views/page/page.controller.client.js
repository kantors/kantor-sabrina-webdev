/**
 * Created by sabrinakantor on 10/19/16.
 */
/**
 * Created by sabrinakantor on 10/13/16.
 */
(function () {
    angular.module("WebAppMaker").controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {

                vm.pages = pages.pages;
            }).error(function () {
            });

        }

        init();
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        var pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.removePage = removePage;
        vm.createPage = createPage;

        function init() {

            var pagePromise = PageService.findPageById(pageId);
            pagePromise.success(function (page) {
                console.log(page);
                vm.page = page;
            }).error(function () {

            });

            var pagesPromise = PageService.findPageByWebsiteId(vm.websiteId);
            pagesPromise.success(function (pages) {
                vm.pages = pages;
            }).error(function () {
            });
        }

        init();


        function updatePage() {
            console.log(vm.page);
            var pagePromise = PageService.updatePage(pageId, vm.page);
            pagePromise.success(function () {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

            }).error(function () {

            });

        }

        function removePage(wid) {
            PageService.removePage(wid);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


        function createPage() {
            var pagePromise = PageService.createPage(vm.websiteId, vm.page);
            pagePromise.success(function () {
               $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");

            }).error(function () {

            });

        }
    }

})();
