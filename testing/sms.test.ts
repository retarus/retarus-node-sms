import SmsClient from '../src/sms';
import * as dotenv from 'dotenv'
import { Configuration, Region } from "@retarus/common";
import { SmsJob } from '../src/model';



const smsClient = new SmsClient();
let jobId = "";

jest.setTimeout(60000);

describe("Test the sms client including all the given functions to ensure the functionality for", () => {
    beforeAll(async () => {
        dotenv.config();
        Configuration.getInstance().setRegion(Region.Europe);
        Configuration.getInstance().setAuth(process.env["retarus_userid"]!, process.env["retarus_sms_password"]!)
    })
    test("send sms", async () => {
        let payload = SmsJob.minimalJob("Hallo Welt", process.env["retarus_sms_dst"]!)
        let res = await smsClient.sendSms(payload);
        expect(res.error).toBe(false);
        expect(Object.keys(res.data)).toContain("jobId")
        jobId = res.data["jobId"]
        await new Promise((r) => setTimeout(r, 2000))
    })
    test("get sms report", async () => {
        let res = await smsClient.getSmsJob(jobId);
        expect(res.error).toBe(false)
    })

    // todo determine if this test and the including function should be implemented or removed from the sdk. Because of the slownes of the endpoint.
    // test("filter sms reports", async () => {
    //     let res = await smsClient.filterSmsJobs({"jobIdsOnly": true, "limit": 1})
    //     console.log(res)
    //     expect(res.error).toBe(false)
    // })
})