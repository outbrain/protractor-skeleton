exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    seleniumPort: 4444,
    specs: ['dist/**/*.spec.js'],
    framework: "jasmine2",
    onPrepare: () => {
        browser.waitForAngularEnabled(false);
    }
};