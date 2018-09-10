import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Channel from './components/Channel.js'
import PadGrid from './components/PadGrid.js'
import socketIoClient from 'socket.io-client';

var cnt = 0;

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            config:{},
            endpoint:'localhost:4001',
            value:50
        };
    }

    componentWillMount(){
        console.log('App will mount');
        const {endpoint} = this.state;
        this.socket = socketIoClient(endpoint);
    }

    componentDidMount(){
        console.log('App did mount');
        try {
            this.socket.on('config',(data) => {
				this.setState({config:data});
				console.log('config received'+data);});
        } catch (e) {
            console.log(e);
        }
        
    
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
        
        for (var i = 0, len = 2; i < len; i++) {
            this.gridelements.push(<Channel socket={this.socket}/>);
        }
        
        this.gridelements.push(<PadGrid pad_num='12'/>);

        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">KonTroller</h1>
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

function poke_server(period_ms) {
        var poke = setInterval(()=>{
            console.log('poking server');
            this.socket.emit('service','test_msg'+cnt++);   
        },period_ms)
}


export default App;
