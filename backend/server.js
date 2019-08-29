const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true}).catch(error => {console.log("Connection Failed")});
const connection = mongoose.connection;
connection.once('open', () => {console.log("Mongo database connect established successfully.");});

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users')

const exerciseRouter = app.use('/exercises', exerciseRouter);
const userRouter = app.use('/users', userRouter);

app.listen(port, () => {console.log(`Server is running on port: ${port}`);});