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
specs: ['../script/lawyer_clients.js'],
jasmineNodeOpts: {
    defaultTimeoutInterval: 1200000
  }



  
  
};