import gql from "graphql-tag";

export const notificationApiExtension = gql`
  input notificationInputToAllUser {
    title: String!
    message: String!
  }

  input notificationInputToSingleUser {
    id: ID!
    title: String!
    message: String!
  }

  extend type Mutation {
    sendNotificationToAllUser(input: notificationInputToAllUser!): [Customer]
    sendNotificationToSingleUser(
      input: notificationInputToSingleUser!
    ): Customer
  }
`;
