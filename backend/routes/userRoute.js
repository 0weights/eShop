import  express  from "express";
const userRoute = express.Router();

import {
  registerUser, 
  authUser, 
  getUserProfile,
  updateUserProfile,
  logOutUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/usersController.js'

// in postman when hitting /register with get method it triggers getuserByid
// user
userRoute.post('/register', registerUser);
userRoute.post('/auth', authUser);
userRoute.route('/profile').get(getUserProfile).put(updateUserProfile);
userRoute.post('/logout', logOutUser);
// Admin
userRoute.get('/:id', getUserById);
userRoute.route('/').get(getUsers).put(updateUser).delete(deleteUser);

export default userRoute;