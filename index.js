var LokiJS = require('./src/Requests.js');

if(typeof window !== 'undefined' && typeof window.lokijs === 'undefined') {
    window.LokiJS = LokiJS;
}

module.exports = LokiJS;
