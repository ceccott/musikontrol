import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Channel from './components/Channel.js'
import PadGrid from './components/PadGrid.js'
import KnobGrid from './components/KnobGrid.js'
import socketIoClient from 'socket.io-client';
import uniqid from 'uniqid';

var cnt = 0;

class App extends Component {
    
    constructor(){
        super();

        //binding context
        this.get_cc_ids=this.get_cc_ids.bind(this);
        this.release_cc_ids=this.release_cc_ids.bind(this);
        
        this.state = {
            config:{},
            endpoint:'localhost:4001',
            value:50,
            cc_gen_ids:[102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,85,86,87,88,89,90,20,21,22,23,24,25,26,27,28,29,30,31,14,15,9,3]
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

    render() {
        
        this.gridelements=[]
        
        for (var i = 0, len = 3; i < len; i++) {
            this.gridelements.push(<Channel key={uniqid.time()} socket={this.socket} get_cc_ids={this.get_cc_ids} release_cc_ids={this.release_cc_ids}/>);
        }
        
        this.gridelements.push(<PadGrid key={uniqid.time()} pad_num='16' socket={this.socket} get_cc_ids={this.get_cc_ids} release_cc_ids={this.release_cc_ids}/>);
        
        //this.gridelements.push(<KnobGrid key={uniqid.time()}  pad_num='9' socket={this.socket} get_cc_ids={this.get_cc_ids} release_cc_ids={this.release_cc_ids}/>);

        return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">KonTroller</h1>
            </header>
                <div className="grid-container">
                    {this.gridelements}
                </div>
        </div>
        );
    }

    get_cc_ids(num){
        var arr = this.state.cc_gen_ids.splice(0,num);
        console.log('assiged midi cc ids:'+arr);
        return arr;
    }

    release_cc_ids(ids){
        this.state.cc_gen_ids.push(...ids);
        console.log('released midi cc ids'+ ids);
    }

}

function poke_server(period_ms) {
        var poke = setInterval(()=>{
            console.log('poking server');
            this.socket.emit('service','test_msg'+cnt++);   
        },period_ms)
}


export default App;
