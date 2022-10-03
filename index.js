const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/Auth');
const Usera = require('./routes/user');
const Product = require('./routes/Product');
dotenv.config();

mongoose.connect(
    process.env.Mongo_URl,
).then(() => {
    console.log('Connected to database');
}).catch(() => {
    console.log('Connection failed');
}
);
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRoute);
app.use('/users',Usera);
app.use('/products',Product);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
})