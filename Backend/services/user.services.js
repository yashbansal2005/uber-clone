// this service creates a user and returns the user object after all checks are passed
const userModel = require('../models/user.model.js')
// here it checks if the fields are empty or not
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required')
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}