angular.module("ryso").controller("CreateProductFormController", ['$scope', '$stateParams', '$meteor', '$filter',
    function($scope, $stateParams, $meteor, $filter){

        $scope.newProduct = null;

        $scope.productTypes = {
            'Plato' : 'Plato',
            'Bebida': 'Bebida'
        };

        $scope.schema = [
            {
                property: 'name',
                label: 'Nombre',
                type: 'text',
                attr: {
                    ngMaxlength: 80,
                    ngMinlength: 1,
                    required: true
                },
                msgs: {
                    required : 'Este campo es requerido',
                    maxlength: 'El nombre del producto no debe exceder los 80 caracteres.'
                }
            },
            {
                property: 'type',
                label: 'Tipo',
                type: 'select',
                list: 'key as value for (key,value) in productTypes',
                attr: {
                    required: true
                },
                msgs: {
                    required : 'Este campo es requerido'
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
                    required : 'Este campo es requerido',
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
                    required : 'Este campo es requerido',
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
                    required : 'Este campo es requerido',
                    min: 'Por favor ingrese un numero mayor a cero.',
                    max: 'Por favor ingrese un numero menor o igual a 1000.'
                }
            }
        ];

        $scope.options = {
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

        $scope.resetProduct = function () {
            $scope.newProduct = {
                name: '',
                type: '',
                description: '',
                localPrice: '',
                outsidePrice: ''
            };

            if ($scope.addProductForm) {
                $scope.addProductForm.$dirty = false;
            }

            if ($scope.addProductForm) {
                var autofields = $scope.addProductForm.autofields;
                autofields.name.$dirty = false;
                autofields.description.$dirty = false;
                autofields.type.$dirty = false;
                autofields.localPrice.$dirty = false;
                autofields.outsidePrice.$dirty = false;
            }

            $scope.$emit('closeProductForm');
        };

        $scope.isProductFormValid = function () {
            var autofields = $scope.addProductForm.autofields;
            if (autofields.name.$invalid) {
                autofields.name.$dirty = true;
            }
            if (autofields.description.$invalid) {
                autofields.description.$dirty = true;
            }
            if (autofields.type.$invalid) {
                autofields.type.$dirty = true;
            }
            if (autofields.localPrice.$invalid) {
                autofields.localPrice.$dirty = true;
            }
            if (autofields.outsidePrice.$invalid) {
                autofields.outsidePrice.$dirty = true;
            }
            return $scope.addProductForm.$valid;
        };

        $scope.saveProduct = function () {
            if (!$scope.isProductFormValid()) return;
            if ($scope.newProduct._id) {
                Products.update($scope.newProduct._id, 
                {
                    $set:{
                        name: $scope.newProduct.name,
                        description: $scope.newProduct.description,
                        type: $scope.newProduct.type,
                        localPrice: $scope.newProduct.localPrice,
                        outsidePrice: $scope.newProduct.outsidePrice
                    }
                });
            } else {
                $meteor.call('saveProduct', $scope.newProduct).then(
                    function (data) {
                        $scope.closeModal();
                    },
                    function (err) {
                        console.log('failed', err);
                    }
                );
            }

            $scope.closeModal();
        };

        $('#productFormModal').on('hide.bs.modal', function (e) {
            $scope.resetProduct();
        });

        $scope.closeModal = function () {
            $('#productFormModal').modal('hide');
        };

        $scope.resetProduct();
    }
]);
