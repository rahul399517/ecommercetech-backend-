/**
                          Thought Note 

    The product Route contain mulitiple Rest API codes for  multiple fucntionality like 
    "addind new product" , "Delete product" , "adding the reviews" , "showing product details"
    "searching Products" etc 
    
    To do above functionality , I have imported mulitiple loibraries such as express.js
    , mongoose etc 

    I have also imported multiple files like ProtectedRoute from middleware folder along with various 
    moedels 

 */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ProductModel = require("../models/product_model");
const ProtectedRoute = require("../middleware/protectedResource");
const UserModel = require("../models/user_model");
const SellerModel = require("../models/seller_model");
//above we imported the middleware to check the user weather is logged in or not

//Add new Product API
/*

The below API I designed to handle a POST request to the "/createproduct" route, 
with the ProtectedRoute middleware added to require authentication. 

It expects the request body to contain the following fields: ProductName, Category, 
Cost, Brand, Description, Image, and review.

*/
router.post("/createproduct", ProtectedRoute, (req, res) => {
  const { ProductName, Category, Cost, Brand, Description, Image, review } =
    req.body;
  if (!ProductName || !Category || !Cost || !Brand || !Description || !Image) {
    return res
      .status(400)
      .json({ error: "Please enter all mandatory fields." });
  }
  req.seller.Password = undefined;
  const ProductObj = new ProductModel({
    ProductName,
    Category,
    Cost,
    Brand,
    Description,
    Image,
    review,
    author: req.seller,
  });
  ProductObj.save()
    .then((NewProduct) => {
      res.status(201).json({ Product: NewProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products API
/*
The below  API is designed to handle a GET request to the "/allproduct" route.

It uses the ProductModel schema to find all products in the database,
by calling the find() method on the schema.

*/
router.get("/allproduct", (req, res) => {
  ProductModel.find() //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products Laptop API
/*
The API i designed to handle a GET request to the "/laptop" route.

It first defines a query object, query1, with the value { Category: 
  "Laptop" }. 
  
This query will be used in the ProductModel schema to find all products
 with the "Category" field equal to "Laptop".

*/
var query1 = { Category: "Laptop" };
router.get("/laptop", (req, res) => {
  ProductModel.find(query1) //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products watches API

/*
The API i designed to handle a GET request to the "/watch" route.

It first defines a query object, query1, with the value { Category: 
  "watch" }. 
  
This query will be used in the ProductModel schema to find all products
 with the "Category" field equal to "Watch".

*/
var query2 = { Category: "Watch" };
router.get("/watch", (req, res) => {
  ProductModel.find(query2) //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products Tablet API
/*
The API i designed to handle a GET request to the "/tablet" route.

It first defines a query object, query1, with the value { Category: 
  "Tablet" }. 
  
This query will be used in the ProductModel schema to find all products
 with the "Category" field equal to "Tablet".

*/
var query3 = { Category: "Tablet" };
router.get("/tablet", (req, res) => {
  ProductModel.find(query3) //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products SmartPhone API
/*
The API i designed to handle a GET request to the "/smartphone" route.

It first defines a query object, query1, with the value { Category: 
  "SmartPhone" }. 
  
This query will be used in the ProductModel schema to find all products
 with the "Category" field equal to "SmartPhone ".

*/
var query4 = { Category: "SmartPhone" };
router.get("/smartphone", (req, res) => {
  ProductModel.find(query4) //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products Ear Phone API
/*
The API i designed to handle a GET request to the "/Earphone" route.

It first defines a query object, query1, with the value { Category: 
  "Earphone" }. 
  
This query will be used in the ProductModel schema to find all products
 with the "Category" field equal to "Earphone".

*/
var query5 = { Category: "EarPhone" };
router.get("/earphone", (req, res) => {
  ProductModel.find(query5) //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All Products Electronics API
/*
The API i designed to handle a GET request to the "/electronics" route.

It first defines a query object, query1, with the value { Category: 
  "Electronic" }. 
  
This query will be used in the ProductModel schema to find all products
 with the "Category" field equal to "Electronic".

*/
var query6 = { Category: "Electronic" };
router.get("/electronics", (req, res) => {
  ProductModel.find(query6) //it will find all products
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ posts: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//All posts from Logged in seller API
/*
The API i designed to handle a GET request to the "/myallproduct" route.

The seller's ID is obtained from the protected request object, req.seller._id.

The API then defines a request object with the value { author: req.seller._id }, 
which will be used in the ProductModel schema to find all products with the "author"
 field equal to the seller's ID.

The API then uses the ProductModel schema to find all products in the database 
created by the seller, by calling the find() method on the schema and passing 
the request object as an argument.

*/
router.get("/myallproduct", ProtectedRoute, (req, res) => {
  const request = { author: req.seller._id };
  ProductModel.find(request)
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((dbProduct) => {
      res.status(200).json({ products: dbProduct });
    })
    .catch((error) => {
      console.log(error);
    });
});
//Delete Product API (by Owner of the Post)
/*
The endpoint is defined as a DELETE request with a URL parameter for the product ID (/:_id).

The route is protected, which means that the user must be authenticated to access it. 

This is done using the ProtectedRoute middleware.

Inside the endpoint function, the ProductModel.deleteOne() method is called with the 
_id parameter from the URL. This deletes the product from the database.

The result of the deleteOne() method is sent back as the response.
*/
router.delete("/deleteproduct/:_id", ProtectedRoute, async (req, res) => {
  const result = await ProductModel.deleteOne({ _id: req.params._id });
  res.send(result);
});

// Below .exec method is continued in node.js

/*.exec((error, productFound) => {
      if (error || !productFound) {
        return res.status(400).json({ error: "Product do not exist " });
      }
      //check if the product author is same as logged in user only than allow deletion
      if (productFound.author._id.toString() === req.user._id.toString()) {
        productFound
          .remove()
          .then((data) => {
            res.status(200).json({ result: data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });*/

//rest API for like the post
/**
 
Here I created  endpoint for liking a product. 

This endpoint updates the likes array of a specific product with the user's ID.


The endpoints utilize middleware to protect them with authentication, ensuring that 
only authorized users can access them.

 */
router.put("/like", ProtectedRoute, (req, res) => {
  ProductModel.findByIdAndUpdate(
    req.body.productId,
    { $push: { likes: req.user } }, //user._id
    { new: true }
  ) //return updated record
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    //instead of .exec ,use .them method
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
  /* .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });*/
});
//Rest API to Unlike the post

/**
 
Here I created  endpoint for unliking a product. 

This endpoint updates the likes array of a specific product with the user's ID.


The endpoints utilize middleware to protect them with authentication, ensuring that 
only authorized users can access them.

 */
router.put("/unlike", ProtectedRoute, (req, res) => {
  ProductModel.findByIdAndUpdate(
    req.body.productId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ) //return updated record
    .populate("review", "_id reviewText reviewBy")
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    //instead of .exec ,use .them method
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      return res.status(400).json({ error: error });
    });
});
//To add Reviews Rest API

// Reviews Rest API
/*
 This  code i created to provides a simple and efficient way to manage product 
 reviews in an e-commerce application.

 This code implements a REST API for creating and updating reviews for products. 
 
 The API expects the review text and product ID in the request body. 
 
 It also checks if the request is made by a user or a seller and populates the reviewBy 
 field accordingly. 
 
 
 The code then updates the product with the new review by pushing it into the review array.
*/
router.put("/review", ProtectedRoute, async (req, res) => {
  try {
    const { reviewText, productId } = req.body;
    if (!reviewText || !productId) {
      return res
        .status(400)
        .json({ error: "Review text or product ID missing" });
    }

    let reviewBy, userType;

    if (req.user && req.user._id && req.user !== undefined) {
      userType = "UserModel";
      reviewBy = req.user._id;
    } else if (req.seller && req.seller._id && req.seller !== undefined) {
      userType = "SellerModel";
      reviewBy = req.seller._id;
    } else {
      reviewBy = null;
    }

    const reviews = {
      reviewText,
      reviewBy,
      userType,
    };

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { $push: { review: reviews } },
      { new: true }
    )
      .populate({
        path: "review.reviewBy",
        select: "_id FullName ProfileImg",
        model: reviews.userType === "UserModel" ? UserModel : SellerModel,
      })
      .populate("author", "_id fullName ProfileImg");

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//REST API for deleting the review
// Delete Review Rest API
/*
 This  code i created to provides a simple and efficient way to Delete product 
 reviews in an e-commerce application.

 This code implements a REST API for creating and updating reviews for products. 

 
 It also checks if the request is made by a user or a seller and populates the reviewBy 
 field accordingly. 
 
 
 The code then updates the product review by pulling out  the review .
*/
router.delete("/review/:productId/:reviewId", ProtectedRoute, (req, res) => {
  const { productId, reviewId } = req.params;
  ProductModel.findByIdAndUpdate(
    productId,
    { $pull: { review: { _id: reviewId } } },
    { new: true }
  )
    .populate({
      path: "review.reviewBy",
      select: "_id FullName ProfileImg",
    })
    .populate("author", "_id FullName ProfileImg")
    .then((result) => {
      res.json(result.toJSON());
    })
    .catch((error) => {
      res.status(400).json({ error: error.message });
    });
});
//Search rest API To search the Product from the search bars
/*
This API is a search API that takes a search keyword as a parameter 
and searches for products in the database based on that keyword. 

It uses the $or operator to search for the keyword in different fields
 of the ProductModel schema, such as ProductName, Category, Cost, Brand,
  and Description, using regular expressions.
*/
router.get("/search/:key", async (req, res) => {
  let result = await ProductModel.find({
    $or: [
      { ProductName: { $regex: req.params.key } },
      { Category: { $regex: req.params.key } },
      { Cost: { $regex: req.params.key } },
      { Brand: { $regex: req.params.key } },
      { Description: { $regex: req.params.key } },
    ],
  }); //$or is used when ever we are searching in more than one field
  //$regex: req.params.key are all standard way to search the data in particular fields
  res.send(result);
});
//getting data of Product for the product page REST API
router.get("/products/:_id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params._id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
