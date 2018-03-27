var EC = protractor.ExpectedConditions;

exports.test = function(today_1) {
	describe('runner reuse' , function(){
		it('Check filter' , function(){
           $('label[ng-model="patient.isRunnerReport"][btn-radio="1"]').click()
           browser.wait(EC.elementToBeClickable($('label[ng-model="patient.isRunnerReport"][btn-radio="1"]')), 60000)
           browser.sleep(500)
           $('input[name="localReportNumber"]').clear()
           $('a[ng-click="searchPatients()"]').click()
           browser.sleep(60000)
           browser.element(by.xpath("//*[@ng-repeat-start='resultData in resultMainData.searchResult']/td[2]")).isPresent().then(function(result1){
            	if(result1==true){

           browser.sleep(500)
           function reuse1(){
                   var elm_00 = element.all(by.xpath("//*[@ng-repeat-start='resultData in resultMainData.searchResult']/td[2]"));
                   elm_00.getText().then(function(text){
                   	    for(i=0; i<text.length; i++){

                   	    	// get crash date from the table
                   	    	var crash_date = text[i].substring(text[i].indexOf("Crash Date: ")+12, text[i].indexOf("  |  Added"))

                   	    	// get added on date from the table
                   	    	var added_date = text[i].substring(text[i].indexOf("Added Date: ")+12, text[i].indexOf("  |  Clients Count"))

                   	    	//check whether the crash date and added date are present in the today_1 array
                   	    	expect((today_1).indexOf(crash_date) > -1).toBe(true) 
                   	    	expect((today_1).indexOf(added_date) > -1).toBe(true) 
                   	    }            
                   }); 
            }
            browser.sleep(10).then(function(){
            	reuse1()
            })
            
browser.sleep(2000).then(function(){
            //Check whether the pagination is present 
            $('ul[class="pagination ng-scope"]').isPresent().then(function(result1){
            	if(result1==true){
    
            		  // Get text from pagination
            	        var elm_5 = element.all(by.repeater('pageNumber in pages track by $index')).all(by.tagName('a[ng-click="setCurrent(pageNumber)"]'));
            	        elm_5.getText().then(function(result2){

            	        	tot = parseInt(result2.filter(Boolean)[result2.filter(Boolean).length-1])-1
            	                    
            	        	   for(i=0;i<tot ; i++){
        	        	   	// click next page
            	        	   	$('a[ng-click="setCurrent(pagination.current + 1)"]').click()
            	        	   	browser.sleep(3000)

            	        	   	// reuse the function
            	        	   	reuse1()

            	        	   }
            	        })
                }
        	
            })
})
              }
            })
          browser.sleep(1500)
          browser.executeScript('window.scrollTo(0,0);');
		  browser.sleep(1000)

		})
		
	})
}