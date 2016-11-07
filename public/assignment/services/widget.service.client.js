/**
 * Created by sabrinakantor on 10/19/16.
 */
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
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            "createWidget": createWidget,
            "findWidgetsForPage": findWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "removeWidget": removeWidget,
            "sort" : sort,
        };

        return api;


        function createWidget(widget) {
            console.log("sadd");
            var url = "/api/page/" + widget.pageId + "/widget";
            console.log(url);
            return $http.post(url, widget);

        }


        function findWidgetsForPage(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;

            return $http.get(url);

        }


        function updateWidget( widget) {
            var url = "/api/widget/" + widget._id;
            $http.put(url, widget);
        }

        function removeWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            $http.delete(url);
        }

        function sort(start, end) {
            var url = "/api/widget?start=START&end=END"
            url = url.replace("START", start)
              .replace("END", end);
            $http.put(url);
        }

    }

})();