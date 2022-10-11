const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    requirements: {
      type: String,
    },
    timeStart: {
      type: Number,
    },
    timeEnd: {
      type: Number,
    },
    allDay: {
      type: Boolean,
      default: false,
    },
    recurring: {
      type: Number,
      required: true,
      default: 0,
    },
    username: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
