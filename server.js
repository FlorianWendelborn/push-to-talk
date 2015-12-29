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
				sio.sockets.emit('update', {ptt: false});
			}
		break;
	}
});
