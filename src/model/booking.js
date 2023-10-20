const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  date: { type: String, required: [true, "pls enter the date"] },
  startTime: { type: String, required: [true, "pls enter the Start time"] },
  endTime: { type: String, required: [true, "pls enter the endTime"] },
  customerId: { type: String, required: [true, "pls enter customer Id"] },
  roomId: { type: String, required: [true, "pls enter Room Id"] },
  bookingStatus: { type: Boolean, default: false },
  bookingId: { type: String, unique: true }
},
{
  versionKey:false
});

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
