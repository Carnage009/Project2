const { Schema,model } = require("mongoose")

const ProductSchema = new Schema(
    {
        name : { type : String, required : true},
        descr : { type : String, required : true},
        categories : { type : Array },
        price : { type : Number },
        img : { type : String, required : true},
    },
    { timestamps : true }
)

module.exports = model("Product", ProductSchema)