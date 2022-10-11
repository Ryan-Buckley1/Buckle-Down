const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    phone: Int
    income: Int
    palette: Int
    billCount: Int
    eventCount: Int
    events: [Event]
    bills: [Bill]
  }
  type Bill {
    _id: ID
    date: String
    amount: Int
    company: String
    recurring: Int
    urlToPay: String
    siteUsername: String
    notes: String
  }
  type Event {
    _id: ID
    name: String
    location: String
    date: String
    requirements: String
    timeStart: Int
    timeEnd: Int
    allDay: Boolean
    recurring: Int
  }
  type Auth {
    token: ID!
    user: User
  }
  input UserInput {
    username: String
    email: String
    phone: Int
    income: Int
    palette: Int
  }
  input BillInput {
    amount: Int
    company: String
    date: String
    recurring: Int
    urlToPay: String
    siteUsername: String
    notes: String
  }
  input EventInput {
    name: String
    location: String
    date: String
    requirements: String
    timeStart: Int
    timeEnd: Int
    allDay: Boolean
    recurring: Int
  }
  type Query {
    me: User
    user(username: String): User
    event(_id: ID!): Event
    events(username: String): [Event]
    bill(_id: ID!): Bill
    bills(username: String): [Bill]
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    editUser(_id: ID!, userData: UserInput!): Auth
    editUserPassword(password: String!): User
    addBill(billData: BillInput!): Bill
    removeBill(_id: ID!): Bill
    editBill(_id: ID!, billData: BillInput!): Bill
    addEvent(eventData: EventInput!): Event
    removeEvent(_id: ID!): Event
    editEvent(_id: ID!, eventData: EventInput!): Event
    addFriend(friendID: ID!): User
    removeFriend(friendID: ID!): User
  }
`;

module.exports = typeDefs;
