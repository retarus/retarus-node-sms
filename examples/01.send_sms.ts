/**
 * Retarus GmbH 2023, send_sms.ts
 * 
 * */
import { Configuration, Region, SmsClient, SmsJob } from '@retarus/sms';

// create smsClient
const smsClient = new SmsClient();
let jobId: any = "";

// Set the credentials for the SDK
Configuration.getInstance().setRegion(Region.Europe);
Configuration.getInstance().setAuth(process.env["retarus_userid"]!, process.env["retarus_sms_password"]!)

// create sms job
let payload = SmsJob.minimalJob("Hallo Welt", process.env["retarus_sms_dst"]!)
// send the sms
smsClient.sendSms(payload).then((response) => {
    if (response.error === false) {
    // extract jobID and request sms report
    jobId = response.data["jobId"]

    // wait before requesting the sms report, so the server is able to process the job and create a report.
    setTimeout(() => {
        // request sms report from server
        smsClient.getSmsJob(jobId).then((response) => {
        console.log(response)
    })}, 8000)
    
    return
}
    console.log("got an issue: " + response.message)
});

