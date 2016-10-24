/**
 * Created by sabrinakantor on 10/13/16.
 */
(function () {
    angular.module("WebAppMaker").controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            console.log(username);
            console.log(password);
            if (user === null) {
                vm.error = "No such user";
            } else {
                $location.url("/user/" + user._id);
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
            if (username !== undefined || password !== undefined) {
                var user = {
                    _id: Date.now().toString(),
                    username: username,
                    password: password,
                    firstName: username,
                    lastName: "Wonder"
                };
                UserService.createUser(user);

                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Missing field";
            }

        }
    }


    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }

        init();
    }
})();