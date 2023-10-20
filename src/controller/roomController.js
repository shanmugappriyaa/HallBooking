const roomModel = require("../model/room");

const createRoom = async (req, res) => {
  console.log(req.body);
  try {
    req.body.roomId = Math.floor(Math.random() * 90000) + 10000;
    req.body.roomNo = "R" + Math.floor(Math.random() * 900) + 100;

    let room = await roomModel.create(req.body);

    res.status(201).send({
      message: "Room created Successfully",
      room,
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const getAllRooms= async(req,res)=>{
  try {
    const room = await roomModel.find();
    res.status(201).send({
      message: "Room Deatils",
      count: room.length,
      room
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
module.exports = { createRoom ,getAllRooms};

