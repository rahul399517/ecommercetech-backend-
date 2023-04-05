//                       Thought Note

/*

This is the user route , which handle the REST API's of the user model 

This Route allow the user to sign up as seller and logon as seller 


*/
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bodyParser = require("body-parser");

//signup API
/*
This is a REST API route for signing up a user.

The route listens for POST requests on the '/signup' endpoint.


It  checks if a user with the provided email already exists in the
database using the findOne() method on the SellerModel.

If the email exists, it returns a 500 error response with a message
stating that a user with the provided email already exists.
 
If the email does not exist, it generates a hashed password using the bcryptjs 
 library's hash() method with a salt factor of 16.

*/
router.post("/signup", (req, res) => {
  const {
    FullName,
    Email,
    Password,
    ProfileImg,
    City,
    HomeAddress,
    State,
    Country,
    Pin,
  } = req.body;
  UserModel.findOne({ Email: Email })
    .then((UserInDb) => {
      if (UserInDb) {
        return res.status(500).json({ error: "User with email alredy exist " });
      }
      bcryptjs
        .hash(Password, 16)
        .then((hashedPassword) => {
          const user = new UserModel({
            FullName,
            Email,
            Password: hashedPassword,
            ProfileImg,
            City,
            HomeAddress,
            State,
            Country,
            Pin,
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
//Login
/*
This is a login API i created  for a buyer, implemented using Express and Mongoose. 

It takes in the buyer's email and password in the request body, and first
checks if the email exists in the SellerModel collection in the MongoDB database. 

If the email exists, it uses bcryptjs to compare the given password with the hashed
password stored in the database for the user. 

If the passwords match, it generates aJSON Web Token (JWT) using the user's MongoDB 
ID and a secret key, and sends the token along with some of the user's information
 in a response object.
*/
router.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return res.status(400).json({ error: "Please enter mandatory fields" });
  }
  UserModel.findOne({ Email: Email })
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
              City: UserInDb.City,
              HomeAddress: UserInDb.HomeAddress,
              State: UserInDb.State,
              Country: UserInDb.Country,
              Pin: UserInDb.Pin,
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
//getting data of user for the update REST API
router.get("/updatedata/:_id", async (req, res) => {
  let request = { _id: req.params._id };
  let result = await UserModel.findOne(request);

  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No user found " });
  }
});
//Update Rest APT
/*we can use same address for two diferent api workings , but their method must be different  
for example for : router.get and router.put,we  can use same address becouse they both have two different get and put method*/
router.put("/updatedata/:_id", async (req, res) => {
  let result = await UserModel.updateOne(
    { _id: req.params._id },
    { $set: req.body }
  ); //here 1st {} object is what is need to be updated , and second {}object is new data that is to be updated
  res.send(result);
});

module.exports = router;
