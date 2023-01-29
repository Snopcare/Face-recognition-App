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

const initialState = {
      input:'',
      imageUrl:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // componnentDidMount() {
  //   fetch('localhost:3003')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  loadUser = (data) => {
    this.setState ({user: {
        id:data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
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
    { 
          id: 'face-detection',
          name: 'face-detection',
          version: '45fb9a671625463fa646c3523a3087d5',
          type: 'visual-detector',
          }, 
          this.state.input)
          .then(response => {
            if(response) {
              fetch('http://localhost:3003/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                id: this.state.user.id
              })
             })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          }     
            this.displayFaceBox(this.calculateFaceLocation(response))
          })
          .catch(err => console.log(err));
          }

  onRouteChange = (route) => {
    if ( route === 'signout') {
      this.setState(initialState)
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
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
          route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }      
    </div>
  
  );
};
}

export default App;
