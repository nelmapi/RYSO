'use strict';

var Inicio = require('./../pages/inicio.js');

describe('Inicio', function(){
    var inicio = new Inicio();

    it('should display restaurant title', function(){
        expected(inicio.title.isDisplayed()).toBe(true);
    });
});