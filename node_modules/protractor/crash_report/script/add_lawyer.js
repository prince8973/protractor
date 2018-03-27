
var signin = require('../custom_commands/login.js');
var user = require('../json/username.json');
var credential=require('../json/data.json')

var fs = require('fs');
var EC = protractor.ExpectedConditions;
var name = {};
name.reg_name=[];
var username;

describe('Login', function() {

	         //Reusable login command called from custom_commands
	         signin.test(credential.lawyeradmin[0].email , credential.lawyeradmin[0].password)

	         //Get the exist user name from json and push it to the temporary array
	              for(i=0; i<user.reg_name.length; i++){
                          name.reg_name.push(user.reg_name[i])
                  }
});
describe('Lawyers' , function(){
	it('Add Lawyer' , function(){
		    firstname_array=['Marguerite' , 'Aidan' , 'Aldrich' , 'Barnard' , 'Bradshaw' , 'Burney' , 'Charleston' , 'Charlie' , 'Darton' , 'Deverell' , 'Edson' , 'Farnley' , 'Garrett' , 'Dennis' , 'Tara' , 'Wilma' , 'Kimberly' , 'Constance' , 'Irene' , 'Roger' , 'Vernon' , 'John' , 'Darnell' , 'Trinidad' , 'Whitney' , 'Esperanza' , 'Kirk' , 'Robert']   
            lastname_array=['Beaulieu' , 'Abejundio' , 'Abhiroop' , 'Advaita' , 'Ajaipal' , 'Bankebihari' , 'Bhagwan' , 'Chetan' , 'Dalmeet' , 'Dharamdev' , 'Ekagrah' , 'Fanibhusan' , 'Whiting' , 'Pender' , 'Robidoux' , 'James' , 'Council' , 'Williams' , 'Ragan' , 'Miller' , 'Sanders' , 'Wayne' , 'Jennings' , 'Pedrick' , 'Brann' , 'Morris' , 'Blocker']
            address_array=['Carson Street' , 'My Drive' , 'Andy Street' , 'Gore Street' , 'Cottonwood Lane' , 'Quarry Drive' , 'Pleasant Hill Road' , 'Eden Drive' , 'Tree Top Lane' , 'Poplar Street' , 'John Avenue' , 'Buck Drive' , 'Mulberry Street' , 'Parker Drive' , 'Woodside Circle' , 'Mattson Street' , 'Walnut Drive' , 'Shinn Avenue' , 'Maple Lane']
            city_array=['Stevenson' , 'Newark' , 'Portsmouth' , 'John Calvin Drive' , 'Tipple Road' , 'Brentwood Drive' , 'Peck Court' , 'Hicksville' , 'Phoenix' , 'Durham' , 'West Newton' , 'Bridgeville' , 'Los Angeles']
            state_array=['CA' , 'GA' , 'IL' , 'FL' , 'TX' , 'AZ' , 'WI' , 'VA' , 'MN' , 'WA' , 'OR']
            g=['@gmail.com' , '@ymail.com' , '@yahoo.com' , '@outlook.com']
            firstname=firstname_array[Math.floor(Math.random()*firstname_array.length)]
            lastname=lastname_array[Math.floor(Math.random()*lastname_array.length)]
            address = address_array[Math.floor(Math.random()*address_array.length)]
            city = city_array[Math.floor(Math.random()*city_array.length)]
            state = state_array[Math.floor(Math.random()*state_array.length)]
            zip = Math.floor((Math.random()*88889)+11111)
            phone = Math.floor((Math.random()*1000000000)+9000000000)  

         // refresh the page
         browser.sleep(2500)
        // $('a[href="#/dashboard/Lawyer"]').isDisplayed().then(function(result){
        // 	if(result == false){
        		browser.refresh()
        		browser.sleep(1000)
        // 	}
        // })

         //Click Lawyer   
		$('a[href="#/dashboard/Lawyer"]').click()

		// Wait for lawyers page
		browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 50000);

		// Click Add Lawyer
		$('a[href="#/dashboard/add-lawyer"]').click()

		// Waot for add lawyer page to load
		browser.wait(EC.visibilityOf($('input[ng-model="lawyer.firstName"]')), 50000);
		browser.sleep(500)

		// Check whether save button is disabled
		expect($('a[ng-click="saveLawyer()"][disabled="disabled"]').isPresent()).toBe(true)

		// Enter First Name
		$('input[name="firstName"]').sendKeys(firstname)

		//Enter Last Name
		$('input[name="lastName"]').sendKeys(lastname)

		// reuse function is used for callback
		browser.sleep(50).then(function reuse(){

		
			        for(i=1 ; i<= name.reg_name.length+1; i++){
			             if(name.reg_name.indexOf('lawyer'+i) > -1 == false){
			             	username = 'lawyer'+i
			             	browser.sleep(1000)

			             	// Clear User Name
			             	$('input[name="username"]').clear()	

			             	// Set User Name
			             	$('input[name="username"]').sendKeys(username)	

			             	// Click first name
			             	$('input[name="firstName"]').click()	        
			             }
		            }		

		
		            browser.sleep(2000).then(function(){

		            	       // push the user name to name.reg_num array
			                   name.reg_name.push(username)

			                   // write the array name to the username.json file
			                   fs.writeFile (process.cwd()+'/crash_report/json/username.json', JSON.stringify(name), function(err) {
                                    if (err) throw err;                              
                               });

                               // check whether user name already exist validation mgs is visible 
                               $('span[ng-show="myForm.username.$error.usernameexists"]').isDisplayed().then(function(result){
                                      	if(result == true){

                                      		// The function reuse is called back
                                      		reuse()
                                      	}
                               })
		            })
	    })


        // Enter Address
		$('input[name="address"]').sendKeys('a')

		// Enter City
		$('input[name="city"]').sendKeys('a')

		// Enter State
		$('input[name="state"]').sendKeys('a')

		//Enter Zipcode
		$('input[name="zipcode"]').sendKeys('a')
		browser.sleep(500)

		// check validation for zip code
		expect($('span[ng-show="!myForm.zipcode.$error.required&&myForm.zipcode.$error.validateZipcode"]').isPresent()).toBe(true)

		// clear address
		$('input[name="address"]').clear()

		// clear city
		$('input[name="city"]').clear()

		// clear city
		$('input[name="state"]').clear()

		// clear zip code
		$('input[name="zipcode"]').clear()
		browser.sleep(500)

		// check for First name validation
		expect($('span[ng-show="myForm.firstName.$error.required"]').isPresent()).toBe(true)

		// check for last name validation
		expect($('span[ng-show="myForm.lastName.$error.required"]').isPresent()).toBe(true)

		// check for user name validation
		expect($('span[ng-show="myForm.username.$error.required"]').isPresent()).toBe(true)

		// check for address validation
		expect($('span[ng-show="myForm.address.$error.required"]').isPresent()).toBe(true)

		// set address
		$('input[name="address"]').sendKeys(address)

		// set city
		$('input[name="city"]').sendKeys(city)

		// set state
		$('input[name="state"]').sendKeys(state)

		// set zipcode
		$('input[name="zipcode"]').sendKeys(zip)

		// set phone number
		$('input[name="phoneNumber"]').sendKeys(phone)

		browser.sleep(10).then(function(){

			// Enter Email address
			$('input[name="emailAddress"]').sendKeys(username+g[Math.floor(Math.random()*g.length)])

			//Enter Notes
			$('textarea[name="notes"]').sendKeys('notes')
		    browser.sleep(1000)

		    // click save button
		    $('a[ng-click="saveLawyer()"]').click()

		    // wait for page to get saved
		    browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 60000);
		    browser.sleep(1000)

		    // set user name in username search bar
		    $('input[ng-model="search.username"]').sendKeys(username)
		})
		
		

         

	})
});
describe('check' , function(){
	   it('view lawyer' , function(){
	   	           browser.sleep(1000)

	   	           // click view lawyer
		           $('i[class="glyphicon glyphicon-eye-open"]').click()
		           browser.sleep(2000)

		           // Get and verify username, first name ,last name, phone, address, city ,state, and zip from the lawyer details popup window
		           element.all(by.css('table[class="table table-striped table-bordered"')).all(by.tagName('td[class="col-md-8 ng-binding"]')).getText().then(function(result){
		           	browser.sleep(500)
                   	expect(result[0]).toEqual(username)
                   	expect(result[1]).toEqual(firstname)
                   	expect(result[2]).toEqual(lastname)
                   	expect(result[3]).toEqual(phone.toString())
                   	expect(result[5]).toEqual(address)
                   	expect(result[6]).toEqual(city)
                   	expect(result[7]).toEqual(state)
                   	expect(result[8]).toEqual(zip.toString())

                   	// click close button
                   	$('button[class="btn btn-danger"][type="button"]').click()
                   	browser.sleep(1000)
                   })

	   });
	   it('Edit Lawyer' , function(){

	   	    firstname_1 = firstname_array[Math.floor(Math.random()*firstname_array.length)]
            lastname_1 = lastname_array[Math.floor(Math.random()*lastname_array.length)]
            address_1 = address_array[Math.floor(Math.random()*address_array.length)]
            city_1 = city_array[Math.floor(Math.random()*city_array.length)]
            state_1 = state_array[Math.floor(Math.random()*state_array.length)]
            zip_1 = Math.floor((Math.random()*88889)+11111)
            phone_1 = Math.floor((Math.random()*1000000000)+9000000000)

                   // Click Edit Lawyer
	   	           $('a[class="btn btn-xs btn-warning hint--top"]').click()

	   	           // wait for edit lawyer page to get load
	   	           browser.wait(EC.visibilityOf($('a[href="#/dashboard/Lawyer"]')), 60000);
	   	           browser.sleep(1500)
	   	           expect($('input[name="firstName"]').getAttribute('value')).toEqual(firstname)
	   	           expect($('input[name="lastName"]').getAttribute('value')).toEqual(lastname)
	   	           expect($('input[ng-model="lawyer.username"]').getAttribute('value')).toEqual(username)
	   	           expect($('input[name="address"]').getAttribute('value')).toEqual(address)
	   	           expect($('input[name="city"]').getAttribute('value')).toEqual(city)
	   	           expect($('input[name="state"]').getAttribute('value')).toEqual(state)
	   	           expect($('input[name="zipcode"]').getAttribute('value')).toEqual(zip.toString())
	   	           expect($('input[name="phoneNumber"]').getAttribute('value')).toEqual(phone.toString())
	   	           expect($('textarea[name="notes"]').getAttribute('value')).toEqual('notes')

	   	           // clear first name
	   	           $('input[name="firstName"]').clear()

	   	           // clear last name
                   $('input[name="lastName"]').clear()

                   // clear address
                   $('input[name="address"]').clear()

                   // clear city
                   $('input[name="city"]').clear()

                   // clear state
                   $('input[name="state"]').clear()

                   // clear zipcode
                   $('input[name="zipcode"]').clear()

                   // clear phone number
                   $('input[name="phoneNumber"]').clear()

                   // clear notes 
                   $('textarea[name="notes"]').clear()

                   // Enter first name
                   $('input[name="firstName"]').sendKeys(firstname_1)

                   // enter last name
                   $('input[name="lastName"]').sendKeys(lastname_1)

                   // enter address
                   $('input[name="address"]').sendKeys(address_1)

                   // enter city
                   $('input[name="city"]').sendKeys(city_1)

                   // enter state
                   $('input[name="state"]').sendKeys(state_1)

                   // enter zip
                   $('input[name="zipcode"]').sendKeys(zip_1.toString())

                   // enter phone
                   $('input[name="phoneNumber"]').sendKeys(phone_1.toString())

                   // enter notes
                   $('textarea[name="notes"]').sendKeys('notes 123')
                   browser.sleep(1000)

                   // click update lawyer
                   $('a[ng-click="updateLawyer()"]').click()
		           
                   // wait for lawyer to get update
		           browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 60000);
		           browser.sleep(1000)

		           // set user name
		           $('input[ng-model="search.username"]').sendKeys(username)
		           browser.sleep(1500)

		           // click edit lawyer
		           $('a[class="btn btn-xs btn-warning hint--top"]').click()

		           // wait for edit lawyer page to get load
	   	           browser.wait(EC.visibilityOf($('a[href="#/dashboard/Lawyer"]')), 60000);
	   	           browser.sleep(1500)

	   	           // get and verify firstname
	   	           expect($('input[name="firstName"]').getAttribute('value')).toEqual(firstname_1)

	   	           // get and verify last name
	   	           expect($('input[name="lastName"]').getAttribute('value')).toEqual(lastname_1)

	   	           // get and verify address
	   	           expect($('input[name="address"]').getAttribute('value')).toEqual(address_1)

	   	           // get and verify city
	   	           expect($('input[name="city"]').getAttribute('value')).toEqual(city_1)

	   	           // get and verify state
	   	           expect($('input[name="state"]').getAttribute('value')).toEqual(state_1)

	   	           // get and verify zip code
	   	           expect($('input[name="zipcode"]').getAttribute('value')).toEqual(zip_1.toString())

	   	           // get and verify phone number
	   	           expect($('input[name="phoneNumber"]').getAttribute('value')).toEqual(phone_1.toString())

	   	           // get and verify notes
	   	           expect($('textarea[name="notes"]').getAttribute('value')).toEqual('notes 123')

	   	           // Click back to the list
	   	           $('a[href="#/dashboard/Lawyer"]').click()
	   	           browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 60000);
	   	           browser.sleep(1000)
	   });
       it('Enable/Disable lawyer' , function(){
       	          // Set user name in username search bar
       	          $('input[ng-model="search.username"]').sendKeys(username)
       	          browser.sleep(1000)

       	          // Click Disable button
       	          $('a[ng-click="enableOrDisableLawyer(lawyer.lawyerId)"][ng-show="lawyer.status==1"]').click()

       	          // Wait for the button to get disabled
       	          browser.wait(EC.visibilityOf($('a[ng-click="enableOrDisableLawyer(lawyer.lawyerId)"][ng-show="lawyer.status==0"]')), 60000);
       	          browser.sleep(1000)

       	          //Click logout button
       	          $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
       	          browser.sleep(500)
       	          $('a[href="j_spring_security_logout"]').click()

       	          // Wait for the page to get logout
       	          browser.wait(EC.visibilityOf($('#username')), 60000);
       	          browser.sleep(1000)

       	          // Enter Username
       	          $('#username').sendKeys(username)

       	          // Enter Password
       	          $('#password').sendKeys(username)

       	          // Click Submit button
       	          $('input[type="submit"]').click()
       	          browser.sleep(1000)

       	          // check for validation 
       	          expect($('div[style="color:#FF0000;"]').isPresent()).toBe(true)

       	          // Enter user name
       	          $('#username').sendKeys(credential.lawyeradmin[0].email)

       	          // Enter password
       	          $('#password').sendKeys(credential.lawyeradmin[0].password)

       	          // Click submit button
       	          $('input[type="submit"]').click()

       	           // refresh the page
                    browser.sleep(2500)
                   // $('a[href="#/dashboard/Lawyer"]').isDisplayed().then(function(result){
                   // 	if(result == false){
                   		browser.refresh()
                   		browser.sleep(1000)
                   // 	}
                   // })

       	          // wait for dashboard to get visible
       	          browser.wait(EC.visibilityOf($('a[href="#/dashboard/Lawyer"]')), 50000);
       	          browser.sleep(1000)

       	          // Click Lawyer
       	          $('a[href="#/dashboard/Lawyer"]').click()

       	          // wait for layers page to get load
                  browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 50000);
                  browser.sleep(1000)

                  // Set User Name
                  $('input[ng-model="search.username"]').sendKeys(username)
       	          browser.sleep(1000)

       	          // click enable lawyer button
       	          $('a[ng-click="enableOrDisableLawyer(lawyer.lawyerId)"][ng-show="lawyer.status==0"]').click()

       	          // wait for lawyer to get enabled
       	          browser.wait(EC.visibilityOf($('a[ng-click="enableOrDisableLawyer(lawyer.lawyerId)"][ng-show="lawyer.status==1"]')), 60000);
       	          browser.sleep(1000)

       	          // Click Logout button
       	          $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
       	          browser.sleep(500)
       	          $('a[href="j_spring_security_logout"]').click()

       	          //wait for signin page to get visible
       	          browser.wait(EC.visibilityOf($('#username')), 60000);
       	          browser.sleep(1000)

       	          // Enter User Name
       	          $('#username').sendKeys(username)

       	          // Enter Password
       	          $('#password').sendKeys(username)

       	          // Click Submit
       	          $('input[type="submit"]').click()
       	          browser.sleep(1000)

                  // wait for page to login
       	          browser.wait(EC.visibilityOf($('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]')), 60000);
       	          browser.sleep(1500)

       	          // check whether thr change password popup gets visible
       	          $('form[name="changePasswordModalForm"]').isDisplayed().then(function(result){
       	          	    if(result== true){

       	          	    	// Enter excisting password
                            $('#password').sendKeys(username)

                            //Enter new password
                            $('#newpassword').sendKeys(username)

                            // conform the new password
                            $('#confirmpassword').sendKeys(username)

                            // click change button
                            $('a[ng-click="changePassword()"]').click()
       	          	    }
       	          })
       	          browser.sleep(1000)
       	});
       it('Change Password' , function(){
                  // click change password
       	          $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
       	          browser.sleep(500)
       	          $('a[href="dashboard#/dashboard/Changepassword"]').click()

       	          //Wait for change password page
       	          browser.wait(EC.visibilityOf($('#password')), 60000);
       	          browser.sleep(1000)

       	          // set existing password
       	          $('#password').sendKeys('jhsd')
       	          browser.sleep(1000)

       	          // check for wrong password validation message
       	          expect($('span[ng-show="myForms.password.$error.password"]').isDisplayed()).toBe(true)

       	          // clear password
       	          $('#password').clear()

       	          // clear user name
       	          $('#password').sendKeys(username)

       	          // set new password
       	          $('#newpassword').sendKeys('deemsys@123')

       	          // set conform password
       	          $('#confirmpassword').sendKeys('sadsad')
       	          browser.sleep(1000)

       	          // check validation for not matching password
       	          expect($('span[ng-show="myForms.confirmpassword.$error.pattern"]').isDisplayed()).toBe(true)

       	          // clear conform password
       	          $('#confirmpassword').clear()

       	          // set password
       	          $('#confirmpassword').sendKeys('deemsys@123')

       	          // click submit
       	          $('a[type="submit"]').click()
       	          browser.sleep(1000)

       	          // click logout
       	          $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
       	          browser.sleep(500)
       	          $('a[href="j_spring_security_logout"]').click()

       	          // wait for signin page
       	          browser.wait(EC.visibilityOf($('#username')), 60000);
       	          browser.sleep(1000)

       	          // Set user name
       	          $('#username').sendKeys(username)

       	          // set password 
       	          $('#password').sendKeys(username)

       	          // click submit button
       	          $('input[type="submit"]').click()
       	          browser.sleep(1000)

       	          // check validation
       	          expect($('div[style="color:#FF0000;"]').isPresent()).toBe(true)

       	          // Set user name 
       	          $('#username').sendKeys(credential.lawyeradmin[0].email)

       	          // set password
       	          $('#password').sendKeys(credential.lawyeradmin[0].password)

       	          // click submit button
       	          $('input[type="submit"]').click()

       	           // refresh the page
                   browser.sleep(2500)                  
                   browser.refresh()
                   browser.sleep(1000)
                  
       	          
       });
       it('Reset Password' , function(){
       	          // wait for page to load
       	          browser.wait(EC.visibilityOf($('a[href="#/dashboard/Lawyer"]')), 50000);
       	          browser.sleep(1000)

       	          // click lawyer
       	          $('a[href="#/dashboard/Lawyer"]').click()

       	          // wait for add lawyer page
                  browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 50000);
                  browser.sleep(1000)

                  // enter user name in username search bar
                  $('input[ng-model="search.username"]').sendKeys(username)
       	          browser.sleep(1000)

       	          // click reset button
       	          $('a[ng-click="resetPassword(lawyer.lawyerId)"][data-hint="Reset Password"]').click()

       	          // wait for conformation popup window
       	          browser.wait(EC.visibilityOf($('div[class="modal-content"]')), 50000);
       	          browser.sleep(1000)

       	          // click no button
	       	      $('button[class="btn btn-danger"]').click()
	       	      browser.sleep(1000)

	       	      // Click logout button
	       	      $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
	       	      browser.sleep(500)
       	          $('a[href="j_spring_security_logout"]').click()

       	          // wait for signin page
       	          browser.wait(EC.visibilityOf($('#username')), 60000);
       	          browser.sleep(1000)

       	          // enter username
       	          $('#username').sendKeys(username)

       	          // enter password
       	          $('#password').sendKeys(username)

       	          // click submit button
       	          $('input[type="submit"]').click()
       	          browser.sleep(1000)

       	          // check for validation
       	          expect($('div[style="color:#FF0000;"]').isPresent()).toBe(true)

       	          // Enter username
       	          $('#username').sendKeys(credential.lawyeradmin[0].email)

       	          // enter password
       	          $('#password').sendKeys(credential.lawyeradmin[0].password)

       	          // click submit button
       	          $('input[type="submit"]').click()

       	           // refresh the page
                   browser.sleep(2500)
                  // $('a[href="#/dashboard/Lawyer"]').isDisplayed().then(function(result){
                  // 	if(result == false){
                  		browser.refresh()
                  		browser.sleep(1000)
                  // 	}
                  // })

       	          // wait for dashboard to load
       	          browser.wait(EC.visibilityOf($('a[href="#/dashboard/Lawyer"]')), 50000);
       	          browser.sleep(1000)

       	          // click lawyer
       	          $('a[href="#/dashboard/Lawyer"]').click()

       	          // wait for lawyers page
                  browser.wait(EC.visibilityOf($('a[href="#/dashboard/add-lawyer"]')), 50000);
                  browser.sleep(1000)

                  // set username in username search bar
                  $('input[ng-model="search.username"]').sendKeys(username)
       	          browser.sleep(1000)

       	          // click reset lawyer
       	          $('a[ng-click="resetPassword(lawyer.lawyerId)"][data-hint="Reset Password"]').click()

       	          // wait for conformation popup window
       	          browser.wait(EC.visibilityOf($('div[class="modal-content"]')), 50000);
       	          browser.sleep(1000)

       	          // click yes in conformation popup window
       	          $('a[ng-click="resetLawyerPassword()"]').click()
       	          browser.sleep(1000)

       	          // click logout
	       	      $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
	       	      browser.sleep(500)
       	          $('a[href="j_spring_security_logout"]').click()

       	          // wait for signin page
       	          browser.wait(EC.visibilityOf($('#username')), 60000);
       	          browser.sleep(1000)

       	          // enter username
       	          $('#username').sendKeys(username)

       	          // enter password
       	          $('#password').sendKeys(username)

       	          // click submit button 
       	          $('input[type="submit"]').click()
       })
})