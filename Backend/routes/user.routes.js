const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const userController = require('../controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware')

// we validate the data here before it reaches the controller and if any one of three below is not valid then we send it to the controller and controller will send it to the frontend 
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be atleast 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
],
    userController.registerUser

) 

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be atleast 6 characters long')
],
    userController.loginUser //it refers to the controller function which has to used for this particular route
)

router.get('/profile', authMiddleware.authUser,userController.getUserProfile)

router.get('/logout', authMiddleware.authUser, userController.logoutUser)



module.exports = router; 