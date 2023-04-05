const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const protectedRoute = require("../middleware/protectedResource");
const ProductModel = require("../models/product_model");
const UserModel = require("../models/user_model");
const SellerModel = require("../models/seller_model");

// Product Details API
/*
This  API listens  GET requests on the /product/:id endpoint, where id is the ID of the product to fetch.

Inside the route handler function, the productId is extracted from the request parameters. 

Then, the ProductModel.findById() method is used to find the product with the specified ID in the database.

Atlast , it provide us with details of the product 
*/
router.get("/product/:id", (req, res) => {
  const productId = req.params.id;

  ProductModel.findById(productId)
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
      model: UserModel,
    })
    .populate("author", "_id FullName ProfileImg")
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ product: product });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
