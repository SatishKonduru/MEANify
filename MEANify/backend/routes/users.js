const {User} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.get(`/`, async (req, res) => {
    const userList = await User.find();
    if(!userList){
        res.status(500).json({
            message:'No Users were found',
            success: false
        })
    }
    else{
        res.status(200).send(userList)
    }
})

router.post(`/`, async (req, res) => {
    const user = req.body
   
    newUser = new User({
        name: user.name,
        email: user.email,
        passwordHash: bcrypt.hashSync(user.passwordHash, 99),
        phone: user.phone,
        city: user.city,
        zip: user.zip,
        country: user.country
    })
    registeredUser = await newUser.save()
    if(!registeredUser){
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
    else{
        res.status(200).send({
            message: 'User registerd Successfully',
            newUser: registeredUser
        })
    }
})

module.exports = router