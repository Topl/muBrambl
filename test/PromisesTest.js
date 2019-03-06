'use strict';
// const Base58 = require('base58');

const LokiJS = require('./../src/Requests.js');

var LokiObj = new LokiJS();


//////////Better abstraction//////////

console.log('\n' + "----------Promises Tests----------" + '\n'); LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 1, 'testAssets', 0, '')
.then(function(response) {
  console.log(JSON.parse(response).result.txHash);
  LokiObj.onConfirm(response, 10000, 3000)
  .then(function(response) {
    console.log("Response" + '\n' + response);
  },function(error) {
    console.log("Error" + '\n' + error);
  });
});

// LokiObj.getTransactionById('9boUPrAxPZJNNMHMRxWCN9E6eMNr8t9KDewV5dEBAdYq')
// .then(function(response) {
//   console.log(response);
// });
//
// LokiObj.getMempool()
// .then(function(response) {
//   console.log("mempool");
//   console.log(response);
// });




////////////////////////////////////////////
