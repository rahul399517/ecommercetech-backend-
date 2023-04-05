/*
                          Thought Note 

Here I created  an authentication middleware function in a Node.js/Express application.

It starts by getting the authorization header from the incoming request. 

If this header is not present, it immediately returns a response with a 401 status code and 
an error message saying that the user is not logged in.

If the authorization header is present, the middleware extracts the JWT token from it 
(assuming that the token is in the format of "Bearer [token]"), and verifies the token 
using the jsonwebtoken library and the JWT_SECRET key.

If the token is not valid, the middleware returns a response with a 401 status code and
 an error message saying that the user is not logged in.

If the token is valid, the middleware extracts the _id property from the token's payload 
(which should contain the user's ID), and looks for a corresponding user in the database
 using two different models: SellerModel and UserModel.
 
 
 If a user is found in either model, the middleware sets a seller or user property on the 
 req object respectively (depending on which model was used), and calls the next function 
 to pass control to the next middleware in the stack.

If no user is found in either model, the middleware returns a response with a 401 status 
code and an error message saying that the user was not found.                        

*/

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const mongoose = require("mongoose");
const SellerModel = mongoose.model("SellerModel");
const UserModel = mongoose.model("UserModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "User is not logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (error, payload) => {
    if (error) {
      return res.status(401).json({ error: "User is not logged in" });
    }
    const { _id } = payload;
    SellerModel.findById(_id).then((dbSeller) => {
      if (dbSeller) {
        req.seller = dbSeller;
        next();
      } else {
        UserModel.findById(_id).then((dbUser) => {
          if (dbUser) {
            req.user = dbUser;
            next();
          } else {
            return res.status(401).json({ error: "User not found" });
          }
        });
      }
    });
  });
};
