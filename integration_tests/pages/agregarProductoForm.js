// modeling product page

(function () {
    'use strict';

    var AgregarProdutoForm = function () {

        this.formTitle = element(by.id('productFormTitle'));
        this.productName = element(by.id('name'));
        this.productType = element(by.id('type'));
        this.productTypeList = element.all(by.css('#type option'));
        this.productDescription = element(by.id('description'));
        this.localPrice = element(by.id('localPrice'));
        this.outsidePrice = element(by.id('outsidePrice'));
        this.saveButton = element(by.id('saveBtn'));
        this.cancelButton = element(by.id('cancelBtn'));


        this.getFormTitle = function (callback) {
            var isTitleVisible = EC.visibilityOf(this.formTitle);
            browser.wait(isTitleVisible, 30000);
            return this.formTitle.getText().then(callback);
        };

        this.waitForModal = function () {
            var isTitleVisible = EC.visibilityOf(this.formTitle);
            browser.wait(isTitleVisible, 30000);
        };

        this.clickOnSaveButton = function () {
            this.saveButton.click();
        };

        this.clickOnCancelButton = function () {
            this.cancelButton.click();
        };

        this.clickOnTypeDropDown = function () {
            this.productType.click();
        };

        this.selectTypeOption = function (index) {
            this.productTypeList.then(function (options) {
                options[index].click();
            });
        };

        this.getProductType = function () {
            var typeList = this.productTypeList.length;
            for (var i = 0; i < typeList; i++) {
                var type = this.productTypeList[i].getText();
            }
            return type;
        };

        this.setProductName = function (name) {
            this.productName
                .clear()
                .sendKeys(name);
        };

        this.getProductName = function (callback) {
            return this.productName.getAttribute('value');
        };

        this.setProductDescription = function (description) {
            this.productDescription
                .clear()
                .sendKeys(description);
        };

        this.getProductDescription = function () {
            return this.productDescription.getText();
        };

        this.setProductLocalPrice = function (localPrice) {
            this.localPrice
                .clear()
                .sendKeys(localPrice);
        };

        this.getProductLocalPrice = function () {
            return this.localPrice.getText();
        };

        this.setProductOutsidePrice = function (outsidePrice) {
            this.outsidePrice
                .clear()
                .sendKeys(outsidePrice);
        };

        this.getProductOutsidePrice = function () {
            return this.outsidePrice.getText();
        };

        this.addProduct = function (product) {
            this.waitForModal();
            this.setProductName(product.name);
            this.setProductDescription(product.desc);
            this.setProductLocalPrice(product.localPrice);
            this.setProductOutsidePrice(product.outsidePrice);
            this.clickOnTypeDropDown();
            this.selectTypeOption(product.type.index);
            this.clickOnSaveButton();
        }
    };

    module.exports = AgregarProdutoForm;
})();