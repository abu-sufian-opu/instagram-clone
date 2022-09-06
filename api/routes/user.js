import express from 'express';
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser, userLogin, userRegister, getLoggedInUser, verifyUserAccount, recoverPassword, resetPassword } from '../controllers/userController.js';
import { adminMiddleware } from '../middlewares/adminMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { userMiddleware } from '../middlewares/userMiddleware.js';



//init router
const router = express.Router();

//User Auth routes
router.post('/login', userLogin);
router.post('/register', userRegister);
router.get('/me', getLoggedInUser);
router.post('/verify', verifyUserAccount);
router.post('/recover-password', recoverPassword);
router.post('/reset-password', resetPassword);

//routes Rest API
router.route('/').get(adminMiddleware, getAllUsers).post(adminMiddleware, createUser);
router.route('/:id').get(userMiddleware, getSingleUser).put(userMiddleware, updateUser).patch(userMiddleware, updateUser).delete(userMiddleware, deleteUser);



//export default router
export default router;