// conf.js

var HtmlReporter = require('protractor-jasmine2-html-reporter');

var htmlReporter = new HtmlReporter({
    savePath: '../integration_tests/reports/html/',
    screenshotsFolder: 'images',
    filePrefix: 'index'
});


exports.config = {
    allScriptsTimeout: 30000,
    baseUrl: 'http://localhost:3000',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../specs/*spec.js'],
    framework: 'jasmine2',
    multiCapabilities: [{
        'browserName': 'chrome'
    }],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000
    },

    onPrepare: function(){
        jasmine.getEnv().addReporter(htmlReporter);
        global.EC = protractor.ExpectedConditions;
        browser.manage().window().maximize();
        global.isAngularSite = function(flag){
            browser.ignoreSynchronization = !flag;
        };
    }
};