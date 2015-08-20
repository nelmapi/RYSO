angular.module("ryso").directive('createUserForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/partials/createUserForm.ng.html',
        replace: true,
        transclude: true,
        controller: 'CreateUserFormController',
        scope: {
            newUser: '='
        }
    }
});
