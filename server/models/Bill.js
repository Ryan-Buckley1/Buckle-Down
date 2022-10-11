const { Schema, model } = require("mongoose");

const billSchema = new Schema(
  {
    amount: {
      type: Number,
    },
    company: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    recurring: {
      type: Number,
      required: true,
      default: 0,
    },
    urlToPay: {
      type: String,
    },
    siteUsername: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Bill = model("Bill", billSchema);

module.exports = Bill;
