/**
 * Created by sabrinakantor on 10/19/16.
 */
/**
 * Created by sabrinakantor on 10/13/16.
 */
(function () {
    angular.module("WebAppMaker").controller("WidgetListController", WidgetListController)
        .controller("WidgetEditController", WidgetEditController)
        .controller("WidgetNewController", WidgetNewController);

    function WidgetListController($routeParams,
                                  WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            var promise = WidgetService.findWidgetsForPage(vm.pageId);
            promise.success(function (widgets) {
                vm.widgets = widgets;

            }).error(function () {

            });


        }

        init();

        function checkSafeHtml(html) {

            return $sce.trustAsHtml(html);

        }

        function checkSafeYouTubeUrl(url) {
            var parts = url.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/" + id;

            return $sce.trustAsResourceUrl(url);
        }
    }

    function WidgetEditController($routeParams,
                                  WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.updateWidget = updateWidget;
        vm.removeWidget = removeWidget;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.success(function (widget) {
                vm.widget = widget;


            }).error(function () {

            });
        }

        init();


        function updateWidget(widget) {
            WidgetService.updateWidget(widget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }

        function removeWidget(wid) {
            WidgetService.removeWidget(wid);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
        }


    }

    function WidgetNewController($routeParams,
                                 WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.createWidget = createWidget;

        function init() {
            var promise = WidgetService.findWidgetById(vm.widgetId);
            promise.success(function (widget) {
                vm.widget = widget;
            }).error(function () {

            });
        }

        init();


        function createWidget(widgetType) {
            if (widgetType === "HEADER") {
                var widget = {
                    "widgetType": "HEADER",
                    "pageId": vm.pageId,
                    "size": 1,
                    "text": "text",
                    "name": "name"
                }
            }

            else if (widgetType === "HTML") {
                var widget = {
                    "widgetType": "HTML",
                    "pageId": vm.pageId,
                    "size": 1,
                    "text": "<p>text</p>",
                    "name": "name"
                }
            }
            else if (widgetType === "IMAGE") {
                var widget = {
                    "widgetType": "IMAGE",
                    "pageId": vm.pageId,
                    "width": "100%",
                    "url": "http://lorempixel.com/400/200/",
                    "name": "name"
                }
            }

            else if (widgetType === "YOUTUBE") {
                var widget = {
                    "widgetType": "YOUTUBE",
                    "pageId": vm.pageId,
                    "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E",
                    "name": "name"
                }

            }
            var promise = WidgetService.createWidget(widget);
            promise.success(function (widget) {
                console.log(widget);
                widgetId = widget._id;
                vm.widgetId = widgetId;
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);

            }).error(function () {

            });


        }

    }
})();
