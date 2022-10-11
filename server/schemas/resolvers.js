const { User, Bill, Event } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("events")
          .populate("bills");

        return userData;
      }
      throw new AuthenticationError(`You aren't logged in!`);
    },
    user: async (parent, { _id }, context) => {
      const singleUser = await User.findById({ _id })
        .select("-password")
        .populate("events");
      return singleUser;
    },
    bills: async (parent, { username }, context) => {
      const params = username ? { username } : {};
      const allBills = await Bill.find(params);
      return allBills;
    },
    bill: async (parent, { _id }, context) => {
      const singleBill = await Bill.findOne({ _id });
      return singleBill;
    },
    events: async (parent, { username }, context) => {
      const params = username ? { username } : {};
      const allEvents = await Event.find(params);
      return allEvents;
    },
    event: async (parent, { _id }, context) => {
      const singleEvent = await Event.findOne({ _id });
      return singleEvent;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    editUser: async (parent, { _id, userData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: _id },
          { userData: userData },
          { new: true }
        );
        const token = signToken(updatedUser);
        return { token, updatedUser };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editUserPassword: async (parent, { password }, context) => {
      if (context.user) {
        const updatedPassword = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { password: password }
        );
        return updatedPassword;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addEvent: async (parent, { eventData }, context) => {
      if (context.user) {
        const newEvent = await Event.create(
          {
            ...eventData,
          },
          { runValidators: true, new: true }
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { events: newEvent._id } }
        );
        return newEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeEvent: async (parent, { _id }, context) => {
      if (context.user) {
        const deletedEvent = await Event.findByIdAndDelete({ _id: _id });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { events: deletedEvent._id } },
          { new: true }
        );
        return deletedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editEvent: async (parent, { _id, eventData }, context) => {
      if (context.user) {
        const editedEvent = await Event.findByIdAndUpdate(
          { _id: _id },
          { eventData: eventData },
          { new: true, runValidators: true }
        );
        return editedEvent;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addBill: async (parent, { billData }, context) => {
      if (context.user) {
        const newBill = await Bill.create(
          {
            ...billData,
          },
          { runValidators: true, new: true }
        );
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { bills: newBill._id } }
        );
        return newBill;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBill: async (parent, { _id }, context) => {
      if (context.user) {
        const deletedBill = await Bill.findByIdAndDelete({ _id: _id });
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { bills: deletedBill._id } },
          { new: true }
        );
        return deletedBill;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    editBill: async (parent, { _id, billData }, context) => {
      if (context.user) {
        const editedBill = await Bill.findByIdAndUpdate(
          { _id: _id },
          { billData: billData },
          { new: true, runValidators: true }
        );
        return editedBill;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const addedFriend = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { friends: friendId } },
          { new: true }
        );
        return addedFriend;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const removedFriend = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: friendId } },
          { new: true }
        );
        return removedFriend;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
