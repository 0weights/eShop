import  express  from "express";
import {getProduct, getProducts} from "../controllers/productController.js";

const productrRoute = express.Router();
productrRoute.get('/', getProducts);
productrRoute.get('/:id', getProduct);

export default productrRoute;