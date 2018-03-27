var signin = require('../custom_commands/login.js');
var scan = require('../custom_commands/scanned.js');
var normal_report = require('../custom_commands/normal.js');
var runner_report = require('../custom_commands/runner.js');
var credential=require('../json/data.json')

var EC = protractor.ExpectedConditions;

var today_1=[];
var lawyer_login;
var assign_client;
var active_lawyer = [];

describe('Login', function() {

	//Reusable login command called from custom_commands
	signin.test(credential.lawyeradmin[0].email , credential.lawyeradmin[0].password)
});

describe('Home' , function(){
	    it('client total' , function(){
	        	  var total_client;
	        	  var normal;
	        	  var runner;
	        	browser.wait(EC.visibilityOf($('a[href="#/dashboard/home"]')), 60000)
	        	browser.sleep(500)

	        	// Get the client total from home page        
	        	browser.element(by.xpath("html/body/div[1]/div[1]/div/div/div/div[1]/div[2]/div[6]/div/div[4]/div/a/div[1]/div[2]/div/div[1]")).getText().then(function(result){
	        		  total_client=result
	        	})

	        	// Click Clients        
	        	$('a[href="#/dashboard/LawyerAdminSearchPatients"]').click()

	        	// wait for search clients page to load        
	        	//browser.wait(EC.visibilityOf(browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div[1]/table/tbody/tr[3]"))), 60000)
	        	browser.sleep(30000)


	        	//click Subscribed in county 
	        	$('button[ng-click="toggleDropdown()"]').click()
	        	$('input[data-ng-change="countyPreferenceList()"][value="1"]').click()
            $('button[ng-click="toggleDropdown()"]').click()
            browser.sleep(500)
            browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/form/div[3]/div[1]/div/div/button")).click()
            $('input[name="reportingAgencyPreference"][value="1"]').click()
            browser.sleep(500)

	        	// Click Tier        
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/form/div[3]/div[2]/div/div/button")).click()
	        	browser.sleep(500)

	        	// select others        
	        	browser.element(by.linkText('Others')).click()
	        	browser.sleep(500)
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/form/div[3]/div[2]/div/div/button")).click()

	        	// Click search        
	        	$('a[ng-click="searchPatients()"]').click()
	        	browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"')), 60000)
	        	browser.sleep(1000)

	        	// Click Age drop down        
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div[1]/table/thead[1]/tr[2]/th[3]/div/div/button")).click()
	        	browser.sleep(500)

	        	// Select minor and not known        
	        	browser.element(by.linkText('Minors')).click()
	        	browser.element(by.linkText('Not Known')).click()
	        	browser.sleep(500)
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/div[1]/table/thead[1]/tr[2]/th[3]/div/div/button")).click()
	        	browser.sleep(500)

	        	// Get the total normal report number from the bottom of the page        
	        	$('div[class="col-md-4 margin-top-30 ng-binding"]').getText().then(function(result){
	        		normal=result.substring(result.indexOf("of")+3,result.indexOf("records"))
	        	})
	        	browser.sleep(500)
            browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="1"]')), 60000)
            browser.sleep(500)

	        	// Click Report type - Runner		
	        	$('label[ng-model="patient.isRunnerReport"][btn-radio="1"]').click()
	        	browser.sleep(5000)

	        	// Get the total runner report number from the bottom of the page		
	        	$('div[class="col-md-4 margin-top-30 ng-binding"]').getText().then(function(result){
	        		runner=result.substring(result.indexOf("of")+3,result.indexOf("records"))
	        	})
	        	browser.sleep(500)
	        	
	        	browser.wait(EC.visibilityOf($('a[href="#/dashboard/home"]')), 60000).then(function(result){

	        		// compare total record number present in the home page with the total record present in the normal and runner report 
	        		browser.sleep(1000)
	        		expect((Number(normal)+Number(runner))>=(Number(total_client))).toBe(true)
	        	})
	    })
});
describe('normal' , function(){      
	    normal_report.test(today_1)
});

describe('scanned' , function(){
  scan.test(today_1)
  
});
describe('runner' , function(){
   runner_report.test(today_1)
});

describe('assign' , function(){
	it('assign client' , function(){
		browser.sleep(5000)

		// click report type as normal
		$('label[ng-model="patient.isRunnerReport"][btn-radio="0"]').click()

		// wait for page to get load
		 browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"]')), 60000)
	     browser.sleep(1500)

	     // delete crash from date
	     $('#CrashFromDate').clear()

	     // delete added from date
	     $('#AddedFromDate').clear()

	     // clear local report number
	     $('input[name="localReportNumber"]').clear()
	     browser.sleep(1000)

	     // Click search patients
	     $('a[ng-click="searchPatients()"]').click()

	     // wait for page to get load
	     browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"]')), 60000)
	     browser.sleep(5000)
	     var elm_1 = element.all(by.repeater('resultData in resultMainData.searchResult')).all(by.tagName('td[colspan="11"]'));

                   elm_1.getText().then(function(text){
                   	browser.sleep(2500)
                   	var assign_client_rand = Math.floor((Math.random()*(text.length+1))+0)
                   	assign_client = text[assign_client_rand].substring(text[assign_client_rand].indexOf("Local Report No: ")+17, text[assign_client_rand].indexOf("Unit In Error")).toString()
                   	
                    // Set local report number
                   	$('input[name="localReportNumber"]').sendKeys(assign_client)
                   	browser.sleep(15000)

                   	// click search patients
	                $('a[ng-click="searchPatients()"]').click()

	                // wait for the page to load
                    browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"]')), 60000)
                    browser.sleep(5000)

                    // select the client by clicking client check box
                    $('input[id="checkAll"]').click()     
                     
                   }); 
                   browser.wait(EC.elementToBeClickable($('a[ng-click="assignlawyerPopup()"]')), 60000)
                   browser.sleep(1000)

                   // click assign lawyer
                   $('a[ng-click="assignlawyerPopup()"]').click()

                   // wait for the popup 
                   browser.wait(EC.visibilityOf($('div[class="modal-content"]')), 60000)
                   browser.sleep(2000)

                   // get all the lawyers name
                  element.all(by.repeater('lawyer in lawyers')).getText().then(function(result){
                  	
                  	    for(i=0;i < result.length; i++){
                        	if (result[i].indexOf('\n') > -1) active_lawyer.push(result[i]);
                        }

                  	    browser.sleep(100)
                  })
              browser.sleep(1000).then(function(){
                  var rand_lawyer = Math.floor((Math.random()*((active_lawyer.length)+1))+0)
                  	var lawyer = active_lawyer[rand_lawyer]
                    

                  	// select lawyer
                  	browser.element(by.xpath("//*[@id='assignlawyerModal']/div/div/form/div[2]/select/option["+(rand_lawyer+2)+"]")).click()
                  	browser.sleep(1000)
              
                  // click assign
                  $('a[ng-click="assignLawyer()"][type="submit"]').click()
                  browser.sleep(2000)

                  // click lawyer 
                  $('a[href="#/dashboard/Lawyer"]').click()

                  // wait for page to load
                  browser.wait(EC.visibilityOf($('input[ng-model="search.username"]')), 60000)
                  browser.sleep(2000).then(function(){
                       // enter name in first name search bar
                       $('input[ng-model="search.firstName"]').sendKeys(lawyer.split('\n')[0])

                       // enter name in second name search bar
                       $('input[ng-model="search.lastName"]').sendKeys(lawyer.split('\n')[1])
                       browser.sleep(500)
                  })

                  
              })    

                 // Get the user name
                  $('td[class="ng-binding"]').getText().then(function(result){
                  	lawyer_login = result
                  
                  // click logout
                  $('a[class="dropdown-toggle ng-binding"][href=""][data-toggle="dropdown"]').click()
       	          browser.sleep(500)
       	          $('a[href="j_spring_security_logout"]').click()

       	          //wait for signin page to get visible
       	          browser.wait(EC.visibilityOf($('#username')), 60000);
       	          browser.sleep(1000)

       	          // Enter User Name
       	          $('#username').sendKeys(lawyer_login)

       	          // Enter Password
       	          $('#password').sendKeys(lawyer_login)

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
                            $('#password').sendKeys(lawyer_login)

                            //Enter new password
                            $('#newpassword').sendKeys(lawyer_login)

                            // conform the new password
                            $('#confirmpassword').sendKeys(lawyer_login)

                            // click change button
                            $('a[ng-click="changePassword()"]').click()
       	          	    }
       	          })
       	          })

                 

	})
});
describe('lawyer check' , function(){
	it('check assign' , function(){
                browser.sleep(1000)

                // refresh the page
                browser.refresh()
                browser.sleep(1000)

                // click client
                $('a[href="#/dashboard/LawyerSearchPatients"]').click()

                // wait for the page to get load
                browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
                browser.sleep(1500)

	        	browser.sleep(500)

	        	//click Subscribed in county 
	        	$('button[ng-click="toggleDropdown()"]').click()
	        	$('input[data-ng-change="countyPreferenceList()"][value="1"]').click()
            $('button[ng-click="toggleDropdown()"]').click()
            browser.sleep(500)
            browser.element(by.xpath("//*[@id='page-wrapper']/div/div[2]/form/div[3]/div[1]/div/div/button")).click()
            $('input[name="reportingAgencyPreference"][value="1"]').click()
            browser.sleep(500)

	        	// Click Tier        
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div[2]/form/div[3]/div[2]/div/div/button")).click()
	        	browser.sleep(500)

	        	// select others        
	        	browser.element(by.linkText('Others')).click()
	        	browser.sleep(500)

	        	// Click search        
	        	$('a[ng-click="searchPatients()"]').click()

	        	// wait for page to load
	        	browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"')), 60000)
	        	browser.sleep(1000)

	        	// Click Age drop down        
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div[1]/table/thead[1]/tr[2]/th[3]/div/div/button")).click()
	        	browser.sleep(500)

	        	// Select minor and not known        
	        	browser.element(by.linkText('Minors')).click()
	        	browser.element(by.linkText('Not Known')).click()
	        	browser.sleep(500)

	        	// wait for page to load
	        	browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
                browser.sleep(1500)

                // set local report number
                $('input[name="localReportNumber"]').sendKeys(assign_client)
                browser.sleep(500)

                // click search button
                $('a[ng-click="searchPatients()"]').click()

                // wait for page to load
                browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
                browser.sleep(2500)
                var elm_2 = element.all(by.repeater('resultData in resultMainData.searchResult')).all(by.tagName('td[colspan="9"]'));
                      var localReportNumber_check = [];
                    browser.sleep(3000)

                    // get the local report number
                   elm_2.getText().then(function(text){

                   	   for(i=0; i<text.length; i++){
                          aa = text[i].substring(text[i].indexOf("Local Report No: ")+17, text[i].indexOf("Unit In Error")).toString()
                          // push the value to localreportnumber_check array
                          localReportNumber_check.push(aa)                       
                       }

                   })
                   browser.sleep(10).then(function(){

                   	        // check assign_client number is present in localReportNumber_check array
                   	        expect(localReportNumber_check.indexOf(assign_client) > -1).toBe(true)
                   })
	})
})