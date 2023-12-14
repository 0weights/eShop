// search node.js vs express //
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./config/dp.js";
import productrRoute from "./routes/productRoutes.js";
import errorHanddler from "./middleware/errorHandler.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

connectToDb();

app.use(cors());

app.use("/api/product", productrRoute);

app.use(errorHanddler);
// search product/:id vs /product/:id
// app.get("/api/product/:id", (req, res) => {
//   //search would it faster to declare these variables at the top to save res cause when
//   // hitting the api it will declare the variable over and over or is it bad idea
//   // cause the variable will be there and will not be deleted
//   // by garbage collector

//   let id = req.params.id;
//   // search why not products.map((product)=>{product._id == id);
//   // search understad the flow of map like and return
//   // let productData = products.map((product)=>{if(product._id == id)  return product});
//   // let productData = products.find((product)=>{if(product._id == id)  return product});
//   let productData = products.find((product) => product._id == id);
//   if (productData !== null) res.json(productData);
//   else res.redirect("/");
// });


app.listen(port);
