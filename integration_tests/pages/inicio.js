// modeling home page

(function (){
    'use strict';

    this.inicioMenu = element(by.linkText('Inicio'));
    this.title = element(by.id(''));


    this.get = function (){
        browser.get('/');
    };


    module.exports = Inicio;
})();