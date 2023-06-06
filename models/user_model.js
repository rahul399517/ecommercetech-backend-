/* 
                          Thought Note 
 Here i define  a Mongoose schema for a user  in an e-commerce website.

 It defines the properties that a user  can have, their data types
 and whether they are required or not.         
                
*/
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true,
  },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
  ProfileImg: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  },
  City: { type: String, required: true },
  HomeAddress: { type: String, required: true },
  State: { type: String, rerquired: true },
  Country: { type: String, required: true },
  Pin: { type: String, required: true },
});
const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
