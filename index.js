const express = require('express')
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const router = require('./Routes/auth.route')
const adminRouter = require('./Routes/adminOperations.route')
var app = express()
var cors = require('cors');
var cookieParser = require('cookie-parser')
app.use(cookieParser('token'));
app.use(cors({ origin:true, credentials:true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Set-Cookie,Origin, Accept, Accept-Version, Content-Length,Content-Type, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
})
app.use(bodyparser.json())
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.send('Hello world')
})


const routes = []
routes.push(router)
routes.push(adminRouter)

app.use('/account/api', routes)



mongoose.connect('mongodb+srv://asma-22:5DpGiPBX91h3acsM@cluster0.kjtud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
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