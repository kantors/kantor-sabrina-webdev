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

            var promise = UserService.findUserByCredentials(username, password);

            promise.success(function (user) {
                if (user === '0') {
                    vm.error = "No such user";
                } else {
                    $location.url("/user/" + user._id);
                }

            }).error(function () {

                vm.error = "No such user";
            });


        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password) {
          UserService.createUser(username, password).success(function(user){
              $location.url("/user/"+ user._id);
          })
              .error(function(error){

              })

        }
    }


    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        function init() {
            UserService.findUserById(vm.userId).success(function (user) {
                if (user === '0') {
                    vm.error = "No such user";
                } else {
                    vm.user = user;
                }

            }).error(function () {
                vm.error = "No such user";

            });

        }

        init();

        function updateUser() {

            UserService.updateUser(vm.user);
        }

        function deleteUser() {

            UserService.deleteUser(vm.user._id).success(function(){
                $location.url("/login");
            }).error(function () {
                console.log("errrooo");
            });
        }
    }
})();