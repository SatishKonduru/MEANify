const { Orders } = require('../models/order')
const { OrderItem} = require('../models/orderItem')
const express = require('express')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const orderList = await Orders.find().populate('user', 'name city');
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

router.get(`/:id`, async (req, res) => {
    const orderId = req.params.id
    const orderList = await Orders.findById(orderId)
    .populate('user', 'name city')
    .populate({path: 'orderItems', populate: {path: 'product', populate:'category'}})
  
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
    const totalPrices = await Promise.all(OrderItemsIdsResolved.map(async orderItemId => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product','price')
        const totalPrice = orderItem.product.price * orderItem.quantity
        return totalPrice
    }))
    const totalPrice = totalPrices.reduce((a,b) => a+b, 0)
    const order = new Orders({
        orderItems: OrderItemsIdsResolved,
        shippingAddress1: orderData.shippingAddress1,
        shippingAddress2: orderData.shippingAddress2,
        city: orderData.city,
        zip: orderData.zip,
        country: orderData.country,
        phone: orderData.phone,
        totalPrice: totalPrice,
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
router.patch(`/:id`, async (req, res) => {
    const id = req.params.id
    const data = req.body
    updatedOrder = await Orders.findByIdAndUpdate(
        id,
        {
            status: data.status
        },
        {
            new: true
        }
    )
    if(!updatedOrder){
        res.status(401).json({
            message: 'Order Not Found',
            success: false
        })
    }
    else{
        res.status(200).json({
            message: "Order Status Updated Successfully",
            success: true
        })
    }
})
router.delete(`/:id`,  async (req, res) => {
    const id = req.params.id
    deletedOrder = await Orders.findByIdAndDelete(id)
    if(!deletedOrder){
        res.status(401).json({
            message: 'Order Not Found',
            success: false
        })
    }
    else{
        res.status(200).json({
            message: 'Order Deleted Successfully.',
            success: true
        })
    }

})

router.get(`/get/totalsales`, async (req, res) => {
    const totalSales = await Orders.aggregate([
        { $group : {_id: null, totalsales : { $sum: '$totalPrice'}}}
    ])
    if(!totalSales){
        res.status(400).send({
            message: 'Order Sales can not generated',
            succes: false
        })
    }
    else{
        res.status(200).send({
            // message: 'Order Sales generated.',
            totalSales: totalSales.pop().totalsales
        })
    }
})

router.get(`/get/count`, async (req, res) => {
    const ordersCount = await Orders.countDocuments()
    if(!ordersCount){
        res.status(400).json({
            message: 'No Orders were found',
            success: false
        })
    }
    else{
        res.status(200).send({
            ordersCount: ordersCount
        })
    }
})

router.get(`/get/userOrders/:id`, async (req, res) => {
    const userId = req.params.id
    const orderList = await Orders.find({user: userId})
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