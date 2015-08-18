'use strict';

var Inicio = require('../pages/inicio.js');
var Producto = require('../pages/productos.js');
var AgregarProdutoForm = require('../pages/agregarProductoForm.js');
var RemoveProductForm = require('../pages/removeProducto.js');
var label = require('../resources/ryso-labels.json');
var products = require('../resources/products.json');

describe('Pagina Producto', function () {
    var inicio = new Inicio();
    var producto = new Producto();
    var agregarProducto = new AgregarProdutoForm();
    var removeProduct = new RemoveProductForm();

    beforeEach(function () {
        inicio.get('/products');

        isAngularSite(true);
    });

    it('deberia mostrar el titulo', function () {
        expect(producto.getProductTitle()).toContain(label.product.title);
    });

    it('deberia mostrar la lista de productos', function () {

        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product1);

        var callback = function (count) {
            expect(count).toBeGreaterThan(0);
            producto.removeProduct(products.product1.name);
            removeProduct.waitForRemoveModal();
            removeProduct.clickOnEliminateButton();
        };

        producto.getNumOfProducts(callback);
    });

    it('deberia ser posible editar un producto de un plato', function () {
        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product1);
        producto.waitForProductList();
        producto.editProduct(products.product1.name);
        agregarProducto.addProduct(products.product1_edited);

        producto.waitForProductList();

        producto.editProduct(products.product1_edited.name);
        agregarProducto.waitForModal();

        expect(agregarProducto.getProductName()).toEqual(products.product1_edited.name);
        agregarProducto.clickOnCancelButton();
        producto.waitForProductList();
        producto.removeProduct(products.product1_edited.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnEliminateButton();


    });

    it('deberia ser posible cancelar la edicion de un producto', function () {
        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product1);
        producto.waitForProductList();
        producto.editProduct(products.product1.name);
        agregarProducto.waitForModal();
        agregarProducto.clickOnCancelButton();
        producto.waitForProductList();
        producto.editProduct(products.product1.name);
        agregarProducto.waitForModal();

        expect(agregarProducto.getProductName()).toEqual(products.product1.name);

        agregarProducto.clickOnCancelButton();
        producto.waitForProductList();
        producto.removeProduct(products.product1.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnEliminateButton();

    });

    it('deberia ser posible cancelar la eliminacion de un producto', function () {
        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product1);
        producto.waitForProductList();
        producto.removeProduct(products.product1.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnCancelButton();
        producto.waitForProductList();
        producto.editProduct(products.product1.name);
        agregarProducto.waitForModal();

        expect(agregarProducto.getProductName()).toEqual(products.product1.name);

        agregarProducto.clickOnCancelButton();
        producto.waitForProductList();
        producto.removeProduct(products.product1.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnEliminateButton();

    });

    it('deberia ser posible remover un producto de la lista', function () {
        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product1);
        producto.waitForProductList();
        producto.removeProduct(products.product1.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnEliminateButton();
        producto.waitForProductList();

        expect(producto.isProductPresent(products.product1.name)).toBe(false);
    });

    it('deberia ser posible agregar un nuevo producto (plato)', function () {
        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product1);
        producto.waitForProductList();

        expect(producto.isProductPresent(products.product1.name)).toBe(true);

        //producto.waitForProductList();
        producto.removeProduct(products.product1.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnEliminateButton();

    });

    it('deberia ser posible agregar un nuevo producto (bebida)', function () {
        producto.clickOnAgregarProduct();
        agregarProducto.addProduct(products.product2);
        producto.waitForProductList();

        expect(producto.isProductPresent(products.product2.name)).toBe(true);

        //producto.waitForProductList();
        producto.removeProduct(products.product2.name);
        removeProduct.waitForRemoveModal();
        removeProduct.clickOnEliminateButton();

    });

});