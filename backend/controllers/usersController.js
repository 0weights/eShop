import { json } from "express";
import asyncHandler from "../middleware/asyncHandler.js"
import User from '../models/UserModel.js'
import bcrypt from 'bcrypt';
import generateTokens from "../utils/generateTokens.js";
import { hashPassword } from "../utils/functions.js";
// Functions Order : bussness logic

//@Desc   : Logical
//@URI    : POST /api/users/register
//@Access : Private
const registerUser = asyncHandler(async(req, res) => {
  // there is a difference between req.params & req.body
  const {name, email, password, isAdmin}= req.body;
  const existingUser = await User.findOne({email})
  if(existingUser){
    res.json({"message" : "email already exist"});
  }
  
  let hashedPassword = await hashPassword(password);
  let user = await User.create({
    name,
    email,
    "password" : hashedPassword,
    isAdmin
  })
  generateTokens(res, user._id);
  res.send('user registered');
})

//@Desc   : Logical
//@URI    : POST /api/users/auth
//@Access : Private
const authUser = asyncHandler(async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  // what is this syntax after &&
  if(user && (await user.matchPassword(password))){
    generateTokens(res, user._id);
    res.json({
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
  const {name, email, isAdmin} = req.body;
  res.status(200).json({name, email, isAdmin});
})

//@Desc   : Logical
//@URI    : PUT /api/users/profile
//@Access : Private
const updateUserProfile = asyncHandler(async(req, res) => {
  const {name, email, password, isAdmin} = req.body;
  console.log(req.body.password);
  let user = await User.findById(req.user._id);
  let anotherUserEmail = await User.findOne({"email" : email});
  if(user._id == anotherUserEmail._id){
    throw new Error("email already exist");
  }
  user.name = name || user.name;
  user.email = email || user.email;
  user.isAdmin = isAdmin || user.isAdmin;
  if(password != undefined)
    user.password = await hashPassword(password);

  await user.save();
  res.send('user profile updated');
})

//@Desc   : Logical
//@URI    : POST /api/users/logout
//@Access : Private
const logOutUser = asyncHandler(async(req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({"message" : "logged out successfully"});
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