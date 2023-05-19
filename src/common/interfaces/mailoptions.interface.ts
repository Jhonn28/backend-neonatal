export interface IMailOptions {
  to?: string | Array<string> ;
  cc?: string | Array<string> ;
  bcc?: string | Array<string>;
  replyTo?: string | Address;
  /** The message-id this message is replying */
  inReplyTo?: string | Address;
  subject?: string;
  text?: string ;
  attachments?: [];
  template?: string; 
  context?: any;
  from?: string;
}

interface Address {
  name: string;
  address: string;
}
