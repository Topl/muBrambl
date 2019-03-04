'use strict';
// const Base58 = require('base58');

const LokiJS = require('./Requests.js')

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



//Finding confirmed transaction by using setTimeout function
// LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 1, 'testAssets', 0, '')
// .then(function(response) {
//   const res = JSON.parse(response);
//   console.log("--------------------------------------------------------------");
//   console.log("create assets result:");
//   console.log(response);
//   console.log(res.result.txHash);
//   //Can try setInterval which runs the request at the specified delay interval instead of only after the delay
//   //Might need to allow user to specify timeout/interval delay
//   //Consider defaulting to average delay over last couple blocks if not specified
//
//   // setTimeout(function() {
//   //   LokiObj.findTransactionById(res.result.txHash)
//   //   .then(function(response) {
//   //     console.log("findTransactionById result:");
//   //     console.log(response);
//   //   });
//   //   }, 10000
//   // );
//
//   var refreshID = setInterval(function() {
//       LokiObj.findTransactionById(res.result.txHash)
//       .then(function(response) {
//         try {
//           const res = JSON.parse(response);
//           if(res.result != undefined) {
//             console.log("findTransactionById result:");
//             console.log(response);
//             clearInterval(refreshID);
//           }
//         }
//         catch (e) {
//           console.log('Error:', e);
//         }
//       });
//   }, 5000
//   );
//
// });





//////////Better abstraction//////////

console.log("------------------------------------------")
LokiObj.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 1, 'testAssets', 0, '')
.then(function(response) {
  LokiObj.onConfirm(response, 10000, 1000)
  .then(function(response) {
    console.log(response);
  },function(error) {
    console.log(error)
  });
});
