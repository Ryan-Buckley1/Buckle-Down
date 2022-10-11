import { gql } from "@apollo/client";

export const QUERY_FULL_ME = gql`
  {
    me {
      _id
      username
      email
      billCount
      bills {
        _id
        amount
        company
        date
      }
      eventCount
      events {
        _id
        name
        date
        location
      }
      friends {
        _id
      }
    }
  }
`;

export const QUERY_BASIC_ME = gql`
  {
    me {
      _id
      username
      billCount
      eventCount
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_EVENT = gql`
  query event($_id: ID!) {
    event(_id: $_id) {
      name
      location
      date
      requirements
      timeStart
      timeEnd
      allDay
      recurring
    }
  }
`;

export const QUERY_EVENTS = gql`
  query events($username: String!) {
    user(username: $username) {
      _id
      username
      events {
        name
        location
        date
        requirements
        timeStart
        timeEnd
        allDay
        recurring
      }
    }
  }
`;

export const QUERY_BILL = gql`
  query bill($_id: ID!) {
    bill(_id: $_id) {
      _id
      date
      amount
      company
      recurring
      urlToPay
      siteUsername
      notes
    }
  }
`;

export const QUERY_BILLS = gql`
  query bills($username: String!) {
    user(username: $username) {
      _id
      username
      bills {
        _id
        amount
        company
        recurring
        urlToPay
        siteUsername
        notes
      }
    }
  }
`;
