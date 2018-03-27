var signin = require('../custom_commands/login.js');
var credential=require('../json/data.json')
var normal_report = require('../custom_commands/normal.js');
var runner_report = require('../custom_commands/runner.js');
var scan = require('../custom_commands/scanned.js');
var EC = protractor.ExpectedConditions;

var today_1=[];

describe('Login', function() {
	//Reusable login command called from custom_commands
	signin.test(credential.lawyer[0].email , credential.lawyer[0].password)
});

describe('home' , function(){
	   it('client total' , function(){
	   	   var normal;
           var runner;
           var total_client;

		        browser.wait(EC.visibilityOf($('a[href="#/dashboard/home"]')), 60000)
	        	browser.sleep(500)
	        	browser.refresh()
	        	browser.wait(EC.visibilityOf($('a[href="#/dashboard/LawyerSearchPatients"]')), 60000)
	        	browser.sleep(500)
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div[1]/div[2]/div[13]/div/a/div[1]/div[2]/div/div[1]")).getText().then(function(result){
	        		  total_client=result
	        	})
	        	$('a[href="#/dashboard/LawyerSearchPatients"]').click()
	        	browser.wait(EC.visibilityOf($('input[name="localReportNumber"]')), 60000)
	        	browser.sleep(500)
	        	$('button[ng-click="toggleDropdown()"]').click()
	        	$('input[data-ng-change="countyPreferenceList()"]').click()
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
	        	browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"')), 60000)
	        	browser.sleep(1000)

	        	// Click Age drop down        
	        	browser.element(by.xpath("//*[@id='page-wrapper']/div/div[2]/div[1]/table/thead[1]/tr[2]/th[3]/div/div/button")).click()
	        	browser.sleep(500)

	        	// Select minor and not known        
	        	browser.element(by.linkText('Minors')).click()
	        	browser.element(by.linkText('Not Known')).click()
	        	browser.sleep(500)

	        	// Get the total normal report number from the bottom of the page        
	        	$('div[class="col-md-4 margin-top-30 ng-binding"]').getText().then(function(result){
	        		normal=result.substring(result.indexOf("of")+3,result.indexOf("records"))
	        	})
	        	browser.sleep(500)

	        	// Click Report type - Runner		
	        	$('label[ng-model="patient.isRunnerReport"][btn-radio="1"]').click()
	        	browser.sleep(5000)

	        	// Get the total runner report number from the bottom of the page		
	        	$('div[class="col-md-4 margin-top-30 ng-binding"]').getText().then(function(result){
	        		runner=result.substring(result.indexOf("of")+3,result.indexOf("records"))
	        	})
	        	browser.sleep(500).then(function(){
	        		// compare total record number present in the home page with the total record present in the normal and runner report 
	        		browser.sleep(1000)
	        		expect((Number(normal)+Number(runner))==(Number(total_client))).toBe(true)
	        	})
	        	$('label[ng-model="patient.isRunnerReport"][btn-radio="0"').click()
	        	browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"')), 60000)
	        	browser.sleep(1000)

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
