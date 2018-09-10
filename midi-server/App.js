const easymidi = require('easymidi');
const socketio = require('socket.io');
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const port = process.env.PORT || 4001;
const server = http.createServer(app);
const io = socketIo(server);

// Config
var config = {}
// Virtual MIDI ends names
const vINname = 'musikontrol-in';
const vOUTname= 'musikontrol-out';



// Init server socket
server.listen(port,()=> console.log(`Listening on port ${port}`));


// create virtual midi input 
var virtualInput = new easymidi.Input(vINname, true);
console.log('Created virtual MIDI input port:'+vINname);
var virtualOutput= new easymidi.Output(vOUTname,true);
console.log('Created virtual MIDI output port:'+vOUTname);


console.log('MIDI inputs:');
console.log(easymidi.getInputs());

console.log('MIDI outputs:');
console.log(easymidi.getOutputs());

//On New Client callback
io.on("connection", socket => {
    console.log("New client connected");

    socket.emit("Config",config);
        
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

    // receive msg and send as midi
    socket.on('midi',(msg)=> {
        console.log('msg received ->'+JSON.stringify(msg));
        try {
            virtualOutput.send(msg.type,msg.data);
        } catch (e) {
            /* handle error */
            console.log(e);
        } 
    
    })

});


//var poke= MIDI_tick(1000);


// Monitor all MIDI inputs with a single "message" listener
//getAllIn()



// ----- functions -------


function MIDI_tick(period_ms) {
    var i = 0;
    return setInterval(
        () => {
            console.log('MIDI_tick...'+i++)
            virtualOutput.send('cc', {
                controller: 127,
                value: 0,
                channel: 15
            })
        
        }
        ,period_ms)
}


function close_all() {
    virtualInput.close();
    console.log('Goodbye!');
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function getAllIn(){
    easymidi.getInputs().forEach(function(inputName){
        var input = new easymidi.Input(inputName);
        input.on('message', function (msg) {
            var vals = Object.keys(msg).map(function(key){return key+": "+msg[key];});
            console.log(inputName+": "+vals.join(', '));
        });
    });
}

