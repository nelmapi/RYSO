// modeling home page

(function () {
    'use strict';

    var Inicio = function () {

        this.homeLink = element(by.id('homeLink'));
        this.title = element(by.id('homeTitle'));


        this.get = function (url) {
            browser.get(url);
        };

        this.getTitle = function () {
            return this.title.getText();
        };

        this.clickOnHomeLink = function () {
            this.homeLink.click();
        }
    };

    module.exports = Inicio;
})();