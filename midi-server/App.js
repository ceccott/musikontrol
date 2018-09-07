const easymidi = require('easymidi');
const socketio = require('socket.io');

const vINname = 'musikontrol';


// Init
console.log('Midi Server: is Alive');


// create virtual midi input 
var virtualInput = new easymidi.Input(vINname, true);
console.log('Created virtual MIDI input port:'+vINname);







function close_all() {
    virtualInput.close();
    console.log('Goodbye!');
}
