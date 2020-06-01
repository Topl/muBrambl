'use strict';
// const Base58 = require('base58');

const BramblJS = require('../dist/modules/Requests.js');

var BramblObj = new BramblJS("https://valhalla.torus.topl.co/", process.env.VALHALLA_KEY);

//////////Better abstraction//////////
var assetsParams={
  issuer:'6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 
  assetCode:'6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 
  amount: 100, 
  recipient:'testAssets', 
  fee: 0, 
  // she:''
}
console.log('\n' + "----------Promises Tests----------" + '\n'); BramblObj.createAssets(assetsParams)
.then(function(response) {
  BramblObj.onConfirm(response, 30000, 3000)
  .then(function(response) {
    console.log("Response" + '\n' + response);
  },function(error) {
    console.log("Error" + '\n' + error);
  });
});



////////////////////////////////////////////
