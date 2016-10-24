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
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "createUser": createUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            users.push(user);

            console.log(users);
        }

        function findUserByCredentials(username, password) {

            for (var u in users) {
                var user = users[u];

                if (user.username === username && user.password === password) {
                    return user;
                }


            }


            return null;

        }

        function findUserById(userId) {
            var found = false;
            for (var u in users) {
                var user = users[u];

                if (user._id === userId) {
                    return user;
                    found = true;
                }

            }
            if (!found) {
                return null;
            }
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var user = users[u];
                if (user.username === username) {
                    return user;
                }

                else {
                    return null;
                }
            }

        }

        function updateUser(userId, newUser) {

            for (var u in users) {
                var OldUser = users[u];
                if (user._id === userId) {
                    OldUser = newUser;
                }
            }

        }

        function deleteUser(userID) {

            for (var u in users) {
                var user = users[u];
                if (user._id === userID) {
                    users.splice(parseInt(u), 1);
                }
            }

        }
    }
})();