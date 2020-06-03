'use strict';
require('./node_modules/dotenv').config()

const BramblJS = require('../dist/modules/Requests.js');

var BramblObj = new BramblJS("https://valhalla.torus.topl.co/", process.env.VALHALLA_KEY);

console.log('\n' + "----------BramblJS prototype model tests------------" + '\n');
//Using .then on promise to access json data

BramblObj.getBalancesByKey({
  publicKeys:['A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb'],
})
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("getBalancesByKey result:");
  console.log(response);
  });

BramblObj.unlockKeyfile({
  publicKey:'6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 
  password:'genesis'
})
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("unlockKeyfile result:");
  console.log(response);
});

BramblObj.chainInfo()
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("chainInfo result:");
  console.log(response);
});

// BramblObj.myBlocks()
// .then(function(response) {
//   console.log('----------------------------------------------------------------');
//   console.log("myBlocks result:");
//   console.log(response);
// });

BramblObj.blockGenerators()
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("blockGenerators result:");
  console.log(response);
});

BramblObj.calcDelay({blockId: '6LPtWEm5CRzcjcqJKym9ByKPRYWvBYy7P3DHeE4K7F2r', numBlocks:10})
.then(function(response) {
  console.log('----------------------------------------------------------------');
  console.log("calcDelay result:");
  console.log(response);
});

// console.log(BramblObj.seed());

// console.log(BramblObj.seed(10));

// console.log(BramblObj.blakeHash('Hello World'));

// console.log(BramblObj.blakeHash('test_key'));
