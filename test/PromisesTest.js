'use strict';
// const Base58 = require('base58');

const LokiJS = require('./../src/Requests.js');

var LokiObj = new LokiJS();


//////////Better abstraction//////////

console.log('\n' + "----------Promises Tests----------" + '\n'); LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 100, 'testAssets', 0, '')
.then(function(response) {
  LokiObj.onConfirm(response, 30000, 3000)
  .then(function(response) {
    console.log("Response" + '\n' + response);
  },function(error) {
    console.log("Error" + '\n' + error);
  });
});

// LokiObj.getTransactionById('H35qvgeh7dV7VZWWcUHpMssfXQX2Ur9o35SDYuEkDEKn')
// .then(function(response) {
//   console.log(response);
// });

// LokiObj.getMempool()
// .then(function(response) {
//   console.log("mempool");
//   console.log(response);
// });

// LokiObj.getBalancesByKey('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ')
// .then(function(response) {
//   console.log(response);
// });




////////////////////////////////////////////
