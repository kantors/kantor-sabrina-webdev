/**
 * Created by sabrinakantor on 11/14/16.
 */
module.exports = function(app) {
  var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/web-app-maker');

  var UserModel = require("./user/user.model.server")();
  var WebsiteModel =  require("./website/website.model.server")();
  var PageModel = require("./page/page.model.server")();
  var WidgetModel =  require("./widget/widget.model.server")();


  //model map
  var model = {
    UserModel: UserModel,
    WebsiteModel: WebsiteModel,
    PageModel: PageModel,
    WidgetModel: WidgetModel,
  };

  WebsiteModel.setModel(model);
  UserModel.setModel(model);
  PageModel.setModel(model);
  WidgetModel.setModel(model);

  return model;

};