var credential=require('../json/data.json')
var EC = protractor.ExpectedConditions;

exports.test = function(username,password) {
	describe('login' , function(){
		it('open login page' , function(){
			browser.ignoreSynchronization = true 
			// Open the URL

			browser.get('http://192.168.1.5:8086/Injury/')
			browser.wait(EC.visibilityOf($('#username')), 60000)
			browser.sleep(500)
			// click login button

			$('input[onclick="return checkValidation()"]').click()
			browser.sleep(500)
			//Check validation for username and password

			expect(($('#username_error')).isDisplayed()).toBe(true)
			expect(($('#password_error')).isDisplayed()).toBe(true)
			browser.sleep(500)
			//Set Username and Password

			$('#username').sendKeys(username)
			$('#password').sendKeys(password)
			//Click Login button

			$('input[onclick="return checkValidation()"]').click()		
		})
	});
	describe('first time login' , function(){
	        it('change password' , function(){
	        	   browser.sleep(1500)
	        	   //Check whether agreeDisclaimer is present
	        	   
	        	   element.all(by.css('a[ng-click="agreeDisclaimer()"]')).then(function(items) {
                        if(items.length=='1'){
                        	  //click i accept agreeDisclaimer button

                        	  $('a[ng-click="agreeDisclaimer()"]').click()
                        	  browser.wait(EC.visibilityOf($('a[href="#/dashboard/home"]')), 60000)
                        	  browser.sleep(500)
                        	  // check whether the change password popup opens

                        	  expect($('input[name="password"]').isPresent()).toBe(true)
                        	  // set wrong current password

                        	  $('input[name="password"]').sendKeys('dsfdsf')
                        	  // set new password

	        		     	  $('input[name="newpassword"]').sendKeys('etsd')
	        		     	  // set conform password that does not match newpassword

	        		     	  $('input[name="confirmpassword"]').sendKeys('bvmvcbd')
	        		     	  browser.sleep(500)
	        		     	  // check validation message for wrong current password

	        		     	  expect($('span[ng-show="changePasswordModalForm.password.$error.password"]').isPresent()).toBe(true)
	        		     	  // check validation message for not matched new password 

	        		     	  expect($('span[ng-show="changePasswordModalForm.confirmpassword.$error.pattern"]').isPresent()).toBe(true)
	        		     	  // check save password button does not get enabled

	        		     	  expect($('a[ng-click="changePassword()"][disabled="disabled"]').isPresent()).toBe(true)
	        		     	  // clear the wrong password

	        		     	  $('input[name="password"]').clear()
	        		     	  //clear the new password

                              $('input[name="newpassword"]').clear()
                              //clear the conform password

                              $('input[name="confirmpassword"]').clear()
                              // Set current password

                              $('input[name="password"]').sendKeys(credential.user[0].password)
                              //set new password

                              $('input[name="newpassword"]').sendKeys(credential.user[0].password)
                              // set conform password

                              $('input[name="confirmpassword"]').sendKeys(credential.user[0].password)
                              // check save button gets enabled

                              expect($('a[ng-click="changePassword()"][disabled="disabled"]').isPresent()).toBe(false)
                              //click save button

                              $('a[ng-click="changePassword()"]').click()
                              browser.sleep(500)
                        }
                  });
	        	
	        })
    })
}