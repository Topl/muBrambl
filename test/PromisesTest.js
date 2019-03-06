'use strict';
// const Base58 = require('base58');

const LokiJS = require('./../src/Requests.js');

var LokiObj = new LokiJS();

//Finding transaction from mempool sample usage -- not necessary
// LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 1, 'testAssets', 0, '')
// .then(function(response) {
//   const res = JSON.parse(response);
//   console.log("--------------------------------------------------------------");
//   console.log("create assets result:");
//   console.log(response);
//   console.log(res.result.txHash);
//   LokiObj.findTransactionFromMempool(res.result.txHash)
//   .then(function(response) {
//     console.log("findTransactionFromMempool result:");
//     console.log(response);
//   });
// });


//////////Better abstraction//////////

console.log('\n' + "----------Promises Tests----------" + '\n'); LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 1, 'testAssets', 0, '')
.then(function(response) {
  LokiObj.onConfirm(response, 100000, 3000)
  .then(function(response) {
    console.log("Response" + '\n' + response);
  },function(error) {
    console.log("Error" + '\n' + error);
  });
});






////////////////////////////////////////////
