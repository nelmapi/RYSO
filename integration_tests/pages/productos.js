// modeling product page

(function () {
    'use strict';

    var Producto = function () {

        this.productLink = element(by.id('productsLink'));
        this.productTitle = element(by.id('productTitle'));
        this.AgregarProductButton = element(by.id('agregarProductBtn'));
        this.tableHeaderList = element.all(by.css('.table thead tr th'));
        this.productList = element.all(by.css('.table tbody tr'));
        this.removeButton = element(by.id('removeBtn'));
        this.editButton = element(by.id('editBtn'));


        this.getProductTitle = function () {
            return this.productTitle.getText();
        };

        this.clickOnProductLink = function () {
            this.productLink.click();
        };

        this.waitForProductList = function () {
            var isListVisible = EC.visibilityOf(this.productTitle);
            browser.wait(isListVisible, 30000);
        };

        this.clickOnAgregarProduct = function () {
            this.AgregarProductButton.click();
            //browser.waitForAngular();
        };

        this.clickOnRemoveButton = function () {
            this.removeButton.click();
        };

        this.clickOnEditButton = function () {
            this.editButton.click();
        };

        this.getNumOfProducts = function (callback) {
            return this.productList.count().then(function (count) {
                callback(count);
            });
        };

        this.removeProduct = function (productName) {
            var deleteOption = element(by.css('.table tbody tr[name="' + productName + '"] td[class="options"] button[id="removeBtn"]'));
            var isClickeable = EC.elementToBeClickable(deleteOption);
            browser.wait(isClickeable, 30000);
            deleteOption.click();
        };

        this.isProductPresent = function (productName) {
            var deleteOption = element(by.css('.table tbody tr[name="' + productName + '"] td[class="options"] button[id="removeBtn"]'));
            var isClickeable = EC.elementToBeClickable(deleteOption);
            //browser.wait(isClickeable, 30000);
            return isClickeable.call();
        };

        this.editProduct = function (productName) {
            var editOption = element(by.css('.table tbody tr[name="' + productName + '"] td[class="options"] button[id="editBtn"]'));
            var isClickeable = EC.elementToBeClickable(editOption);
            browser.wait(isClickeable, 30000);
            editOption.click();
        }

    };

    module.exports = Producto;
})();