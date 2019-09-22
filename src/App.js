import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
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
            imgUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input, {language: 'zh'}).then(
            function(response) {
                // do something with response
            },
            function(err) {
                // there was an error
            }
        );
    }

    render() {
        return (
            <div className="App">
                <Particles className='particles'
                    params={particlesOptions}
                />
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition imgUrl={this.state.imgUrl}/>
            </div>
        );
    }
}

export default App;
