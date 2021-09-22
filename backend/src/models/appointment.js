const mongoose = require("mongoose");
const Client = require("./client");
const Schema = mongoose.Schema;

const currentDate = new Date().toISOString();

const AppointmentSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  startTime: String,
  morningOrEvening: String,
  endTime: String,
  duration: Number,
  price: Number,
  createdAt: { type: Date, default: currentDate },
  bookedWithCardID: String,
  client: Client.schema.obj,
  professional: String,
  treatments: [{ name: String, price: Number, duration: Number }],
  confirmed: { type: Boolean, default: false },
  notes: String,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);