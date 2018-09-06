import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Channel from './components/Channel.js'

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            value:50
        };
    }

    componentWillMount(){
        console.log('App will mount');
    }

    componentDidMount(){
        console.log('App did mount');
    }

    componentWillReceiveProps(){
        console.log('App receiving new props');
    }

    componentWillUpdate(){
        console.log('App will update');
    }
    
    componentDidUpdate(){
        console.log('App did update');
    }

    handleChange = (newValue) => {
         this.setState({value: newValue});
       };
    
    render() {
        
        this.gridelements=[]
        
        for (var i = 0, len = 3; i < len; i++) {
            this.gridelements.push(<Channel/>);
        }
        
        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">MusiKontrol</h1>
            </header>
            <p className="App-intro">
            </p>
            <body className="App-body">
                <div className="grid-container">
                    {this.gridelements}
                </div>
            </body>
        </div>
        );
    }
}

export default App;
