

export class Options {
    src?: string 
    encoding?: string 
    billcode?: string 
    status_requested?: boolean 
    flash?: boolean 
    customer_ref?: string 
    validity_min?: number 
    max_parts?: number 
    invalid_characters?: string 
    qos?: string 
    job_period?: string 
    duplicate_detection?: boolean 
    blackout_periods?: string[]
}


export class Recipient {
    dst: string
    customRef?: string
    blackoutPeriods?: string[] 
    constructor(dst: string, customRef?: string , blackoutPeriods?: string[]) {
        this.dst = dst
        this.customRef = customRef
        this.blackoutPeriods = blackoutPeriods
    }
}

export class Message {
    text: string;
    recipients: Recipient[];
    constructor(text: string, recipients: Recipient[]) {
        this.text = text
        this.recipients = recipients
    }
}

export class SmsJob {
    messages: Message[]
    options?: Options ;
    constructor(messages: Message[], options?: Options) {
        this.messages = messages
        this.options = options
    }
    static minimalJob(message: string, number: string) : SmsJob {
        let recipient = new Recipient(number);
        let messageCon = [new Message(message, [recipient])];
        return new SmsJob(messageCon)
    }
}