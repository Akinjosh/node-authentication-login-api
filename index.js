const express = require ('express');
const router = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const mongo = require("mongodb");
require('dotenv').config();
const bodyParser = require('body-parser');
const Joi = require('joi');


//import routes

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
// connect to database
const mySecret = process.env['DB_URI']

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true },
)
.then(()=>console.log('connected'))
.catch(e=>console.log(e));

// middleware
app.use(express.json());

//route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts',postRoute)

process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);


// router.post('/login') 


app.listen(3000, () => console.log('server up and running'))