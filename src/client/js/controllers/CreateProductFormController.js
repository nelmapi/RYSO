angular.module("ryso").controller("CreateProductFormController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){
        $scope.newProduct = {
            name: '',
            type: '',
            description: '',
            localPrice: '',
            outsidePrice: ''
        };

        $scope.productTypes = {
            'Plato' : 'Plato',
            'Bebida': 'Bebida'
        }

        $scope.schema = [
            {
                property: 'name',
                label: 'Nombre',
                type: 'text',
                attr: {
                    ngMaxlength: 100,
                    required: true
                },
                msgs: {
                    maxlength: 'El nombre del producto no debe exceder los 100 caracteres.'
                }
            },
            {
                property: 'type',
                label: 'Tipo',
                type: 'select',
                list: 'key as value for (key,value) in productTypes',
                attr: {
                    required: true
                }
            },
            {
                property: 'description',
                label: 'Descripcion',
                type: 'textarea',
                attr: {
                    ngMaxlength: 1000,
                    required: true
                },
                msgs: {
                    maxlength: 'El nombre del producto no debe exceder los 1000 caracteres.'
                }
            },
            {
                property: 'localPrice',
                label: 'Precio en Mesa',
                type: 'number',
                attr: {
                    required: true,
                    min:1,
                    max: 1000
                },
                msgs : {
                    min: 'Por favor ingrese un numero mayor a cero.',
                    max: 'Por favor ingrese un numero menor o igual a 1000.'
                }
            },
            {
                property: 'outsidePrice',
                label: 'Precio para llevar',
                type: 'number',
                attr: {
                    required: true,
                    min:1,
                    max: 1000
                },
                msgs : {
                    min: 'Por favor ingrese un numero mayor a cero.',
                    max: 'Por favor ingrese un numero menor o igual a 1000.'
                }
            }
        ];

        $scope.options = {
            validation: {
                enabled: true,
                showMessages: false
            },
            layout: {
                type: 'basic',
                labelSize: 3,
                inputSize: 9
            }
        };

        // angular.element(document).ready(function () {
        //     InvalidInputHelper(document.getElementById("name"), {
        //         emptyText: "Por favor introdusca el nombre del producto."
        //     });

        //     InvalidInputHelper(document.getElementById("type"), {
        //         emptyText: "Por favor seleccione el tipo de producto."
        //     });

        //     InvalidInputHelper(document.getElementById("description"), {
        //         emptyText: "Por favor introdusca la descripcion del producto."
        //     });

        //     InvalidInputHelper(document.getElementById("localPrice"), {
        //         emptyText: "Por favor introdusca el precio en mesa."
        //     });

        //     InvalidInputHelper(document.getElementById("outsidePrice"), {
        //         emptyText: "Por favor introdusca el precio para llevar."
        //     });
        // });

        $scope.saveProduct = function () {
            console.log('formValid: ' + $scope.addProductForm.$valid);
        }
    }
]);