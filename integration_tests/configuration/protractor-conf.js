// conf.js
exports.config = {
    allScriptsTimeout: 30000,
    baseUrl: 'http://localhost:3000',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../specs/*spec.js'],
    framework: 'jasmine2',
    multiCapabilities: [{
        'browserName': 'chrome'
        //'chromeOptions': {
        //    args: ['--test-type']
        //}
    }],
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 60000
    },

    onPrepare: function(){
        global.EC = protractor.ExpectedConditions;
        browser.manage().window().maximize();
        global.isAngularSite = function(flag){
            browser.ignoreSynchronization = !flag;
        };
    }
};