const {User} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const authenticateToken = require('../helpers/authentication')
const checkRole = require('../helpers/checkRole')
// router.get(`/`, async (req, res) => {
//     const userList = await User.find();
//     if(!userList){
//         res.status(500).json({
//             message:'No Users were found',
//             success: false
//         })
//     }
//     else{
//         res.status(200).send(userList)
//     }
// })

router.post(`/register`, async (req, res) => {
    const user = req.body
   
    newUser = new User({
        name: user.name,
        email: user.email,
        passwordHash: bcrypt.hashSync(user.passwordHash, 9),
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

router.get(`/`, async (req, res) => {
    userList = await User.find().select('-passwordHash')
    if(!userList){
        res.status(500).json({
            message: 'No Users were found',
            success: false
        })
    }
    else{
        res.status(200).send(userList)
    }
})

router.get(`/:id`, async (req, res) => {
    const id = req.params.id
    if(!mongoose.isValidObjectId(id)){
        return res.status(401).json({
            message: "Invalid Id",
            succes: false
        })
    }
    userDetails = await User.findById(id).select('name email phone ')
    if(!userDetails){
        res.status(400).json({
            message: "User was not Found.",
            success: false
        })
    }
    else{
        res.status(200).send({
            user: userDetails,
            success: true
        })
    }
})

router.post(`/login`, async (req, res) => {
    const user = req.body
    loginUser = await User.findOne({email: user.email})
    if(!loginUser){
        return res.status(400).send({
            message: 'User Not Found',
            succes: false
        })
    }
    if(loginUser && bcrypt.compareSync(user.passwordHash, loginUser.passwordHash)){
        console.log("Log user details: ", loginUser)
        const payload = {
            email: user.email,
            isAdmin: loginUser.isAdmin
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '2d'})
        res.status(200).send({
            message: "User Authenticated",
            success: true,
            token: token
        })
    }
    else{
        res.status(400).json({
            message: 'Invalid Password',
            success: false
        })
    }
   
})

module.exports = router