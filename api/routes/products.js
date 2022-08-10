const Product = require("../models/Product")
const router = require("express").Router()

router.get("/", async (req ,res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    }catch(err) {
        res.json(err)
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const product = await Product.findOne({ _id: id });
        return res.json(product); 
    }catch (err) {
        return res.json(err);
    }
})

router.post("/create", async(req, res) => {
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    } catch(err) {
        res.json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            body : req.body
        },
        { new : true }
        )
        res.status(200).json(updatedProduct)
    } catch(err) {
        res.json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Продукт удален")
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router