const express = require('express'); 
const router = express.Router();
 const { body } = require('express-validator')
 const captainController = require('../controller/captain.controller.js');
 

 const authMiddleware = require('../middleware/auth.middleware')

 router.post('/register', [
    body('fullname').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')  ,
    body('vehicle.color').notEmpty().withMessage('Color is required'),
    body('vehicle.plate').notEmpty().withMessage('Plate is required'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorbike', 'auto']).withMessage('Invalid vehicle type')
 ],
 captainController.registerCaptain);

 router.post('/login',[
      body('email').isEmail().withMessage('Invalid email'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
   ],captainController.loginCaptain
 )
router.get('/profile', authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)
module.exports = router;