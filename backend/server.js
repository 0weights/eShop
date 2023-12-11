// search node.js vs express //
import express from "express";
import products from "../backend/products.js";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./config/dp.js";
import Product from "./models/productModel.js";

dotenv.config();

const port = process.env.PORT;

connectToDb().then(()=>{
  const newProduct = new Product({
    name: "iPhone 20000 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  })

  newProduct.save();
});
const app = express();

app.use(cors());

app.get("/api/product", (req, res) => {
  res.json(products);
});

// search product/:id vs /product/:id
app.get("/api/product/:id", (req, res) => {
  //search would it faster to declare these variables at the top to save res cause when
  // hitting the api it will declare the variable over and over or is it bad idea
  // cause the variable will be there and will not be deleted
  // by garbage collector

  let id = req.params.id;
  // search why not products.map((product)=>{product._id == id);
  // search understad the flow of map like and return
  // let productData = products.map((product)=>{if(product._id == id)  return product});
  // let productData = products.find((product)=>{if(product._id == id)  return product});
  let productData = products.find((product) => product._id == id);
  if (productData !== null) res.json(productData);
  else res.redirect("/");
});

app.listen(port);
