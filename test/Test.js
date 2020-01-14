'use strict';

const LokiJS = require('./../src/Requests.js');

var LokiObj = new LokiJS();

console.log('\n' + "----------LokiJS prototype model tests------------" + '\n');
//Using .then on promise to access json data

LokiObj.getBalancesByKey('A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb')
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("getBalancesByKey result:");
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

LokiObj.chainInfo()
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("chainInfo result:");
  console.log(response);
});

LokiObj.myBlocks()
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("myBlocks result:");
  console.log(response);
});

LokiObj.blockGenerators()
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("blockGenerators result:");
  console.log(response);
});

LokiObj.calcDelay('6LPtWEm5CRzcjcqJKym9ByKPRYWvBYy7P3DHeE4K7F2r', 10)
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("calcDelay result:");
  console.log(response);
});

console.log(LokiObj.seed());

console.log(LokiObj.seed(10));

console.log(LokiObj.blakeHash('Hello World'));

console.log(LokiObj.blakeHash('test_key'));
