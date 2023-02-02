# AI powered Face Recognition App

Full Stack Web app which uses the <a href="https://www.clarifai.com/products/armada-ml-prediction">Clarifai API</a> to identify a face in a picture based on it's Face Detection model.

<img src="https://github.com/Snopcare/Face-recognition-App/blob/master/src/Face%20detection.JPG" style="max-width: 100%;" alt="FaceRecognition" />

## Overview
Front-End uses JS with React library. 
Node.js keeps all connected and provides with npm useful dynamic visuals.

In the Back-End Express and the Database handled using PostgreSQL. 



## Tech stack

<table>
<thead>
<tr>
<th>Area</th>
<th>Technology</th>


</tr>
</thead>
<tbody>
	<tr>
		<td>Front-End</td>
		<td>Javascript, HTML5, CSS3, npm packages (create-react-app, tachyons, react-parallax-tilt, particle-bg) </td>
	</tr>
	<tr>
		<td>Runtime environment</td>
		<td>Node.js, npm package nodemon</td>
  </tr>
  <tr>
		<td>Back-End</td>
		<td>npm packages (express, , body-parser, <a href="https://github.com/Clarifai/clarifai-nodejs-grpc/blob/master/README.md">clarifai-nodejs-grpc</a>, cors) </td>
	</tr>
	<tr>
		<td>API Testing</td>
		<td>Postman</td>
	</tr>
	<tr>
		<td>Database</td>
		<td>PostgreSQL, pgAdmin 4, npm packages (bcrypt-nodejs,knex, pg)</td>
	</tr>
    <tr>
		<td>Deployment</td>
		<td>Netlify</td>
	</tr>
</tbody>
</table>




## Screenshots

### Register 
Registered users name and Email is stored in a database using PostgreSQL and password hashed using Bcrypt.
<img src="https://github.com/Snopcare/Face-recognition-App/blob/master/src/Register.JPG" style="max-width: 100%;" alt="FaceRecognition" />

### Sign in
<img src="https://github.com/Snopcare/Face-recognition-App/blob/master/src/SignIn.JPG" style="max-width: 100%;" alt="FaceRecognition" />

## Acknowledgements

Big thanks to <a href="https://github.com/aneagoie/face-recognition-brain">Andrei Neagoie</a> for the <a href="https://www.udemy.com/the-complete-web-developer-zero-to-mastery/">complete Web developer course</a>.



