const express = require('express')
const CustomerController = require('../controller/customerController')
const router = express.Router()

router.post('/',CustomerController.createCustomer)
router.get('/',CustomerController.getAllCustomer)

module.exports =router