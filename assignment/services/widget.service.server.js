/**
 * Created by sabrinakantor on 11/5/16.
 */
module.exports = function (app) {
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
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/widget", sortWidgets);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        var widget = req.body;

        widget._id = (new Date()).getTime();
        widgets.push(widget);

        res.send(widget);

    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;
        var result = [];

        for (var w in widgets) {

            if (widgets[w].pageId == pageId) {
                result.push(widgets[w]);
            }
        }

        res.send(result);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {

            if (widgets[w]._id == widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send("0");
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetID = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetID) {
                widgets[w] = widget;
            }
        }

        res.send(200);

    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
            }
        }
        res.send(200);
    }

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;
        var url = "/uploads/" + filename ;


        for (var w in widgets) {
            if (widgets[w]._id == widgetId) {
                widgets[w].url = url;
                widgets[w].width = width;

            }
        }

        res.redirect('../assignment/#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
    }

    function sortWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);
    }

}