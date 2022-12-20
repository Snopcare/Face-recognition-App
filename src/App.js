import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '143b8bd892b84302a4a0c9471ad60b62'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imageUrl:''
      }
  }
  onInputChange = (event) => { 
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
          .then(
            function(response) {
              console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
            function(err) {

            }
          );
  }

  render() {
        return(
    <div className="App">
      {/*<ParticlesBg className="particles" color="#ff0000" num={200} type="lines" bg={true} />*/}
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
};
}

export default App;
