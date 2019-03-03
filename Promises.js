'use strict';
// const Base58 = require('base58');

const LokiJS = require('./Requests.js')

var LokiObj = new LokiJS();

//Finding confirmed transaction by using setTimeout function
LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 1, 'testAssets', 0, '')
.then(function(response) {
  const res = JSON.parse(response);
  console.log(response);
  console.log(res.result.txHash);
  setTimeout(function() {
    LokiObj.findTransactionById(res.result.txHash)
    .then(function(response) {
      console.log(response);
    });
  }, 10000
);


  // const start = Date.now();
  // while(Date.now() - start > 100000) {
  //   LokiObj.findTransactionById(res.result.txHash)
  //   .then(function(response) {
  //     console.log(response);
  //   });
  // }
});
