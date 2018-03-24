var checkPatient=require('../Helpers/checkPatients');
var patientsClick=require('../Helpers/clickPatients');
var urlPage=require('../Helpers/urlPage');
var login=require('../Helpers/toLoginPage');
var patient=require('../Helpers/getPatientName');
var localReport=require('../Helpers/getLocalReport.js');

describe('Caller', function() {

    var localReportNumber=[];
    it('Check with Local Report Number', function () {
        urlPage.urlPage();
        login.loginPage('caller4', 'caller4');
        patientsClick.clickPatients();
        localReport.localReport();
        element(by.model('patient.localReportNumber')).getAttribute('value').then(function (LRNtext) {
            localReportNumber.push(LRNtext);
            console.log('localReportNumber[0] : '+localReportNumber[0]);
            checkPatient.checkPatient('caller',6, localReportNumber[0]);
        });
    });

    it('Move to Archive / Release from Archive', function(){
        element(by.id(localReportNumber[0])).click();
        element(by.linkText('Move to Archive')).click();
        browser.waitForAngular();
        element(by.css('select[ng-model="patient.isArchived"]')).$('[value="1"]').click();
        browser.waitForAngular();
        checkPatient.checkPatient('caller',6,localReportNumber[0]);
        element(by.id(localReportNumber[0])).click();
        element(by.linkText('Release from Archive')).click();
        browser.waitForAngular();
        element(by.css('select[ng-model="patient.isArchived"]')).$('[value="0"]').click();
        checkPatient.checkPatient('caller',6,localReportNumber[0]);
    });
});