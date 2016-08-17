var gkm = require('gkm');

gkm.events.on('key.pressed', function (data) {
    console.log('\'' + data + '\'')
    console.log(this.event + ' ' + data);
});
