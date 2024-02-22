const { Category } = require('../models/category')
const express =  require('express')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find()
    if(!categoryList){
        res.status(500).json({
            message: 'No Categories were found.',
            succes: false
        })
    }
    else{
        res.status(200).send(categoryList)
    }
})

module.exports = router