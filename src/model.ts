
/**
 *  This object can be used to set more details about how the SmsJob should be processed. Short explaination for each key:
 *
 *   @param src - Set your source number
 *   @param encoding - Which encoding should be used, default: STANDARD options: [ STANDARD, UTF-16 ]
 *   @param billcode - Max. 70 characters.
 *   @param status_requested - Delivery notification requested.
 *   @param flash - specify if the sms should be express or not
 *   @param customer_ref - Recommended max. 64 characters.
 *   @param validity_min - Validity of the SMS in minutes. When 0 the provider’s default value is used. Otherwise, values must be between 5 and 2880 minutes.
 *   @param max_parts - Maximum allowed parts in a multi-part message. Values must be between 1 and 20. Longer messages are truncated.
 *   @param invalid_characters - Define how to handle invalid characters in SMS. options: [ REFUSE, REPLACE, TO_UTF16, TRANSLITERATE ]
 *   @param qos - Quality of Service. options: [ EXPRESS, NORMAL ]
 *   @param job_period - Timestamp to schedule when to start processing the SMS Job (iso-8601).
 *   @param duplicate_detection - bool
 *   @param blackout_periods - Time periods in which no SMS is delivered (iso-8601). SMS will be scheduled to be sent at the end of the blackout period.
 *  
 */
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

/**
 * @parm dst - destination number
 * @parm customRef - Recommended max. 64 characters. Recipient mobile phone number used as default.
 * @parm blackoutPeriods - Time periods in which no SMS is delivered (iso-8601). SMS will be scheduled to be sent at the end of the blackout period.
 */
export class Recipient {
    dst: string
    customRef?: string
    blackoutPeriods?: string[]
    constructor(dst: string, customRef?: string, blackoutPeriods?: string[]) {
        this.dst = dst
        this.customRef = customRef
        this.blackoutPeriods = blackoutPeriods
    }
}

/**
 * @param text - The message which should be send to the destination
 * @param recipients - A list of recipients which should receive the message
 */
export class Message {
    text: string;
    recipients: Recipient[];
    constructor(text: string, recipients: Recipient[]) {
        this.text = text
        this.recipients = recipients
    }
}

/**
 * @param messages - List of multiple messages which can process within one job
 * @param options - Set a specific processing behavior for the messages
 */
export class SmsJob {
    messages: Message[]
    options?: Options;
    constructor(messages: Message[], options?: Options) {
        this.messages = messages
        this.options = options
    }
    /**
     * Create a minimal sms job to send your message to a specific number
     * 
     * @param message - The message to send
     * @param number - The number to send
     */
    static minimalJob(message: string, number: string): SmsJob {
        let recipient = new Recipient(number);
        let messageCon = [new Message(message, [recipient])];
        return new SmsJob(messageCon)
    }
}