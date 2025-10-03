import { LightningElement, wire } from "lwc";

// the below import will trigger the eslint rule @salesforce/lwc-mobile/lwc-offline-apex-import warning
// When a client device is offline, Apex-based features can read data that was cached while online,
// but changes (writing data) can’t be saved back to the server.
import getContactList from "@salesforce/apex/ContactController.getContactList";

export default class EslintDemo extends LightningElement {
  contacts;
  error;

  @wire(getContactList)
  wiredContacts({ error, data }) {
    if (data) {
      this.contacts = data;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.contacts = undefined;
    }
  }
}
