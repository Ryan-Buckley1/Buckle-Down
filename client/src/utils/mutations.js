import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($_id: ID!, $userData: UserInput!) {
    editUser(_id: $_id, userData: $userData) {
      token
      user {
        _id
        username
        email
        phone
        income
        palette
      }
    }
  }
`;

export const EDIT_USER_PASSWORD = gql`
  mutation editUserPassword($password: String!) {
    editUserPassword(password: $password) {
      user {
        user
        email
      }
    }
  }
`;

export const ADD_BILL = gql`
  mutation addBill($billData: BillInput) {
    addBill(billData: $billData) {
      bill {
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

export const EDIT_BILL = gql`
  mutation editBill($_id: ID!, $billData: BillInput) {
    editBill(_id: $_id, billData: $billData) {
      bill {
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

export const REMOVE_BILL = gql`
  mutation removeBill($_id: ID!) {
    removeBill(_id: $_id) {
      bill {
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
export const REMOVE_EVENT = gql`
  mutation removeEvent($_id: ID!) {
    removeEvent(_id: $_id) {
      event {
        _id
        name
        location
        date
        requirement
        timeStart
        timeEnd
        allDay
        recurring
      }
    }
  }
`;
export const ADD_EVENT = gql`
  mutation addBill($eventData: EventInput) {
    addBill(eventData: $eventData) {
      event {
        _id
        name
        location
        date
        requirement
        timeStart
        timeEnd
        allDay
        recurring
      }
    }
  }
`;

export const EDIT_EVENT = gql`
  mutation editEvent($_id: ID!, $eventData: EventInput) {
    editEvent(_id: $_id, eventData: $eventData) {
      event {
        _id
        name
        location
        date
        requirement
        timeStart
        timeEnd
        allDay
        recurring
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;
