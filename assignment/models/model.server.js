/**
 * Created by sabrinakantor on 11/14/16.
 */
module.exports = function(app) {
  var mongoose = require('mongoose');

  // this is the default connection string for local database
  var connectionString = 'mongodb://127.0.0.1:27017/test';

  // then check for one of the environment variables
  // if it exists, then you override the connection string
  if(process.env.MLAB_USERNAME) {
    var username = process.env.MLAB_USERNAME;
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://'+
    process.env.MLAB_USERNAME + ':' +
    process.env.MLAB_PASSWORD +
    '@ds129018.mlab.com:29018/webdevnu';
  }



  mongoose.connect(connectionString);

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