/* 
                          Thought Note 
 Here i define  a Mongoose schema for a product in an e-commerce website.

 It defines the properties that a product object can have, their data types
 and whether they are required or not.                        
*/
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types; //or mongoose.Schematypes
const ProductSchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Brand: {
    type: String,
    required: true,
  },

  Cost: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 10,
  },
  author: {
    type: ObjectId,
    ref: "SellerModel", //to get details of the seller
  },
  likes: [
    {
      type: ObjectId,
      ref: "UserModel", //to get details of buyer
    },
  ],
  review: [
    {
      reviewText: String, //to get details of the reviewer
      reviewBy: {
        type: ObjectId,
        refPath: "reviewModel",
      },
      reviewModel: {
        type: String,
        enum: ["UserModel", "SellerModel"],
      },
    },
  ],
});
const ProductModel = mongoose.model("ProductModel", ProductSchema);
module.exports = ProductModel;
