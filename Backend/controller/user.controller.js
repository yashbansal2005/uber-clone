 const userModel = require('../models/user.model.js')
const userServices = require('../services/user.services.js')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const blackListTokenModel = require('../models/blackListToken.model.js')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // console.log(req.body)
    const { fullname, password, email } = req.body;
//if user already exists with the same email then it will return the message
    const isUserAlreadyExist = await userModel.findOne({   
        email: email,
    }); 
    if (isUserAlreadyExist) {  
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userServices.createUser({
        firstname: fullname.firstname
        , lastname: fullname.lastname, email, password: hashedPassword
    });

    const token = user.generateAuthToken();
    return res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
        },
        token, // Include the token in the response body
    }); 
}
module.exports.loginUser = async (req, res, next) => { 
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) 
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    //it finds the user according to the email and returns the user docs with his password also if a user found

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }//if the user is found then we have to match the password 
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }
    const token = user.generateAuthToken();
    res.cookie('token', token ); // we have set the cookie 


    return res.status(200).json({
        message: 'Login successful',
        user: {
            password: user.password,
            email: user.email,
        },
        token, // Include the token in the response body


});
}  

module.exports.getUserProfile = async (req, res, next) => {
    
     res.status(200).json({
        message: 'User Profile fetched successfully',
        user: {
            id: req.user._id,
            fullname: req.user.fullname,
            email: req.user.email,
        }
     })
}

module.exports.logoutUser = async (req, res, next) => {
const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    res.clearCookie('token');
await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logout successful' })
}
