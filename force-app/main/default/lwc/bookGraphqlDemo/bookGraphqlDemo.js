import { LightningElement, wire } from "lwc";
import { gql, graphql } from "lightning/uiGraphQLApi";

export default class BookGraphqlDemo extends LightningElement {
  books;
  error;

  // GraphQL query to fetch first 10 Book__c records
  @wire(graphql, {
    query: gql`
      query getBooks {
        uiapi {
          query {
            Book__c(first: 10) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  Chapter1__c {
                    value
                  }
                  Chapter2__c {
                    value
                  }
                  Chapter3__c {
                    value
                  }
                }
              }
            }
          }
        }
      }
    `
  })
  graphqlQueryResult({ data, errors }) {
    if (data) {
      // Extract books from the GraphQL response
      this.books = data.uiapi.query.Book__c.edges.map((edge) => ({
        Id: edge.node.Id,
        Name: edge.node.Name.value,
        Author: edge.node.Author__c?.value,
        Genre: edge.node.Genre__c?.value,
        PublicationDate: edge.node.Publication_Date__c?.value,
        Price: edge.node.Price__c?.value,
        CreatedDate: edge.node.CreatedDate?.value
      }));
      this.error = undefined;
    } else if (errors) {
      this.error = errors;
      this.books = undefined;
      console.error("GraphQL Error:", errors);
    }
  }

  get hasBooks() {
    return this.books && this.books.length > 0;
  }

  get hasError() {
    return this.error !== undefined;
  }

  get errorMessage() {
    if (this.error && Array.isArray(this.error)) {
      return this.error.map((err) => err.message).join(", ");
    }
    return this.error?.message || "Unknown error occurred";
  }
}
