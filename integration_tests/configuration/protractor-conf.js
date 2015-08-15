// conf.js
exports.config = {
    allScriptsTimeout: 11000,
    seleniumAddress: 'http://localhost:3000',
    specs: ['spec.js'],
    framework: 'jasmine',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};