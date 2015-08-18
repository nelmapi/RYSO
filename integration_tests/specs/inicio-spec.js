'use strict';

var Inicio = require('../pages/inicio.js');
var label = require('../resources/ryso-labels.json');

describe('Pagina Inicio', function () {
    var inicio = new Inicio();

    beforeEach(function () {
        inicio.get('/');
        isAngularSite(false);
    });

    it('deberia mostrar el nombre del restaurante', function () {
        expect(inicio.getTitle()).toContain(label.home.title);
    });
});