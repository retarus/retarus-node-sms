import { Region, RegionUri } from "../../retarus-node-common/src/region";
import RetarusResponse from "@retarus/common/src/response";
import Transporter from "../../retarus-node-common/src/transporter";
import { SmsJob } from "./model";


class SmsClient {
    private transporter: Transporter
    private smsUris: RegionUri[] = [
        new RegionUri(
            Region.Europe,
            "https://sms4a.eu.retarus.com",
            ["https://sms4a.de1.retarus.com", "https://sms4a.de2.retarus.com"],
        )
    ]
    
    constructor() {
        this.transporter = new Transporter(this.smsUris);
    }

    async sendSms(job: SmsJob) : Promise<RetarusResponse>{
        let path = "/jobs"
        let payload = JSON.parse(JSON.stringify(job));
        let res = await this.transporter.post(path, payload, {})
        return res
    }
    async getSmsJob(jobId: string) : Promise<RetarusResponse> {
        let path = "/jobs/" + jobId
        let res = await this.transporter.get(path, {})
        return res
    }

    /**Gets all sms reports that match the given criteria.
    *   Parameters:
    *
    *    `jobIdsOnly`: boolean
    *    `fromTs`: string (e.g. 2018-06-13T00:00+02:00) can only be max 30 days before to_ts
    *    `toTs`: string (e.g. 2018-06-20T00:00+02:00)
    *    `open`: boolean
    *    `offset`: number (default: 0)
    *    `limit`: number (default: 100)
    * 
    */
    async filterSmsJobs({...kwargs} = {}) : Promise<RetarusResponse> {
        let path = "/jobs";
        console.log(kwargs)
        let res = await this.transporter.get(path, kwargs)
        return res;
    }
    async serverVersion() : Promise<RetarusResponse> {
        let path = "/path"
        let res = await this.transporter.get(path, {})
        return res;
    }
}

export default SmsClient;