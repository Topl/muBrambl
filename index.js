var Requests = require('./src/Requests.js');
var KeyManager = require('./src/KeyManager.js');

// this line might be wrong, I am incorporaing more into LokiJS, so changed the
// original LokiJS require to be Requests (JAA)
// if(typeof window !== 'undefined' && typeof window.lokijs === 'undefined') {
//     window.LokiJS = LokiJS;
// }

module.exports = { Requests, KeyManager };
