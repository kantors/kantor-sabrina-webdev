/**
 * Created by sabrinakantor on 10/24/16.
 */
module.exports = function (app) {

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


    function findUser(req, res) {
        var params = req.params;
        var query = req.query;
        if(query.password && query.username) {
            findUserByCredentials(req, res)
        }else if(query.username) {
            findUserByUsername(req,res);
        }

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for (var u in users) {
            if (users[u].username === username) {
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }


    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for (var u in users) {
            if (users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }

        }
        res.send("0");
    }

    function findUserById(req, res) {

        var userId = req.params.userId;
        for (var u in users) {

            if (users[u]._id == userId) {
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime();
        users.push(user);

        res.send(user);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.userId;
        for(var u in users) {


            if(users[u]._id == uid) {
                users[u] = user;
            }
        }

        res.send(user);

    }


    function deleteUser(req, res) {
        var uid = req.params.userId;
        for(var u in users) {
            if (users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }

}
