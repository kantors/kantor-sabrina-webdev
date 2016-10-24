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

    function WidgetService() {
        var widgets = [
            {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "name": "title"},
            {
                "_id": "234",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum",
                "name": "Big Title"
            },
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/", "name": "Image 1"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": "Paragraph 1"},
            {
                "_id": "567",
                "widgetType": "HEADER",
                "pageId": "321",
                "size": 4,
                "text": "Lorem ipsum",
                "name": "Paragraph 2"
            },
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E", "name": "Video 1"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "name": "Paragraph 3"},
            {"_id": "911", "widgetType": "HTML", "pageId": "541", "text": "<p>Lorem ipsum</p>", "name": "Paragraph 4"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsForPage": findWidgetsForPage,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "removeWidget": removeWidget
        };
        return api;
        function createWidget(widget) {

            widgets.push(widget);

        }


        function findWidgetsForPage(pageId) {
            var result = [];
            for (var w in widgets) {
                if (widgets[w].pageId === pageId) {
                    result.push(widgets[w]);
                }
            }
            return result;
        }

        function findWidgetById(widgetId) {

            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    return widget;
                }
            }

            return null;
        }


        function updateWidget(widgetId, newWidget) {
            var oldWidget;
            console.log(widgetId);
            for (var w in widgets) {
                oldWidget = widgets[w];
                if (oldWidget._id === widgetId) {
                    oldWidget = newWidget;

                }
            }


        }

        function removeWidget(widgetId) {
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    widgets.splice(parseInt(w), 1);
                }
            }

        }
    }
})();