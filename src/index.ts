var BramblJS = require('./Brambl');
global.BramblJS = BramblJS;
module.exports = BramblJS;

let bip39: any = require('bip39');
global.toString = bip39;
