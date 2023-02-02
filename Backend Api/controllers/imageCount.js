const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key YOUR-CLARIFAI-KEY");



const handleApiCall = (req, res) => {
	stub.PostModelOutputs(
	    {
	        model_id: "face-detection",
	        inputs: [{data: {image: {url: req.body.input}}}]
	    },
	    metadata,
	    (err, response) => {
	        if (err) {
	            console.log("Error: " + err);
	            return;
	        }

	        if (response.status.code !== 10000) {
	            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
	            return;
	        }
	        
	        // console.log("Predicted concepts, with confidence values:")
	        for (const c of response.outputs[0].data.concepts) {
	            console.log(c.name + ": " + c.value);
	        }
	        res.json(response)
	    }
	);
}

// const handleApiCall = (req, res) => {
// app.models
//     .predict(
//     { 
//           id: 'face-detection',
//           name: 'face-detection',
//           version: '6dc7e46bc9124c5c8824be4822abe105',
//           type: 'visual-detector',
//           }, req.body.input)
//     .then(data => {
//     	res.json(data);
//     })
//     .catch(err => res.status(400).json('unable to work with API'))
// }

const imageCount = (req, res, db) => {
const { id } = req.body;
db('users').where('id', '=',id)
.increment('entries',1)
.returning('entries')
.then(entries => {
	res.json(entries[0].entries);
})
.catch( err => res.status(400).json('unable to get entries'))
}

module.exports = { 
imageCount,
handleApiCall
}