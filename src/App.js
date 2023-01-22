import React, {Component} from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false
      }
  }

  componnentDidMount() {
    fetch('localhost:3003')
    .then(response => response.json())
    .then(console.log)
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rigthCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }



  onInputChange = (event) => { 
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
          Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
          .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err));
          }

  onRouteChange = (route) => {
    if ( route === 'signout') {
      this.setState({isSignedIn: false})
    } else if ( route === 'home') {
      this.setState({isSignedIn: true})
    }      
      this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
        return(
    <div className="App">
        <ParticlesBg className="particles" type="cobweb" num={80} bg={true}/>}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
        ?   <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
          route === 'signin' 
          ? <Signin onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
          )
        }      
    </div>
  
  );
};
}

export default App;
