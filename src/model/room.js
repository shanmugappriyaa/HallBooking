const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  noOfSeats: { type: Number, required: [true, "no.of Seats Required"] },
  amenities: { type: Array, required: [true, "enter atleast two amnities"] },
  pricePerHour: { type: Number, required: [true, "enter the amount "] },
  roomId: { type: String, unique: true },
  roomNo: { type: String, unique: true },
  roomName: { type: String, required: [true, "Room name should not be empty"] },
});

const roomModel = mongoose.model("rooms", roomSchema);
module.exports = roomModel;
