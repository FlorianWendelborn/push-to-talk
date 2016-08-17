var sio = require('socket.io')();
var gkm = require('gkm');

sio.on('connection', function (socket) {
	console.log('connected', socket.id);
});

sio.listen(1337);

var ptt = false;
gkm.events.on('key.*', function (data) {
	switch (data[0]) {
		case "G\n":
			if (!ptt && this.event === 'key.pressed') {
				ptt = true;
				console.log('+PTT');
				sio.sockets.emit('update', {ptt: true});
			} else if (ptt && this.event === 'key.released') {
				ptt = false;
				console.log('-PTT');
				sio.sockets.emit('update', {ptt: false});
			}
		break;
	}
});

// var Keyboard = require('node-keyboard');
//
// var k = new Keyboard('event5'); // 'event2' is the file corresponding to my keyboard in /dev/input/
// k.on('keyup', function (data) {
// 	if (ptt && data.keyId === 'KEY_G') {
// 		ptt = false;
// 		console.log('-PTT');
// 		sio.sockets.emit('update', {ptt: false});
// 	}
// });
// k.on('keydown', function (data) {
// 	if (!ptt && data.keyId === 'KEY_G') {
// 		ptt = true;
// 		console.log('+PTT');
// 		sio.sockets.emit('update', {ptt: true});
// 	}
// });
