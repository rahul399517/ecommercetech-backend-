//                       Thought Note

/*

This is the Seller route , which handle the REST API's of the Seller model 

This Route allow the seller to sign up as seller and logon as seller 


*/
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const SellerModel = require("../models/seller_model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
//signup seller API
/*
This is a REST API route for signing up a seller.

The route listens for POST requests on the '/signupseller' endpoint.


It  checks if a user with the provided email already exists in the
database using the findOne() method on the SellerModel.

If the email exists, it returns a 500 error response with a message
 stating that a user with the provided email already exists.
 
 If the email does not exist, it generates a hashed password using the bcryptjs 
 library's hash() method with a salt factor of 16.

*/
router.post("/signupseller", (req, res) => {
  const {
    FullName,
    Email,
    Password,
    ProfileImg,
    Category,
    Desigination,
    City,
    OfficeAddress,
    State,
    Country,
    Pin,
    PanCard,
  } = req.body;
  SellerModel.findOne({ Email: Email })
    .then((UserInDb) => {
      if (UserInDb) {
        return res
          .status(500)
          .json({ error: "User with email already exist " });
      }
      bcryptjs
        .hash(Password, 16)
        .then((hashedPassword) => {
          const user = new SellerModel({
            FullName,
            Email,
            Password: hashedPassword,
            ProfileImg,
            Category,
            Desigination,
            City,
            OfficeAddress,
            State,
            Country,
            Pin,
            PanCard,
          });
          user
            .save()
            .then((NewUser) => {
              res.status(201).json({ result: "User signedup seccessfully" });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
//Login API for seller

/*
This is a login API i created  for a seller, implemented using Express and Mongoose. 

It takes in the seller's email and password in the request body, and first
checks if the email exists in the SellerModel collection in the MongoDB database. 

If the email exists, it uses bcryptjs to compare the given password with the hashed
password stored in the database for the user. 

If the passwords match, it generates aJSON Web Token (JWT) using the user's MongoDB 
ID and a secret key, and sends the token along with some of the user's information
 in a response object.
*/
router.post("/loginseller", (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ error: "Please enter mandatory fields" });
  }
  SellerModel.findOne({ Email: Email })
    .then((UserInDb) => {
      if (!UserInDb) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
      bcryptjs
        .compare(Password, UserInDb.Password)
        .then((DidMatch) => {
          if (DidMatch) {
            const JwtToken = jwt.sign({ _id: UserInDb._id }, JWT_SECRET);
            const UserInfo = {
              _id: UserInDb._id,
              Email: UserInDb.Email,
              FullName: UserInDb.FullName,
              ProfileImg: UserInDb.ProfileImg,
              Category: UserInDb.Category,
              Desigination: UserInDb.Desigination,
              City: UserInDb.City,
              OfficeAddress: UserInDb.OfficeAddress,
              state: UserInDb.State,
              Country: UserInDb.Country,
              Pin: UserInDb.Pin,
              PanCard: UserInDb.PanCard,
            };

            // res.status(200).json({ result: "User LOggedIn successfully" });
            res
              .status(200)
              .json({ result: { token: JwtToken, user: UserInfo } });
          } else {
            return res.status(401).json({ error: "Invalid Credentials" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
