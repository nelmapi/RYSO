'use strict';

var Inicio = require('../pages/inicio.js');
var label = require('../resources/ryso-label.json');

describe('Pagina Inicio', function(){
    var inicio = new Inicio();

    beforeEach(function(){
        inicio.get('/');
        isAngularSite(false);
    });

    it('should display restaurant title', function(){
            expect(inicio.getTitle()).toContain(label.home.title);
    });
});