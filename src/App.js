import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const app = new Clarifai.App({
    apiKey: 'b0d0c7100b1d4f7ba406d7f83182988c'
});

const particlesOptions = {
    particles: {
        number: {
            value: 120,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false
        }
    }

    onRouteChange = (route) => {
        if (route === 'home') {
            this.setState({isSignedIn: true});
        } else {
            this.setState({isSignedIn: false});
        }
        this.setState({route: route});
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input, {language: 'zh'})
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
            .catch(error => console.log(error));
    }

    render() {
        const { route, isSignedIn, box, imgUrl } = this.state;
        return (
            <div className="App">
                <Particles className='particles'
                    params={particlesOptions}
                />
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
                { route === 'home'
                    ?
                    <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                        />
                        <FaceRecognition box={box} imgUrl={imgUrl}/>
                    </div>
                    : (
                        route === 'signin'
                        ?
                        <Signin onRouteChange= {this.onRouteChange}/>
                        :
                        <Signup onRouteChange= {this.onRouteChange}/>
                    )
                }
            </div>
        );
    }
}

export default App;
