var EC = protractor.ExpectedConditions;

exports.test = function(today_1) {
	describe('normal reuse' , function(){
		it('Check filter' , function(){

	    	// Generate date of past 30 days and push to today_1 array which is a global 
            for(i=0; i<30;i++){
                          var today = new Date(new Date().setDate(new Date().getDate() - i))
                         var dd = today.getDate();
                         var mm = today.getMonth()+1; //January is 0!
        
                         var yyyy = today.getFullYear();
                         if(dd<10){
                             dd='0'+dd;
                         } 
                         if(mm<10){
                             mm='0'+mm;
                         } 
                         var today = mm+'/'+dd+'/'+yyyy;
                          today_1.push(today.toString())

            }


                 // Click report type as normal
	    	    $('label[ng-model="patient.isRunnerReport"][btn-radio="0"]').click()

	    	    // wait for the table to get load 
	    	    //browser.wait(EC.visibilityOf(browser.element(by.xpath("//*[@ng-repeat-start='resultData in resultMainData.searchResult']/td[2]"))), 60000)
	    	    browser.sleep(60000)
	        browser.element(by.xpath("//*[@ng-repeat-start='resultData in resultMainData.searchResult']/td[2]")).isPresent().then(function(result1){
            	if(result1==true){

            	

	    	    // check whether crash to date and added to date are disabled                  
                 browser.sleep(1000)
	    	     expect($('input[name="crashToDate"][disabled="disabled"]').isPresent()).toBe(true)
                 expect($('input[name="addedOnToDate"][disabled="disabled"]').isPresent()).toBe(true)
                 browser.sleep(500)

                 // delete date from crash from date
                $('#CrashFromDate').clear()
                browser.sleep(500)

                // set date in crash from date
                $('#CrashFromDate').sendKeys(today_1[today_1.length-1])

                // check whether crash to date is enabled
                expect($('input[name="crashToDate"][disabled="disabled"]').isPresent()).toBe(false)

                // delete value from crash to date
                $('input[name="crashToDate"]').clear()
                browser.sleep(500)

                // set value to crash to date
                $('input[name="crashToDate"]').sendKeys(today_1[0])

                // delete value from added from date
                $('#AddedFromDate').clear()
                browser.sleep(500)

                // set value to added from date
                $('#AddedFromDate').sendKeys(today_1[today_1.length-1])

                // delete value from added to date
                $('#AddedToDate').clear()
                browser.sleep(500)

                // set value to added to date
                $('#AddedToDate').sendKeys(today_1[0])

                // click added from date
                $('#AddedFromDate').click()
                browser.sleep(500)

                // click search button
                $('a[ng-click="searchPatients()"]').click()

                // wait for report type normal button to get clickable
                browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="0"]')), 60000)
	        	browser.sleep(1500)

	    	    
	    	    //var elm = element.all(by.repeater('resultData in resultMainData.searchResult')).all(by.tagName('td[2]'));
            var elm = element.all(by.xpath("//*[@ng-repeat-start='resultData in resultMainData.searchResult']/td[2]"));
                   elm.getText().then(function(text){
                   	    for(i=0; i<text.length; i++){

                   	    	// get crash date from the table
                   	    	var crash_date = text[i].substring(text[i].indexOf("Crash Date: ")+12, text[i].indexOf("  |  Added"))

                   	    	// get added on date from the table
                   	    	var added_date = text[i].substring(text[i].indexOf("Added Date: ")+12, text[i].indexOf("  |  Clients Count"))
                   	    	browser.sleep(500)

                   	    	//check whether the crash date and added date are present in the today_1 array
                   	    	expect((today_1).indexOf(crash_date) > -1).toBe(true) 
                   	    	expect((today_1).indexOf(added_date) > -1).toBe(true) 
                   	    }            
                   }); 

                   // getting county text
                   /*browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/form/div[3]/div[1]/div/div/button")).click()
                var reporting = element.all(by.repeater('option in options | filter: searchFilter'))
                reporting.getText().then(function(text){
                	console.log(text.filter(Boolean))
                	console.log(text.filter(Boolean).length)
                })*/
                // check which tier is checked but it shows list of all reporting agencies checked
                /*var elm2= element.all(by.repeater('option in options | filter: searchFilter')).all(by.tagName('span[data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"]'));
                browser.element(by.xpath("//*[@id='page-wrapper']/div/div/div[2]/form/div[3]/div[2]/div/div/button")).click()
                elm2.getAttribute('class').then(function(text){
                	console.log(text)
                })*/
	    	    }
            })

	    	    browser.sleep(1500)
          browser.executeScript('window.scrollTo(0,0);');
			browser.sleep(1000)

	    	    

	    })
	})
}