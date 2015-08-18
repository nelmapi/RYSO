// modeling product page

(function () {
    'use strict';

    var RemoveProductForm = function () {

        this.removeTitle = element(by.id('removeTitle'));
        this.removeDescription = element(by.id('removeDesc'));
        this.removeProductButton = element(by.id('removeProductBtn'));
        this.cancelProductButton = element(by.id('cancelProductBtn'));


        this.getRemoveFormTitle = function (callback) {
            var isRemoveTitleVisible = EC.visibilityOf(this.removeTitle);
            browser.wait(isRemoveTitleVisible, 30000);
            return this.formTitle.getText().then(callback);
        };

        this.waitForRemoveModal = function () {
            var isTitleVisible = EC.visibilityOf(this.removeTitle);
            browser.wait(isTitleVisible, 30000);
        };

        this.getDescriptionOfRemovedProduct = function (callback) {
            return this.removeDescription.getText().then(callback);
        };

        this.clickOnEliminateButton = function () {
            this.removeProductButton.click();
        };

        this.clickOnCancelButton = function () {
            this.cancelProductButton.click();
        }


    };

    module.exports = RemoveProductForm;
})();