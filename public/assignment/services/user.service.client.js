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

    function UserService($http) {


        var api = {
            "createUser": createUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
        };
        return api;

        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };

            return $http.post("/api/user", user);


        }

        function findUserByCredentials(username, password) {

            var url = '/api/user?username=' + username + '&password=' + password;

            return $http.get(url);

        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
           return $http.get(url);

        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);

        }

        function updateUser(user) {

            var url = "/api/user/" + user._id;
            return $http.put(url, user);


        }

        function deleteUser(userId) {
            console.log('h');
            var url = "/api/user/" + userId;
           return $http.delete(url);

        }
    }
})();