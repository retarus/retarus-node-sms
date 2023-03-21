/**
 * Retarus GmbH 2023, bulk_sender.ts
 * 
 * */
import { Configuration, Region, SmsClient, SmsJob, RetarusResponse } from '@retarus/sms';;
import { parse } from 'csv-parse';
import * as fs from "fs";
import * as path from "path";

// create smsClient
const smsClient = new SmsClient();

// Set the credentials for the SDK
Configuration.getInstance().setRegion(Region.Europe);
Configuration.getInstance().setAuth(process.env["retarus_userid"]!, process.env["retarus_sms_password"]!)

type CSVJob = {
    id: string;
    name: string;
    number: string;
}

// csv metadata
const csvFilePath = path.resolve(__dirname, 'assets/sms_data.csv');
const headers = ['id', 'first_name', 'number'];

const text = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."

let Promises: Promise<RetarusResponse>[] = [];

function main() {
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // load the data from the csv file into an array of CSVJob
    parse(fileContent, {
        delimiter: ',',
        columns: headers,
    }, (error, result: CSVJob[]) => {
        if (error) {
            console.error(error);
            return;
        }
        // send result asynchronously to speed up the sending process.
        for (var i = 0; i < result.length; i++) {
            // creat a job, dispatch it and store the promise in an array to be further processed later
            let payload = SmsJob.minimalJob(text, result[i]["number"])
            let proms = smsClient.sendSms(payload)
            Promises.push(proms)
        }
        console.log(Promises)
        
        // await for the results and collect the job ids
        Promise.all(Promises).then((res) => {
            console.log(res)
        }
        );
    });
}

main()