//           Thought Note
/*
This is a  code that sets up the server and connects to the database.

It imports required modules such as express, cors, mongoose, body-parser, etc.

It imports the routes defined in separate files for users, sellers, products, 
files, and product details.

It establishes a connection with the MongoDB database based on the connection details 
present in the configuration file.

It sets up a middleware to allow cross-origin resource sharing using cors.

It sets up another middleware to parse incoming requests with JSON payloads using express.json().

It maps the imported routes to their  paths using app.use().

It starts the server and listens for incoming requests on port 5000.



*/
const express = require("express");
const app = express();
const cors = require("cors"); //it is a middleware ,act as a string berween frontend and backend
const mongoose = require("mongoose");
const UserRoute = require("./routes/user_route");
const SellerRoute = require("./routes/seller_route");
const ProductRoute = require("./routes/product_route");
const bodyParser = require("body-parser");
const FileRoute = require("./routes/file_route");
const ProductDetail = require("./routes/productdetail_route");
const { MONGODB_URL } = require("./config");

const port = process.env.PORT || 5000;
const baseUrl = process.env.BASE_URL;

global.__basedir = __dirname;
mongoose.set("strictQuery", true);
//setting up the connection with the database
mongoose.connect(MONGODB_URL);
mongoose.connection.on("connected", () => {
  console.log("Database is connected ");
});
mongoose.connection.on("error", (error) => {
  console.log("DataBase connection failed");
});
app.use(cors());
app.use(express.json()); //it will get the data in json format
app.use("/", UserRoute); //for buyer login and signup
app.use("/", SellerRoute); //for seller login and signup
app.use("/", ProductRoute); //for product upload
app.use("/", FileRoute); //for uploading the file and download the file
app.use("/", ProductDetail); //to show product detail

app.listen(port, () => {
  console.log(`Server started at ${baseUrl}:${port}`);
});
