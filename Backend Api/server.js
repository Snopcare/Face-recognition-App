const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
const database = {
	users: [
				{
				id:'123',
				name: 'John',
				email: 'john@gmail.com',
				password: 'cookies',
				entries: 0,
				joined: new Date()
				},
				{
				id:'124',
				name: 'Sally',
				email: 'john@gmail.com',
				password: 'bananas',
				entries: 0,
				joined: new Date()
				}
			]
		}

app.get('/',(req,res) => {
	res.send(database.users);
})

app.post('/signin', (req,res) => {
	if (req.body.email === database.users[0].email &&
	 req.body.password === database.users[0].password) {
	res.json('success');
} else {
	res.status(400).json('error logging in');
}
})


app.post('/register',(req,res) => {
	const {email, name, password} = req.body;
	database.users.push({
		id:'125',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
		 	return	res.json(user);
			} 
		})
		if (!found) {
		res.status(400).json('not found');
	}
})

app.put('/image', (req,res) => {
const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			user.entries++
		 	return	res.json(user.entries);
			} 
		})
		if (!found) {
			res.status(400).json('not found');
	}
})

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