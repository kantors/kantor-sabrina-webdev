/**
 * Created by sabrinakantor on 11/5/16.
 */
module.exports = function (app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/:pageId/widget", sortWidgets);
    app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;

        model.WidgetModel.createWidget(pageId, widget)
        .then(function(widgetId) {
            console.log(widgetId);
            res.json(widgetId);
        }, function(error) {
            console.log(error);
        });

    }

    function findAllWidgetsForPage(req, res) {

        var pageId = req.params.pageId;


        model.WidgetModel.findAllWidgetsForPage(pageId)
        .then(
        function(widgets) {
            res.json(widgets);
        },
        function(error) {
            res.status(400).send(error);
        }
        );

    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        model.WidgetModel
        .findWidgetById(widgetId)
        .then(
        function(widget) {
            res.json(widget);
        },
        function(error) {
            res.status(400).send(error);
        }
        );

    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.widgetId;

        model.WidgetModel
        .updateWidget(widgetId, widget)
        .then(
        function(widget) {
            res.send(200);
        },
        function(error) {
            res.status(404).send(error);
        }
        );

    }


    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        model.WidgetModel.deleteWidget(widgetId).then(function(widgets) {
            res.json(pages);
        })

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



        res.redirect('../assignment/#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget');
    }

    function sortWidgets(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        var pageId = req.params.pageId;
        model.WidgetModel.reorderWidget(pageId, start, end).then(function() {
            res.json(pages);
        });


    }

}