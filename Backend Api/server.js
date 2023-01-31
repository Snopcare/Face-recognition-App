const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/imageCount');

const db = knex({
  client: 'pg',
  connection: {
  	host : '127.0.0.1',
    port : 5432,
    user : 'bsnop',
    password : 'Master87',
    database : 'Home'
  }
});

db.select('*').from('users');

const app = express();

app.use(cors())
app.use(express.json());

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfile(req, res, db)})
app.put('/image',(req, res) => {image.imageCount(req, res, db)})
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)})

app.listen(3003, () => {
	console.log('app is running on port 3003');
})







// /* We want several thinks to happen when using the Api
// res = this is working (response that everything is fine)
// signin --> POST (posting of sign in) => success/fail
// register --> POST => user 
// Profile --> userID  --> GET = user
// score/ranking when posting images 
// Image --> PUT --> user
// *\