import  express  from "express";
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
} from '../controllers/usersController.js';
import {protect, admin} from "../middleware/authMiddleware.js";

const userRoute = express.Router();

// in postman when hitting /register with get method it triggers getuserByid
// // user
userRoute.post('/register', registerUser);
userRoute.post('/auth', authUser);
userRoute.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
userRoute.post('/logout', logOutUser);
// Admin
userRoute.route('/:id').get(protect, admin, getUserById);
userRoute.route('/')
         .get(protect, admin, getUsers)
         .put(protect, admin, updateUser)
         .delete(protect, admin, deleteUser);

export default userRoute;