import Product from '../models/ProductModel.js'
import asyncHandler from '../middleware/asyncHandler.js';

//@desc : geting all product 
//@URI  : get /product/
const getProducts = asyncHandler(async (req, res) =>{
  console.log(localStorage)
  let product = await Product.find().limit(10);
  res.status(200).json(product);
});


//@desc : geting single product based on Id 
//@URI  : get /product/
const getProduct = asyncHandler(async (req, res) =>{
  let productId = req.params.id;
  let product = await Product.findById(productId);
  res.status(200).json(product);
});

export {getProduct, getProducts};