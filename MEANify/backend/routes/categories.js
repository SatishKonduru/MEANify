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

router.post(`/`, async (req, res) => {
    const data = req.body
    const category = new Category({
        name: data.name,
        color: data.color,
        icon: data.icon,
        image: data.image
    })
    savedCategory = await category.save()
    if(!savedCategory){
        res.status(401).json({
            message: 'Bad Request. No Category was created.',
            success: false
        })
    }
    else{
        res.status(200).send(savedCategory)
    }
})

router.delete(`/:id`,  async (req, res) => {
    const id = req.params.id
    deletedCategory = await Category.findByIdAndDelete(id)
    if(!deletedCategory){
        res.status(401).json({
            message: 'Category Not Found',
            success: false
        })
    }
    else{
        res.status(200).json({
            message: 'Category Deleted Successfully.',
            success: true
        })
    }

})

router.get(`/:id`, async (req, res) => {
    const id = req.params.id
    const resultCategory = await Category.findById(id)
    if(!resultCategory){
        res.status(401).json({
            message: 'Category Not Found',
            success: false
        })
    }
    else{
        res.status(200).send(resultCategory)
    }
})

router.patch(`/:id`, async (req, res) => {
    const id = req.params.id
    const data = req.body
    updatedCategory = await Category.findByIdAndUpdate(
        id,
        {
            name: data.name
        },
        {
            new: true
        }
    )
    if(!updatedCategory){
        res.status(401).json({
            message: 'Category Not Found',
            success: false
        })
    }
    else{
        res.status(200).json({
            message: "Category Updated Successfully",
            success: true
        })
    }
})
module.exports = router