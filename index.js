const LokiLayer = require('./src/Requests.js');
const KeyManager = require('./src/KeyManager.js');
const Hash = require('./src/Hash.js')

// this line might be wrong, I am incorporaing more into LokiJS, so changed the
// original LokiJS require to be Requests (JAA)
// if(typeof window !== 'undefined' && typeof window.lokijs === 'undefined') {
//     window.LokiJS = LokiJS;
// }

module.exports = { LokiLayer, KeyManager, Hash };
