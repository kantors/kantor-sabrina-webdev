/**
 * Created by sabrinakantor on 10/19/16.
 */
/**
 * Created by sabrinakantor on 10/13/16.
 */
(function () {
    angular.module("WebAppMaker").controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {
                vm.pages = pages;
            }).error(function () {

            });


        }

        init();
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];
        var pageId = parseInt($routeParams.pid);

        vm.updatePage = updatePage;
        vm.removePage = removePage;

        function init() {

            var pagePromise = PageService.findPageById(pageId);
            pagePromise.success(function (page) {
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


        function updatePage(page) {
            PageService.updatePage(pageId, page);
            console.log(vm.page);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function removePage(wid) {
            PageService.removePage(wid);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        var userId = parseInt($routeParams.uid);
        var websiteId = parseInt($routeParams.wid);
        var pageId = parseInt($routeParams.pid);
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);

            vm.page = PageService.findPageById(pageId);
        }

        init();


        function createPage(page) {
            page._id = (new Date()).getTime();
            page.uid = userId;
            PageService.createPage(page);
            $location.url("/user/" + userId + "/website/" + websiteId + "/page");
        }
    }
})();
