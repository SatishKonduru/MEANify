const {User} = require('../models/user')
const express = require('express')
const router = express.Router()

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

module.exports = router