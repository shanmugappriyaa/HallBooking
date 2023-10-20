const express = require('express')
const BookingController = require('../controller/bookingController')
const router = express.Router()

router.post('/',BookingController.createBooking)
router.get('/all',BookingController.getAllBooking)
router.get('/roomsWithBookingData',BookingController.roomsBookingData)
router.get('/customerWithBookingData',BookingController.customerBookingData)
router.get('/customerWithBookingInfo/:customerId',BookingController.customerbookingInfo)


module.exports =router