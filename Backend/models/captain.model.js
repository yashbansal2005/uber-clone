const mongoose = require('mongoose');  
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken')


const captainSchema= new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            min: [3, 'First name must be atleast 3 characters long']
        },
        lastname: {
            type: String,
            min: [3, 'Last name must be atleast 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
match : [/\S+@\S+\.\S+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    vehicle:{
        color:{
            type: String,
            required: true
        },
        plate:{
            type: String,
            required: true
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1']
        }   ,
        vehicleType : {
            type: String,
            enum: ['car', 'motorbike', 'auto'],
            required :true,
            
            
        }},
        location:{
            lat:{
                type: Number

            },  
            lng:{
                type: Number
            }
        }
    }
)

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id }, process.env.JWT_SECRET,{ expiresIn: '24h'});   
    return token;   
}
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}   
captainSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}   
const captainModel = mongoose.model('captain', captainSchema)
module.exports = captainModel;