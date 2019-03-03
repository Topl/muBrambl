'use strict';

const LokiJS = require('./Requests.js')

// var LokiObj = new LokiJS('http://localhost:9085/');
var LokiObj = new LokiJS();

console.log("LokiJS prototype model tests");
//Using .then on promise to access json data
// console.log('----------------------------------------------------------------');
// console.log("getBalances result:");
// LokiObj.getBalances()
// .then(function(response) {
//   console.log(response);
// });

LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 10, 'testAssets', 0, '')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("create 10 testAssets result:");
  console.log(response);
});

LokiObj.transferAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 'A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb', 1, 'testAssets', 0, '')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("transferAssets result:");
  console.log(response);
});

LokiObj.transferArbits('A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb', 10, 0, '')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("transferArbits result:");
  console.log(response);
});

LokiObj.transferArbitsByPublicKey('A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb', 10, 0, '', ['6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ'], '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("transferArbitsByPublicKey result:");
  console.log(response);
});

LokiObj.transferArbitsByPublicKey('A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb', 10, 0, '')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("transferArbitsByPublicKey result with no params specified");
  console.log(response);
});

LokiObj.getBalancesByKey('A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("getBalancesByKey result:");
  console.log(response);
});

LokiObj.getOpenKeyfiles()
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("getOpenKeyfiles result:");
  console.log(response);
});

LokiObj.generateKeyfile("password")
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("generateKeyfile result:");
  console.log(response);
});

LokiObj.lockKeyfile('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 'genesis')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("lockKeyfile result:");
  console.log(response);
});

LokiObj.unlockKeyfile('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 'genesis')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("unlockKeyfile result:");
  console.log(response);
});
