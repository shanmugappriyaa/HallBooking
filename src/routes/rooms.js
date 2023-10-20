const express = require('express')
const RoomController = require('../controller/roomController')
const router = express.Router()

router.post('/',RoomController.createRoom)
router.get('/',RoomController.getAllRooms)

module.exports =router