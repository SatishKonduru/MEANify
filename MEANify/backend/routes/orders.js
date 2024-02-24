const { Orders } = require('../models/order')
const { OrderItem} = require('../models/orderItem')
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

router.post(`/`, async (req, res) => {
    const orderData = req.body
    const orderItemsIds = Promise.all(orderData.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity : orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))
    const OrderItemsIdsResolved = await orderItemsIds
    const order = new Orders({
        orderItems: OrderItemsIdsResolved,
        shippingAddress1: orderData.shippingAddress1,
        shippingAddress2: orderData.shippingAddress2,
        city: orderData.city,
        zip: orderData.zip,
        country: orderData.country,
        phone: orderData.phone,
        user: orderData.user
    })
    newOrder = await order.save()
    if(!newOrder){
        res.status(400).json({
            message: "No Order was placed",
            success:  false

        })
    }
    else{
        res.status(200).send({
            message: 'Order Placed Successfully',
            success: true,
            newOrder: newOrder
        })
    }
})

module.exports = router