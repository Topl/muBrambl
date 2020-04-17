'use strict';

const BramblJS = require('./../src/Requests.js');

var BramblObj = new BramblJS();

console.log('\n' + "----------BramblJS header tests------------" + '\n');
console.log("");
console.log("Setting api key to: 'test_key'");
console.log("Blake2b256 hash of api key (which should be set in the settings file of your bifrost node):")
console.log(BramblObj.blakeHash('test_key'));
//Setting api key for requests
BramblObj.setApiKey('test_key');

BramblObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 10, 'testAssets', 0, '')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("create 10 testAssets result:");
  console.log(response);
}, function(error) {
  console.log("Error:");
  console.log(error);
});
