exports.config = {
  directConnect: true,
  
 capabilities: {
    browserName: 'chrome',
    chromeOptions: {
                args: ['--start-maximized']
            },
  },
framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
specs: ['../script/add_lawyer.js'],
jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  }


  
  
};