import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
// Functions Order : bussness logic
// why all of them private and what is the difference between private and public

//@Desc   : Logical
//@URI    : POST /api/users/register
//@Access : Private
const registerUser = asyncHandler(async(req, res) => {
  res.send('user registered');
})

//@Desc   : Logical
//@URI    : POST /api/users/auth
//@Access : Private
// in post x-wwww-from-rulcode what is that 
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  // what is this syntax after &&
  // try to remove await and test the endpoint with wrong password it will pass why
  if(user && (await user.matchPassword(password))){
    const token = jwt.sign({userId : user._id }, process.env.JWT_SECRET, {
      expiresIn : '30d'
    })

    // what is an http cookie is it stored in the browser or not
    res.cookie('jwt', token, {
      httpOnly : true,
      secure   : process.env.NODE_ENV !== 'development',
      sameSite : 'strict',
      maxAge : 30 * 24 * 60 * 60 * 1000 // 30 days
    })

    res.json({
      id : user._id,
      name : user.name,
      email : user.email,
      isAdmin : user.isAdmin
    })
  }
  else{
    res.status(401);
    throw Error("email or password is incorrect");
  }
})

//@Desc   : Logical
//@URI    : GET /api/users/profile
//@Access : Private
const getUserProfile = asyncHandler(async(req, res) => {
  res.send('user profile');
})

//@Desc   : Logical
//@URI    : PUT /api/users/profile
//@Access : Private
const updateUserProfile = asyncHandler(async(req, res) => {
  res.send('user profile updated');
})

//@Desc   : Logical
//@URI    : POST /api/users/logout
//@Access : Private
const logOutUser = asyncHandler(async(req, res) => {
  res.send('logging out...');
})

//@Desc   : Logical
//@URI    : GET /api/users/:id
//@Access : Private/Admin
const getUserById = asyncHandler(async(req, res) => {
  res.send('admin get user by Id');
})

//@Desc   : Logical
//@URI    : GET /api/users/
//@Access : Private/Admin
const getUsers = asyncHandler(async(req, res) => {
  res.send('all users');
})

//@Desc   : Logical
//@URI    : PUT /api/users/:ID
//@Access : Private/Admin
const updateUser = asyncHandler(async(req, res) => {
  res.send('user updated');
})

//@Desc   : Logical
//@URI    : DELETE /api/users/:ID
//@Access : Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
  res.send('user deleted');
})

export {
  registerUser, 
  authUser, 
  getUserProfile,
  updateUserProfile,
  logOutUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
}