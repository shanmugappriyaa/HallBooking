const bookingModel = require("../model/booking");
const customerModel = require("../model/customer");
const roomModel = require("../model/room");

const createBooking = async (req, res) => {
  console.log(req.body);
  try {
    req.body.bookingId = Math.floor(Math.random() * 90) + 10;
    let booking = await bookingModel.create(req.body);
    res.status(201).send({
      message: "booking created Successfully",
      booking,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllBooking = async (req, res) => {
  try {
    const all = await bookingModel.find();
    console.log("---------> ", all);
    const result = await bookingModel
      .aggregate()
      .lookup({
        from: "customers",
        localField: "customerId",
        foreignField: "customerId",
        as: "customerInfo",
      })
      .lookup({
        from: "rooms",
        localField: "roomId",
        foreignField: "roomId",
        as: "roomInfo",
      })
      .project({
        bookingId: 1,
        roomId: 1,
        customerId: 1,
        date: 1,
        startTime: 1,
        endTime: 1,
        customerName: "$customerInfo.customerName",
        roomName: "$roomInfo.roomName",
        roomId: "$roomInfo.roomId",
      })
      .exec();
    console.log("result============> ", result[0]);
    return res.status(201).send({ data: result });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const roomsBookingData = async (req, res) => {
  try {
    const rooms = await roomModel.find();

    const bookingData = [];

    for (let i in rooms) {
      const booking = await bookingModel.find(
        { roomId: rooms[i].roomId },
        { bookingId: 0, bookingStatus: 0, _id: 0 }
      );
      if (booking?.length > 0) {
        // return res.send(booking);
        for (let j in booking) {
          const customer = await customerModel.findOne({
            customerId: booking[j].customerId,
          });
          console.log(customer, customer.customerName);
          booking[j]._doc.customerName = customer.customerName;
        }
      }

      const info = {
        roomName: rooms[i].roomName,
        booking: booking,
      };
      bookingData.push(info);
    }

    return res.status(201).send({ bookingData });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const customerBookingData = async (req, res) => {
  try {
    const customer = await customerModel.find();
    const bookingData = [];
    for (let i in customer) {
      const booking = await bookingModel.find(
        { customerId: customer[i].customerId },
        { bookingId: 0, bookingStatus: 0, _id: 0, customerId: 0 }
      );
      if (booking?.length > 0) {
        for (let j in booking) {
          const room = await roomModel.findOne({ roomId: booking[j].roomId });
          booking[j]._doc.roomName = room.roomName;
        }
      }
      const info = {
        customerName: customer[i].customerName,
        booking: booking,
      };
      bookingData.push(info);
    }

    return res.status(201).send({ bookingData });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const customerbookingInfo = async (req, res) => {
  try {
    const customer = await customerModel.findOne({ customerId: req.params.customerId });
    console.log("-------------> ".customer);
    const bookingData = [];
    const booking = await bookingModel.find(
      { customerId: customer.customerId },
      { bookingId: 0, bookingStatus: 0, _id: 0 }
    );
    console.log(booking);
    if (booking?.length > 0) {
      for (let i in booking) {
        const room = await roomModel.findOne({ roomId: booking[i].roomId });
        booking[i]._doc.roomName = room.roomName;
      }
      const info = {
        customerName: customer.customerName,
        booking: booking,
      };
      bookingData.push(info);
    }

    return res.status(201).send({ bookingData });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBooking,
  roomsBookingData,
  customerBookingData,
  customerbookingInfo,
};
