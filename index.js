const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const router = require('./Routes/auth.route')
var app = express()
var cors = require('cors');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(cors());
//Routes
app.use(bodyparser.json())
app.get('/', function (req, res) {
  res.send('Hello world')
})
app.use('/account/api', router)
//5DpGiPBX91h3acsM
//MongoDb connection
// ASMA mongoose.connect('mongodb+srv://asma-asma123:7St4JjVMTDNyNhV@cluster0.wkzsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true });
//Nizar

mongoose.connect('mongodb+srv://asma-22:5DpGiPBX91h3acsM@cluster0.kjtud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', function () {
  console.log('Database connected Successfully');
}).on('error', function (err) {
  console.log('Error', err);
})

//Server 
app.listen('8000', function (req, res) {
  console.log('Serve is up and running at the port 8000')
})