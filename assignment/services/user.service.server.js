/**
 * Created by sabrinakantor on 10/24/16.
 */
module.exports = function(app, model) {

  var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "sabrina", password: "sabrina", firstName: "Jose", lastName: "Annunzi"}
  ];

  app.get("/api/user", findUser);
  app.get("/api/user/:userId", findUserById);
  app.post('/api/user', createUser);
  app.put('/api/user/:userId', updateUser);
  app.delete("/api/user/:userId", deleteUser);


  function findUser (req, res) {
    var params = req.params;
    var query = req.query;
    if(query.password && query.username) {
      findUserByCredentials(req, res)
    } else if(query.username) {
      findUserByUsername(req, res);
    }

  }

  function findUserByUsername (req, res) {
    var username = req.query.username;
    model.UserModel.findUserByUsername(username)
    .then(function(users) {
      if(users) {
        res.json(users[0]);
      }
      else {
        res.send('0');
      }

    }, function (error){
      res.sendStatus(400).send(error);
    });
  }


  function findUserByCredentials (req, res) {
    var username = req.query.username;
    var password = req.query.password;
    model.UserModel.findUserByCredentials(username, password)
    .then(function(users) {
      if(users[0]) {

        res.json(users[0]);
      }
      else {

        res.send('0');
      }

    }, function (error){

      res.sendStatus(403).send(error);
    });
  }

  function findUserById (req, res) {

    var userId = req.params.userId;
    model.UserModel.findUserById(userId).then(
    function (user) {
      if(user) {
        res.send(user);
      } else {
        res.send('0');
      }
    },
    function(error) {
      res.sendStatus(400).send(error);
    }
    );


  }

  function createUser (req, res) {
    var user = req.body;
    model.UserModel.createUser(user).then(
    function(newUser) {
      res.send(newUser);
    },
    function(error) {
      res.sendStatus(400).send(error);
    }
    );


  }

  function updateUser (req, res) {
    var user = req.body;

    var userId = req.params.userId;
    model.UserModel.updateUser(userId, user).then(
    function(status) {
      res.sendStatus(status);
    }, function(error) {
      res.sendStatus(400).send(error);
    }
    )



  }


  function deleteUser (req, res) {
    var uid = req.params.userId;
   model.UserModel.removeUser(uid).then( function(status) {
    res.send(200);
   }, function(error) {
     res.sendStatus(400).send(error);
   });
  }

};
