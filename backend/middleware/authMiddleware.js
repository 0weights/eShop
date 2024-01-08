// what is the difference when importing with {} and without {} and if you search for jwt in 
// the jsonwebtoken you will not find it how so 
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";

const protect = asyncHandler(async(req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  if(token){
    try{
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      // why req.user what is the reason i say to pass it to the admin middleware and to use 
      // the user data in any further requests  
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    }
    catch(error){
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  else{
    res.status(401)
    throw new Error("no token");
  }
})

const admin = (req, res, next) => {
  if(req.user.isAdmin){
    next();
  }
  else{
    res.status(401);
    throw new Error('Not authorized');
  }
}

export {protect, admin};