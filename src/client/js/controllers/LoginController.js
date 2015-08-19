angular.module("ryso").controller("LoginController", ['$scope', '$state', '$meteor', '$filter',
    function($scope, $state, $meteor, $filter){
        $scope.showErrorMsg = false;
        $scope.errorMsg = '';
        $scope.userName = '';
        $scope.userPasswd = '';

        $scope.login = function () {
            $scope.userName = $scope.userName || '';
            $scope.userPasswd = $scope.userPasswd || '';
            Meteor.loginWithPassword($scope.userName, $scope.userPasswd, function (exception) {
                if (exception) {
                    console.log('LoginException: ', exception);

                    $scope.showErrorMsg = true;
                    switch (exception.error) {
                        case 403: 
                            $scope.errorMsg = 'Nombre de usuario invalido.';
                            break;
                        case 400: 
                            $scope.errorMsg = 'Nombre de usuario o contraseña invalido';
                            break;
                        default:
                            $scope.errorMsg = 'Error al ingresar al sistema.';
                    }
                } else {
                    $scope.showErrorMsg = false;
                    $scope.errorMsg = '';
                    $scope.initMenu();
                    $state.go('home');
                }
            });
        };
    }
]);