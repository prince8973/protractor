var prompt = require('prompt');
var user_name;
var password;

module.exports = {
   
   'Field glass enter credentials': function(browser){

 
  // 
  // Start the prompt 
  // 
  prompt.start();
 
  // 
  // Get two properties from the user: username and email 
  // 
  prompt.get([{
      name: 'username',
      required: true
    }, {
      name: 'password',
      hidden: true,
      conform: function (value) {
        return true;
      }
    }], function (err, result) {
    // 
    // Log the results. 
    // 
     user_name=result.username
     password=result.password

    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  password: ' + result.password);
  });
   },

  'Login' : function (browser) {
    browser
       .pause(10000 , function(){
       	browser
       	  .maximizeWindow()
       .url('https://www.fieldglass.net/')
       .waitForElementVisible('#usernameId_new' , 60000)
       
       .setValue('#usernameId_new' , user_name)
       .setValue('#passwordId_new' , password)
       .click('button[name="action"]')
       .waitForElementVisible('#viewMenuTitle' , 60000)
       .click('#viewMenuTitle')
       .pause(400)
       .click('#viewMenu_3_timeSheets_link')
       .pause(500)
       .useXpath()
       .getText("//*[@id='row0timeSheet_worker_list']/div[1]/div",  function(result){
       	  console.log(result.value)
       	    if(result.value=='Draft'){
       	    	browser
       	    	.useXpath()
       	    	.click("//*[@id='row0timeSheet_worker_list']/div[2]/div/a")
       	    }
       })
       })
       

       



  }
};