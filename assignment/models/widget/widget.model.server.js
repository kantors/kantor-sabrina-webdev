/**
 * Created by sabrinakantor on 11/18/16.
 */

module.exports = function() {
  var model = {};
  var mongoose = require("mongoose");
  var WidgetSchema = require("./widget.schema.server.js")();
  var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

  var api = {
    createWidget: createWidget,
    findAllWidgetsForPage: findAllWidgetsForPage,
    findWidgetById: findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
    reorderWidget: reorderWidget,
    setModel: setModel,
  };
  return api;

  function setModel (_model) {
    model = _model;
  }

  function createWidget (pageId, widget) {
    widget.pageId = pageId;

    return WidgetModel.create(widget);


  }

  function findAllWidgetsForPage (pageId) {
    return WidgetModel.find({pageId: pageId});

  }

  function findWidgetById (widgetId) {
    return WidgetModel.findById(widgetId);
  }

  function updateWidget (widgetId, widget) {
    return WidgetModel.update(
    {_id: widgetId},
    {
          text: widget.text,
          name: widget.name,
          text: widget.text,
          placeholder: widget.placeholder,
          description: widget.description,
          url: widget.url,
          width: widget.width,
          height: widget.height,
          size: widget.size,
          class: widget.class,
          icon: widget.icon,
          deletable: widget.deletable,
          formatted: widget.formatted


    }
    );
  }

  function reorderWidget(pageId, start, end) {
    WidgetModel.find({pageId: pageId, index: start});
    widgets.splice(end, 0, widgets.splice(start, 1)[0]);
  }

  function deleteWidget(widgetId) {
    console.log(widgetId);
    return WidgetModel.remove({_id: widgetId});
  }
};