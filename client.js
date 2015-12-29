var sio = require('socket.io-client');
var robot = require("kbm-robot");
robot.startJar();

var socket = sio('http://localhost:1337');

socket.on('connect', function (data) {
	console.log('connected!');
});

socket.on('update', function (data) {
	if (data.ptt) {
		robot.press('G').go();
	} else {
		robot.release('G').go();
	}
});


// robot.press("alt")
//     .press("tab")
//     .sleep(100)
//     .release("tab")
//     .release("alt")
//     .sleep(100)
//     .typeString("Hello World!")
//     .go()
//     .then(robot.stopJar);
