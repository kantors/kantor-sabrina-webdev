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
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);

        }
        init();
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.websiteId = $routeParams["wid"];
        var pageId = parseInt($routeParams.pid);
        var userId    = parseInt($routeParams.uid);
        vm.updatePage = updatePage;
        vm.removePage = removePage;

        function init() {
            vm.page = PageService.findPageById(pageId);
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);


        }
        init();


        function updatePage(page) {

            PageService.updatePage(pageId ,page);
            console.log(vm.page);
            $location.url("/user/"+userId+"/website/"+ vm.websiteId +"/page" );
        }

        function removePage(wid) {
            PageService.removePage(wid);
            $location.url("/user/"+userId+"/website/"+ vm.websiteId +"/page" );
        }
    }

    function NewPageController($routeParams, PageService) {
        var vm = this;

    }
})();
