import { LightningElement, wire } from "lwc";
import getContacts from "@salesforce/apex/ContactController.getContacts";

const COLUMNS = [
  {
    label: "Name",
    fieldName: "Name",
    type: "text",
    sortable: true
  },
  {
    label: "Email",
    fieldName: "Email",
    type: "email",
    sortable: true
  },
  {
    label: "Phone",
    fieldName: "Phone",
    type: "phone",
    sortable: true
  },
  {
    label: "Account Name",
    fieldName: "AccountName",
    type: "text",
    sortable: true
  },
  {
    label: "Mailing Street",
    fieldName: "MailingStreet",
    type: "text",
    wrapText: true
  },
  {
    label: "Mailing City",
    fieldName: "MailingCity",
    type: "text",
    sortable: true
  },
  {
    label: "Mailing State",
    fieldName: "MailingState",
    type: "text",
    sortable: true
  },
  {
    label: "Mailing Postal Code",
    fieldName: "MailingPostalCode",
    type: "text",
    sortable: true
  }
];

export default class ContactDataTable extends LightningElement {
  contacts = [];
  columns = COLUMNS;
  error;
  isLoading = true;
  sortBy;
  sortDirection;

  @wire(getContacts)
  wiredContacts({ error, data }) {
    this.isLoading = false;
    if (data) {
      // Transform the data to include Account Name for display
      this.contacts = data.map((contact) => ({
        Id: contact.Id,
        Name: contact.Name,
        Email: contact.Email,
        Phone: contact.Phone,
        AccountName: contact.Account ? contact.Account.Name : "",
        MailingStreet: contact.MailingStreet,
        MailingCity: contact.MailingCity,
        MailingState: contact.MailingState,
        MailingPostalCode: contact.MailingPostalCode
      }));
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.contacts = [];
      console.error("Error fetching contacts:", error);
    }
  }

  handleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.contacts];

    cloneData.sort(this.sortData(sortedBy, sortDirection === "asc" ? 1 : -1));
    this.contacts = cloneData;
    this.sortBy = sortedBy;
    this.sortDirection = sortDirection;
  }

  sortData(field, reverse) {
    const key = function (x) {
      return x[field];
    };

    return function (a, b) {
      a = key(a);
      b = key(b);
      return reverse * ((a > b) - (b > a));
    };
  }

  get hasContacts() {
    return this.contacts && this.contacts.length > 0;
  }

  get hasError() {
    return this.error !== undefined;
  }

  get errorMessage() {
    return (
      this.error?.body?.message ||
      this.error?.message ||
      "Unknown error occurred"
    );
  }
}
