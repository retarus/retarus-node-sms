## Retarus Sms Node SDK
The official SMS Sdk implemented in typescript for (node, deno and bun) to use the retarus service with ease.

## Installation

yarn:
```bash
yarn add @retarus/sms
```
npm:
```bash
npm i @retarus/sms
```

## Usage
The Node SDK provides a client implementation to contact our fax services. To offer a fast and simple way to integrate our services into your applications without having to write a lot of code. The examples can be found in the examples directory sorted by each service. Furthermore, you can check out our OpenAPI documents on the interfaces here: https://developers.retarus.com
 
### Configuring the SDK
First, you need to configure the SDK with your details.
```typescript
import { Configuration, Region } from '@retarus/sms'

Configuration.getInstance().setRegion(Region.Europe);
Configuration.getInstance().setAuth(process.env["retarus_userid"]!, process.env["retarus_sms_password"]!)
```
Each service implemented a client which contains all the functions to contact and work with the messaging services. As you can see we globally set our region for the sdk, where your data should be processed and also your credentials are needed to authorize your requests.


```typescript
import { SmsClient } from '@retarus/sms'

const smsClient = new SmsClient();
```

### Send a SMS
To send a sms, first setup the SDK like described above. For your credentials, we recommend setting up an .env file. It should also contain the customer number. 
> **Please note:** Using the API will only work with valid credentials.

After that, you can execute the examples '01.send_sms.ts' with Typescript. As a result, you should get a message that reports back the ID of the created job, it will also show how to request the according report for the job.


