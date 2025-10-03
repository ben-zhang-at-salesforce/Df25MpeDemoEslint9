import { LightningElement, api, wire } from "lwc";
import { getRelatedListRecords } from "lightning/uiRelatedListApi";

const COLUMNS = [
  {
    label: "Opportunity Name",
    fieldName: "Name",
    type: "text",
    sortable: true
  },
  {
    label: "Stage",
    fieldName: "StageName",
    type: "text",
    sortable: true
  },
  {
    label: "Amount",
    fieldName: "Amount",
    type: "currency",
    sortable: true
  },
  {
    label: "Close Date",
    fieldName: "CloseDate",
    type: "date",
    sortable: true
  },
  {
    label: "Probability",
    fieldName: "Probability",
    type: "percent",
    sortable: true,
    cellAttributes: {
      iconName: { fieldName: "probabilityIcon" }
    }
  },
  {
    label: "Owner",
    fieldName: "OwnerName",
    type: "text",
    sortable: true
  }
];

export default class RelatedOpportunities extends LightningElement {
  @api recordId; // The parent record ID (e.g., Account ID)

  opportunities = [];
  columns = COLUMNS;
  error;
  isLoading = true;
  sortBy;
  sortDirection;

  @wire(getRelatedListRecords, {
    parentRecordId: "$recordId",
    relatedListId: "Opportunities",
    fields: [
      "Opportunity.Id",
      "Opportunity.Name",
      "Opportunity.StageName",
      "Opportunity.Amount",
      "Opportunity.CloseDate",
      "Opportunity.Probability",
      "Opportunity.Owner.Name"
    ]
  })
  wiredOpportunities({ error, data }) {
    this.isLoading = false;
    if (data) {
      // Transform the data for display
      this.opportunities = data.records.map((record) => {
        const fields = record.fields;
        return {
          Id: fields.Id.value,
          Name: fields.Name.value,
          StageName: fields.StageName.value,
          Amount: fields.Amount.value,
          CloseDate: fields.CloseDate.value,
          Probability: fields.Probability.value
            ? fields.Probability.value / 100
            : 0,
          OwnerName: fields.Owner.value
            ? fields.Owner.value.fields.Name.value
            : "",
          probabilityIcon: this.getProbabilityIcon(fields.Probability.value)
        };
      });
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.opportunities = [];
      console.error("Error fetching related opportunities:", error);
    }
  }

  getProbabilityIcon(probability) {
    if (!probability) return "";
    if (probability >= 75) return "utility:success";
    if (probability >= 50) return "utility:warning";
    if (probability >= 25) return "utility:info";
    return "utility:error";
  }

  handleSort(event) {
    const { fieldName: sortedBy, sortDirection } = event.detail;
    const cloneData = [...this.opportunities];

    cloneData.sort(this.sortData(sortedBy, sortDirection === "asc" ? 1 : -1));
    this.opportunities = cloneData;
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

  get hasOpportunities() {
    return this.opportunities && this.opportunities.length > 0;
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

  get opportunityCount() {
    return this.opportunities ? this.opportunities.length : 0;
  }

  get totalAmount() {
    if (!this.opportunities || this.opportunities.length === 0) return 0;
    return this.opportunities.reduce((total, opp) => {
      return total + (opp.Amount || 0);
    }, 0);
  }
}
