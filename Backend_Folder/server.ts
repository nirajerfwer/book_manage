import mongoose from "mongoose";
import ARouter from "./router/auth";
import Brouter from "./router/book";
import { authmiddleware } from "./middleware/auth_middlerware";
import Rrouter from "./router/review";
import Srouter from "./router/search";

const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use("/auth", ARouter);
app.use("/books", authmiddleware, Brouter);
app.use("/reviews", authmiddleware, Rrouter);
app.use("", Srouter);
async function dbconnection() {
  await mongoose.connect(process.env.mongoDBURL || 'mongodb://localhost:27017', {
    dbName: process.env.DatabaseName,
  });
}

dbconnection()
  .then((data) => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("erro while connecting db");
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});
