import { LightningElement, wire } from "lwc";
import { gql, graphql } from "lightning/uiGraphQLApi";

export default class EslintDemoGraphql extends LightningElement {
  contacts;
  error;

  // GraphQL query to fetch last viewed contacts,  this is a good graphql
  @wire(graphql, {
    query: gql`
      query getLastViewedContacts {
        uiapi {
          query {
            Contact(
              orderBy: { LastViewedDate: { order: DESC, nulls: LAST } }
              first: 10
            ) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                  LastViewedDate {
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
      // Extract contacts from the GraphQL response
      this.contacts = data.uiapi.query.Contact.edges.map((edge) => ({
        Id: edge.node.Id,
        Name: edge.node.Name.value,
        LastViewedDate: edge.node.LastViewedDate?.value
      }));
      this.error = undefined;
    } else if (errors) {
      this.error = errors;
      this.contacts = undefined;
      console.error("GraphQL Error:", errors);
    }
  }

  get hasContacts() {
    return this.contacts && this.contacts.length > 0;
  }

  get hasError() {
    return this.error !== undefined;
  }

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/offline-graphql-no-aggregate-query-supported
  graqhql_no_aggregate_query_supported = gql`
    query AvgOpportunityExample {
      uiapi {
        aggregate {
          Opportunity {
            edges {
              node {
                aggregate {
                  Amount {
                    avg {
                      value
                      displayValue
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-fiscal-date-filtering-supported
  graqhql_no_fiscal_date_filtering_supported = gql`
    {
      uiapi {
        query {
          Account(
            where: {
              LastActivityDate: { eq: { range: { last_n_fiscal_years: 1 } } }
            }
          ) {
            edges {
              node {
                Id
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-more-than-1-parent-record
  graqhql_no_more_than_1_parent_record = gql`
    query {
      uiapi {
        Account(first: 30) {
          edges {
            node {
              Id
              Contacts {
                edges {
                  node {
                    Id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-more-than-100-fields
  graqhql_no_more_than_100_field = gql`
    query OpportunityExample {
      uiapi {
        query {
          Opportunity(first: 201) {
            edges {
              node {
                Id
                Name {
                  value
                }
                Field1 {
                  value
                }
                Field2 {
                  value
                }
                Field3 {
                  value
                }
                Field4 {
                  value
                }
                Field5 {
                  value
                }
                Field6 {
                  value
                }
                Field7 {
                  value
                }
                Field8 {
                  value
                }
                Field9 {
                  value
                }
                Field10 {
                  value
                }
                Field11 {
                  value
                }
                Field12 {
                  value
                }
                Field13 {
                  value
                }
                Field14 {
                  value
                }
                Field15 {
                  value
                }
                Field16 {
                  value
                }
                Field17 {
                  value
                }
                Field18 {
                  value
                }
                Field19 {
                  value
                }
                Field20 {
                  value
                }
                Field21 {
                  value
                }
                Field22 {
                  value
                }
                Field23 {
                  value
                }
                Field24 {
                  value
                }
                Field25 {
                  value
                }
                Field26 {
                  value
                }
                Field27 {
                  value
                }
                Field28 {
                  value
                }
                Field29 {
                  value
                }
                Field30 {
                  value
                }
                Field31 {
                  value
                }
                Field32 {
                  value
                }
                Field33 {
                  value
                }
                Field34 {
                  value
                }
                Field35 {
                  value
                }
                Field36 {
                  value
                }
                Field37 {
                  value
                }
                Field38 {
                  value
                }
                Field39 {
                  value
                }
                Field40 {
                  value
                }
                Field41 {
                  value
                }
                Field42 {
                  value
                }
                Field43 {
                  value
                }
                Field44 {
                  value
                }
                Field45 {
                  value
                }
                Field46 {
                  value
                }
                Field47 {
                  value
                }
                Field48 {
                  value
                }
                Field49 {
                  value
                }
                Field50 {
                  value
                }
                Field51 {
                  value
                }
                Field52 {
                  value
                }
                Field53 {
                  value
                }
                Field54 {
                  value
                }
                Field55 {
                  value
                }
                Field56 {
                  value
                }
                Field57 {
                  value
                }
                Field58 {
                  value
                }
                Field59 {
                  value
                }
                Field60 {
                  value
                }
                Field61 {
                  value
                }
                Field62 {
                  value
                }
                Field63 {
                  value
                }
                Field64 {
                  value
                }
                Field65 {
                  value
                }
                Field66 {
                  value
                }
                Field67 {
                  value
                }
                Field68 {
                  value
                }
                Field69 {
                  value
                }
                Field70 {
                  value
                }
                Field71 {
                  value
                }
                Field72 {
                  value
                }
                Field73 {
                  value
                }
                Field74 {
                  value
                }
                Field75 {
                  value
                }
                Field76 {
                  value
                }
                Field77 {
                  value
                }
                Field78 {
                  value
                }
                Field79 {
                  value
                }
                Field80 {
                  value
                }
                Field81 {
                  value
                }
                Field82 {
                  value
                }
                Field83 {
                  value
                }
                Field84 {
                  value
                }
                Field85 {
                  value
                }
                Field86 {
                  value
                }
                Field87 {
                  value
                }
                Field88 {
                  value
                }
                Field89 {
                  value
                }
                Field90 {
                  value
                }
                Field91 {
                  value
                }
                Field92 {
                  value
                }
                Field93 {
                  value
                }
                Field94 {
                  value
                }
                Field95 {
                  value
                }
                Field96 {
                  value
                }
                Field97 {
                  value
                }
                Field98 {
                  value
                }
                Field99 {
                  value
                }
                Field100 {
                  value
                }
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-more-than-3-child-entities
  graqhql_no_more_than_3_child_entities = gql`
    query {
      uiapi {
        Account(first: 1) {
          edges {
            node {
              Id
              Contacts {
                edges {
                  node {
                    Id
                  }
                }
              }
              Opportunities {
                edges {
                  node {
                    Id
                  }
                }
              }
              Cases {
                edges {
                  node {
                    Id
                  }
                }
              }
              Documents {
                edges {
                  node {
                    Id
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-more-than-3-root-entities
  graqhql_no_more_than_3_root_entities = gql`
    query {
      uiapi {
        query {
          Contacts {
            edges {
              node {
                Id
              }
            }
          }
          Opportunities {
            edges {
              node {
                Id
              }
            }
          }
          Cases {
            edges {
              node {
                Id
              }
            }
          }
          Documents {
            edges {
              node {
                Id
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-mutation-supported
  graqhql_no_mutation_supported = gql`
    mutation AccountExample {
      uiapi {
        AccountCreate(input: { Account: { Name: "Trailblazer Express" } }) {
          Record {
            Id
            Name {
              value
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-semi-anti-join-supported
  graqhql_no_semi_anti_join_supported = gql`
    query AccountExample {
      uiapi {
        query {
          Account(
            where: {
              Id: {
                inq: {
                  Opportunity: { StageName: { eq: "Closed Won" } }
                  ApiName: "AccountId"
                }
              }
            }
          ) {
            edges {
              node {
                Id
                Name {
                  value
                }
              }
            }
          }
        }
      }
    }
  `;

  // this graphq will trigger the eslint rule @salesforce/lwc-mobile/no-unsupported-scope
  graqhql_no_unsupported_scope = gql`
    query scopeQuery {
      uiapi {
        query {
          Case(first: 20, scope: ASSIGNEDTOME) {
            edges {
              node {
                Id
                Name {
                  value
                }
              }
            }
          }
        }
      }
    }
  `;
}
