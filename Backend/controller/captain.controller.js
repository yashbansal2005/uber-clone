const captainModel = require('../models/captain.model.js')
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const blackListTokenModel = require('../models/blackListToken.model.js');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { fullname, email, password,vehicle } = req.body;
//if any captain already exists with the same email then it will return the message
    const isCaptinAlreadyExist = await captainModel.findOne({
        email: email,
    });
    if (isCaptinAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const captain = await captainService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
         email,
         password: hashedPassword, 
         color:vehicle.color,
         plate:vehicle.plate, 
         capacity:vehicle.capacity,
         vehicleType:vehicle.vehicleType
    });

    const token = captain.generateAuthToken();
    return res.status(201).json({
        message: 'Captain registered successfully',
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            email: captain.email,
        },
        token, // Include the token in the response body
    });
}
module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    //it finds the captain according to the email and returns the captain docs with his password also if a captain found

    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }//if the captain is found then we have to match the password 
    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = captain.generateAuthToken();
    res.cookie('token', token ); // we have set the cookie 
    return res.status(200).json({
        message: 'Captain logged in successfully',
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            password: captain.password,
            email: captain.email,
        },
        token, // Include the token in the response body
    });
}
module.exports.getCaptainProfile = async (req, res, next) => {
    if (!req.captain) {
        return res.status(401).json({ message: 'Captain not authenticated' });
    }

    res.status(200).json({
        message: 'Captain profile fetched successfully',
        captain: {
            id: req.captain._id,
            fullname: req.captain.fullname,
            email: req.captain.email,
            vehicle: req.captain.vehicle
        }
    });
};


module.exports.logoutCaptain = async (req, res, next) => { 
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token found, authorization denied' })
    }
    res.clearCookie('token');
     await blackListTokenModel.create({ token });
    return res.status(200).json({ message: 'Captain logged out successfully' })
}
 