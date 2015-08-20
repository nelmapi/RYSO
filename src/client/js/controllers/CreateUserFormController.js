angular.module("ryso").controller("CreateUserFormController", ['$rootScope', '$scope', '$state', '$meteor', '$filter', '$timeout',
    function($rootScope, $scope, $state, $meteor, $filter, $timeout){

        $scope.USER_PATTERN = /^[a-z0-9_-]{3,16}$/;

        $scope.SUCESS_CREATE_MESSAGE = 'El usuario fue creado exitosamente.';
        $scope.SUCESS_UPDATE_MESSAGE = 'El usuario fue actualizdo exitosamente.';
        $scope.ERROR_CREATE_MESSAGE = '<strong>Error: </strong>El usuario no fue creado debido a un error en el servidor.';
        $scope.ERROR_UPDATE_MESSAGE = '<strong>Error: </strong>El usuario no fue modificado debido a un error en el servidor.';
        $scope.ERROR_USERNAME_INVALID = '<strong>Nombre de Usuario: </strong>Ingrese un nombre de usuario valido';
        $scope.ERROR_INVALID_PASSWORD = '<strong>Contraseña: </strong>Las contraseñas no coinciden, por favor confirme la contraseña';

        $scope.newUser = null;
        $scope.message = '';
        $scope.success = false;

        $scope.userRoles = {
            'Administrador': 'Administrador',
            'Cajero': 'Cajero',
            'Cocinero': 'Cocinero',
            'Mesero': 'Mesero'
        };

        $scope.passwordFSchema = {
            property: 'profile.password',
            label: 'Contraseña',
            type: 'password',
            attr: {
                ngMaxlength: 80,
                ngMinlength: 1,
                required: (!$scope.newUser || ($scope.newUser._id === undefined))
            },
            msgs: {
                required : 'Por favor ingrese la contraseña',
                maxlength: 'La contraseña no debe exceder los 80 caracteres.'
            }
        };

        $scope.confirmPasswordFSchema = {
            property: 'profile.confirmPassword',
            label: 'Confirmar Contraseña',
            type: 'password',
            attr: {
                ngMaxlength: 80,
                ngMinlength: 1,
                required: (!$scope.newUser || ($scope.newUser._id === undefined))
            },
            msgs: {
                required : 'Por favor ingrese nuevamente la contraseña',
                maxlength: 'La contraseña no debe exceder los 80 caracteres.'
            }
        };

        $scope.userSchema = [
            {
                property: 'username',
                label: 'Nombre de Usuario',
                type: 'text',
                attr: {
                    ngMaxlength: 16,
                    ngMinlength: 1,
                    required: true
                },
                msgs: {
                    required : 'Por favor ingrese el nombre de usuario valido',
                    maxlength: 'El nombre usuario no debe exceder los 16 caracteres.'
                }
            },
            {
                property: 'profile.firstName',
                label: 'Nombre',
                type: 'text',
                attr: {
                    ngMaxlength: 80,
                    ngMinlength: 1,
                    required: true
                },
                msgs: {
                    required : 'Por favor ingrese el nombre',
                    maxlength: 'El nombre usuario no debe exceder los 80 caracteres.'
                }
            },
            {
                property: 'profile.lastName',
                label: 'Apellido',
                type: 'text',
                attr: {
                    ngMaxlength: 80,
                    ngMinlength: 1,
                    required: true
                },
                msgs: {
                    required : 'Por favor ingrese el apellido',
                    maxlength: 'El nombre usuario no debe exceder los 80 caracteres.'
                }
            },
            {
                property: 'profile.phoneNumber',
                label: 'Telefono',
                type: 'number',
                attr: {
                    required: true
                },
                msgs: {
                    required : 'Por favor ingrese el numero de telefono',
                    maxlength: 'El nombre usuario no debe exceder los 80 caracteres.'
                }
            },
            {
                property: 'profile.userType',
                label: 'Role',
                type: 'select',
                list: 'key as value for (key,value) in userRoles',
                attr: {
                    required: true
                },
                msgs: {
                    required : 'Por favor seleccion el Role para este usuario'
                }
            },
            $scope.passwordFSchema,
            $scope.confirmPasswordFSchema
        ];

        $scope.userOptions = {
            validation: {
                enabled: true,
                showMessages: true,
                defaultMsgs : false
            },
            layout: {
                type: 'basic',
                labelSize: 3,
                inputSize: 9
            },
            defaultOption : 'Seleccionar'
        };

        $scope.updatePasswordSchemas = function () {
            $scope.passwordFSchema.attr.required = $scope.isNewUser();
            $scope.confirmPasswordFSchema.attr.required = $scope.isNewUser();
        };

        $scope.isNewUser = function () {
            return (!$scope.newUser || ($scope.newUser._id === undefined));
        };

        $scope.resetUser = function () {
            $scope.newUser = {
                username: '',
                profile : {
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    userType: '',
                    password: '',
                    confirmPassword: ''
                }
            };

            if ($scope.addUserForm) {
                $scope.addUserForm.$dirty = false;
            }

            if ($scope.addUserForm) {
                var autofields = $scope.addUserForm.autofields;
                autofields.username.$dirty = false;
                autofields.username.$invalid = false;
                autofields.profilefirstName.$dirty = false;
                autofields.profilelastName.$dirty = false;
                autofields.profilephoneNumber.$dirty = false;
                autofields.profileuserType.$dirty = false;
                autofields.profilepassword.$dirty = false;
                autofields.profilepassword.$invalid = false;
                autofields.profileconfirmPassword.$dirty = false;
                autofields.profileconfirmPassword.$invalid = false;

                $scope.addUserForm.$valid = true;
            }

            $scope.message = '';
            $scope.success = false;
            $scope.$emit('closeUserForm');
        };

        $scope.isUserFormValid = function () {
            var autofields = $scope.addUserForm.autofields;
            if (autofields.username.$invalid || !$scope.isValidUserName()) {
                autofields.username.$invalid = true;
                autofields.username.$dirty = true;
                $scope.addUserForm.$valid = false;
            } else {
                $scope.addUserForm.$valid = true;
            }
            if (autofields.profilefirstName.$invalid) {
                autofields.profilefirstName.$dirty = true;
            }
            if (autofields.profilelastName.$invalid) {
                autofields.profilelastName.$dirty = true;
            }
            if (autofields.profilephoneNumber.$invalid) {
                autofields.profilephoneNumber.$dirty = true;
            }
            if (autofields.profileuserType.$invalid) {
                autofields.profileuserType.$dirty = true;
            }
            if (autofields.profilepassword.$invalid || !$scope.isValidPassword()) {
                autofields.profilepassword.$invalid = true;
                autofields.profilepassword.$dirty = true;
                $scope.addUserForm.$valid = false;
            } else {
                $scope.addUserForm.$valid = true;
            }

            if (autofields.profileconfirmPassword.$invalid || !$scope.isValidPassword()) {
                autofields.profileconfirmPassword.$invalid = true;
                autofields.profileconfirmPassword.$dirty = true;
                $scope.addUserForm.$valid = false;
            } else {
                $scope.addUserForm.$valid = true;
            }

            return $scope.addUserForm.$valid;
        };

        $scope.isValidPassword = function () {
            return ($scope.isNewUser() && ($scope.newUser.profile.password == $scope.newUser.profile.confirmPassword))
                    || (!$scope.isNewUser() && (!$scope.newUser.profile.password 
                                                || ($scope.newUser.profile.password == $scope.newUser.profile.confirmPassword)));
        };

        $scope.isValidUserName = function() {
            return $scope.USER_PATTERN.test($scope.newUser.username);
        };

        $scope.saveUser = function () {
            if ($scope.isUserFormValid()) {
                var usertoUpsert = {
                    username: $scope.newUser.username,
                    profile: {
                        firstName: $scope.newUser.profile.firstName,
                        lastName: $scope.newUser.profile.lastName,
                        userType: $scope.newUser.profile.userType,
                        phoneNumber: $scope.newUser.profile.phoneNumber
                    }
                };

                console.log('usertoUpsert: ', usertoUpsert);

                if ($scope.isNewUser()) {

                    usertoUpsert.password = $scope.newUser.profile.password;
                    Accounts.createUser(usertoUpsert, function (err) {
                        if (err && (err.error != 403)) {
                            console.log('err: ', err);
                            $scope.message = $scope.ERROR_CREATE_MESSAGE;
                        } else {
                            $scope.successSave($scope.SUCESS_CREATE_MESSAGE);
                        }
                    });
                } else {

                    var userId = $scope.newUser._id;
                    var userProfile  = $scope.newUser.profile;

                    Meteor.users.update(userId, {$set: usertoUpsert});
                    if (userProfile.password) {
                        $meteor.call('setUserPassword', userId, userProfile).then($scope.successCallback, $scope.errorCallback );
                    } else {
                        $meteor.call('setUserRoles', userId, userProfile.userType).then($scope.successCallback, $scope.errorCallback);
                    }
                }

            } else if (!$scope.isValidUserName()) {
                $scope.message = $scope.ERROR_USERNAME_INVALID;
            } else if (!$scope.isValidPassword()) {
                $scope.message = $scope.ERROR_INVALID_PASSWORD;
            }
        };

        $scope.successCallback = function (data) {
            $scope.successSave($scope.SUCESS_UPDATE_MESSAGE);
        };

        $scope.errorCallback = function (err) {
            $scope.message = $scope.ERROR_UPDATE_MESSAGE;
            console.log('failed', err);
        };

        $scope.successSave = function (message) {
            $scope.success = true;
            $scope.message = message;
            $timeout(function () {
                $scope.resetUser();
                $scope.closeModal();
            }, 1000, false);
        };

        $('#userFormModal').on('hide.bs.modal', function () {
            $scope.resetUser();
        });

        $scope.closeModal = function () {
            $('#userFormModal').modal('hide');
        };

        $scope.$watch('newUser', function (newValue, oldValue) {
            $scope.updatePasswordSchemas();
        });

        $scope.resetUser();
    }
]);