var EC = protractor.ExpectedConditions;

exports.test = function(today_1) {
	describe('login' , function(){
		it('filter' , function(){
         browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)

		// click report type as scanned

		$('label[ng-model="patient.isRunnerReport"][btn-radio="3"]').click()

		// Wait for scanned report button to get clickable
		browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
		browser.sleep(40000)
		browser.element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Crash Date"]')).isPresent().then(function(result1){
            	if(result1==true){

		// function to reuse the code again
		function reuse(){

			     // Get crash date
		         var elm_2 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Crash Date"]'));
                 elm_2.getText().then(function(text){
                 	for(i=0; i<text.length;i++){

                 		// check whether the date is present in the today_1 array
                 		//browser.sleep(1000)
                 		expect((today_1).indexOf(text[i]) > -1).toBe(true) 
                 	}
                 });

                 // Get Added Date
                 var elm_3 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Added Date"]'));
                 elm_3.getText().then(function(text){
                 	for(i=0; i<text.length;i++){

                 		// check whether the date is present in the today_1 array
                 		//browser.sleep(1000)
                 		expect((today_1).indexOf(text[i]) > -1).toBe(true) 
                 	}
                 });
        }

        browser.sleep(10).then(function(){
            	reuse()
            })


browser.sleep(2000).then(function(){
        //Check whether the pagination is present 
        $('ul[class="pagination ng-scope"]').isPresent().then(function(result){
        	if(result==true){
                   
        		  // Get text from pagination
        	        var elm_10 = element.all(by.repeater('pageNumber in pages track by $index')).all(by.tagName('a[ng-click="setCurrent(pageNumber)"]'));
        	        elm_10.getText().then(function(result){
        	        	tot10 = parseInt(result.filter(Boolean)[result.filter(Boolean).length-1])-1
        	        	   for(i=0;i<tot10 ; i++){
        	        	   	 
        	        	   	// click next page
        	        	   	$('a[ng-click="setCurrent(pagination.current + 1)"]').click()
        	        	   	browser.sleep(3000)

        	        	   	// reuse the function
        	        	   	reuse()

        	        	   }
        	        })
            }
        	
        })
    })

        // get local report number
        var elm_4 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Local Report Number"]'));
        elm_4.getText().then(function(text){
        		abc = Math.floor((Math.random()*(text.length+1))+0)

        		var set_localreportno = text[abc]
        		//var set_localreportno = '201701944'

        		// set local report number to local report number search field
        		$('input[name="localReportNumber"]').clear()
        		$('input[name="localReportNumber"]').sendKeys(set_localreportno)

        		// click search button
        		$('a[ng-click="searchPatients()"]').click()

        		// wait for report type scanned button gets enabled
        		browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)

        		// get the local report number
        		var elm_5 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Local Report Number"]'));
        		elm_5.getText().then(function(text_1){
        			browser.sleep(1000)
        			

        			// check the local report number in the search field matches the local report number displayed in the table
        			expect(text.indexOf(set_localreportno) > -1).toBe(true)
        		})

        		// click archive
        		$('a[ng-click="moveSingleDirectReportToArchive(directRunnerReport.crashId)"]').click()
        		browser.sleep(1000)

        		// accept alert
        		browser.switchTo().alert().accept();
        		browser.sleep(1000)

        		// select archive drop down in records type
        		$('select[name="isArchived"]').$('option[value="1"]').click()

        		// wait for report type scanned button gets enabled
        		browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
        		browser.sleep(1000)

        		// get local report number
        		var elm_6 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Local Report Number"]'));
        		elm_6.getText().then(function(text){

        			// check the local report number in the search field matches the local report number displayed in the table
        			expect(text.toString().includes(set_localreportno)).toBe(true)
        		})

        		//click restore
        		$('a[ng-click="releaseSingleDirectReportFromArchive(directRunnerReport.crashId)"]').click()
        		browser.sleep(500)
        		browser.switchTo().alert().accept();
        		browser.sleep(1000)

        		// select report type as open
        		$('select[name="isArchived"]').$('option[value="0"]').click()

        		// wait for report type scanned button gets enabled
        		browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
        		browser.sleep(1000)

        		// get local report number 
        		var elm_7 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Local Report Number"]'));
        		elm_7.getText().then(function(text){
        			browser.sleep(500)
        			

        			// check the local report number in the search field matches the local report number displayed in the table
        			expect(text.indexOf(set_localreportno) > -1).toBe(true)
        		})

        		browser.sleep()
        		$('a[ng-click="directReportChangeStatusModal(directRunnerReport.crashId,directRunnerReport.directReportStatus)"]').click()

        		// wait for page to load
        		browser.wait(EC.elementToBeClickable($('select[ng-model="directReportStatusValue"]')), 60000)
        		browser.sleep(1000)
        		var status = Math.floor((Math.random()*2)+1)

        		// click change status
        		$('select[ng-model="directReportStatusValue"]').$('option[value="'+status+'"]').click()
        		$('button[ng-click="directReportChangeStatus()"]').click()
        		browser.sleep(4000)

        		// click filter status by
        		$('select[ng-change="secoundarySearchPatient()"][name="directReportStatus"]').$('option[value="'+status+'"]').click()
        		browser.sleep(4000)

        		//browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="3"]')), 60000)
        		var elm_8 = element.all(by.repeater('directRunnerReport in directRunnerReportMain.crashReportForms|itemsPerPage:patient.itemsPerPage : \'directRunnerReportPageId\'')).all(by.tagName('td[title="Local Report Number"]'));
        		elm_8.getText().then(function(text){

        			// check the local report number in the search field matches the local report number displayed in the table
        			expect(text.toString().includes(set_localreportno)).toBe(true)
        		})  
        		browser.sleep(1500)     		



        		
        });
               }
            })

       browser.sleep(1500)
       browser.executeScript('window.scrollTo(0,0);');
	   browser.sleep(1000)

        
	})
	})
}