const { Orders } = require('../models/order')
const express = require('express')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const orderList = await Orders.find();
    if(!orderList){
        res.status(500).json({
            message: 'No Orders were Found.',
            succes: false
        })
    }
    else{
        res.status(200).send(orderList)
    }
})

module.exports = router