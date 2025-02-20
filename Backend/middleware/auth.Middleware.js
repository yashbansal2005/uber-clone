const userModel = require('../models/user.model.js');
const captainModel = require('../models/captain.model.js'); // Ensure captainModel is imported
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model.js');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'No token found, authorization denied' });
    }
    
    try {
        // Check if the token is blacklisted
        const isBlackListed = await blackListTokenModel.findOne({ token: token });
        if (isBlackListed) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await userModel.findById(decoded._id);
        
        req.user = user; // Store user data in the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token found, authorization denied' });
        }
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach captain to request
        const captain = await captainModel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Captain not found' });
        }
        req.captain = captain; 
        next(); // Proceed to the controller
        
    } catch (err) {
        console.log('Error:', err);
        return res.status(401).json({ message: 'Captain not authenticated' });
    }
};
