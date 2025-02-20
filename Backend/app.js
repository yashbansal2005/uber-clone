const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const app = express();
const connectToDb = require('./db/db')
connectToDb();
const userRoutes = require('./routes/user.routes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const captainRoutes = require('./routes/captain.routes');

const cors = require('cors');
app.use(cors({
  origin: '*', // React App URL
  credentials: true
}));

app.get('/', (req, res) => {
    res.send('hello');
})

app.use('/user', userRoutes); //this applies a header to all the user routes
app.use('/captain', captainRoutes); 

module.exports = app;