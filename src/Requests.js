/* A Javascript API wrapper module for the Bifrost Protocol
*
* @author Yamir Tainwala <y.tainwala@topl.me>
* @date 2019
*/

require('fetch-everywhere');
require('es6-promise').polyfill();
const secureRandom = require('secure-random');
const Base58 = require('base-58');
const blake2 = require('blake2');

'use strict';

//Sets the url to localhost and port 9085 by default, which is the default setting when a private chain is run locally
const LokiJS = function() {
  this.url = 'http://localhost:9085/';
  this.defaultAccount = '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ';
  this.headers = {
    'Content-Type': 'application/json-rpc',
    // 'Accept': 'application/json-rpc',
  };
}

//Allows setting a different url than the default from which to
//create and accept RPC connections
LokiJS.prototype.setUrl = function(url) {
  this.url = url;
}

LokiJS.prototype.setDefaultAccount = function(account) {
  this.defaultAccount = account;
}

LokiJS.prototype.setApiKey = function(apiKey) {
  this.headers = {
    'Content-Type': 'application/json-rpc',
    // 'Accept': 'application/json-rpc',
    'api_key': apiKey
  };
}

/////////////////////////////////
/////Wallet Api Routes///////////
/////////////////////////////////

//////getBalances////////////////

LokiJS.prototype.getBalances = async function() {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "balances",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

//////getBalancesByKey////////////////

LokiJS.prototype.getBalancesByKey = async function(publicKey) {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "balances",
    "params": [{
      "publicKey": publicKey
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

//////getOpenKeyfiles////////////////

LokiJS.prototype.getOpenKeyfiles = async function() {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "listOpenKeyfiles",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

//////generateKeyfile////////////////

LokiJS.prototype.generateKeyfile = async function(password) {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "generateKeyfile",
    "params": [{
      "password": password
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

//////lockKeyfile////////////////

LokiJS.prototype.lockKeyfile = async function(publicKey, password) {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "lockKeyfile",
    "params": [{
      "publicKey": publicKey,
      "password": password
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

//////unlockKeyfile////////////////

LokiJS.prototype.unlockKeyfile = async function(publicKey, password) {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "unlockKeyfile",
    "params": [{
      "publicKey": publicKey,
      "password": password
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

/////////////////transferPolys////////////

LokiJS.prototype.transferPolys = async function(recipient, amount, fee, data) {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transferPolys",
    "params": [{
      "recipient": recipient,
      "amount": amount,
      "fee": fee,
      "data": data
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

/////////////////transferArbits////////////

LokiJS.prototype.transferArbits = async function(recipient, sender, amount, fee, data) {
  const route = 'wallet/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transferArbits",
    "params": [{
      "recipient": recipient,
      "sender": sender,
      "amount": amount,
      "fee": fee,
      "data": data
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await fetch(this.url + route, payload);
  }
  catch (err) {
    return err;
  }
}

/////////////////////////////////
/////Asset Api Routes////////////
/////////////////////////////////

/////////////////createAssets////////////

LokiJS.prototype.createAssets = async function(issuer, recipient, amount, assetCode, fee, data) {
  const route = 'asset/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "createAssets",
    "params": [{
      "issuer": issuer,
      "recipient": recipient,
      "amount": amount,
      "assetCode": assetCode,
      "fee": fee,
      "data": data
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

/////////////////transferAssets////////////

LokiJS.prototype.transferAssets = async function(issuer, recipient, amount, assetCode, fee, data) {
  const route = 'asset/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transferAssets",
    "params": [{
      "issuer": issuer,
      "recipient": recipient,
      "amount": amount,
      "assetCode": assetCode,
      "fee": fee,
      "data": data
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}


/////////////////////////////////
/////NodeView Api Routes/////////
/////////////////////////////////

/////////////////getTransactionById////////////

LokiJS.prototype.getTransactionById = async function(transactionId) {
  const route = 'nodeView/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transactionById",
    "params": [{
      "transactionId": transactionId
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}


/////////////////getTransactionFromMempool////////////

LokiJS.prototype.getTransactionFromMempool = async function(transactionId) {
  const route = 'nodeView/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transactionFromMempool",
    "params": [{
      "transactionId": transactionId
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

/////////////////getMempool////////////

LokiJS.prototype.getMempool = async function() {
  const route = 'nodeView/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "mempool",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

/////////////////getBlockById////////////

LokiJS.prototype.getBlockById = async function(blockId) {
  const route = 'nodeView/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "blockById",
    "params": [{
      "blockId": blockId
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}


/////////////////////////////////
/////Debug Api Routes////////////
/////////////////////////////////

///////////Get chain information////////////

LokiJS.prototype.chainInfo = async function() {
  const route = 'debug/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "info",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

////////////Calculate block delay////////////

LokiJS.prototype.calcDelay = async function(blockId, numBlocks) {
  const route = 'debug/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "delay",
    "params": [{
      "blockId": blockId,
      "numBlocks": numBlocks
    }]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

//////////Blocks generated by node's keys////////////

LokiJS.prototype.myBlocks = async function() {
  const route = 'debug/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "myBlocks",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

/////////Map block geneators to blocks////////////

LokiJS.prototype.blockGenerators = async function() {
  const route = 'debug/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "generators",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}

////////////Print full chain////////////

LokiJS.prototype.printChain = async function() {
  const route = 'debug/';
  const body =
  {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "chain",
    "params": [{}]
  };
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify(body)
  };
  try {
    return await (await fetch(this.url + route, payload)).json();
  }
  catch (err) {
    return err;
  }
}



/////////////////////////////////
////////Utils methods////////////
/////////////////////////////////


///////Generates random seed of specified length - defaults to 32//////

LokiJS.prototype.seed = function(seedLength = 32) {
  const bytes = new secureRandom(seedLength);
  return Base58.encode(bytes);
}


/////Generates Blake2b256 hash of specified string////////

LokiJS.prototype.blakeHash = function(message) {
  var h = blake2.createHash('blake2b', {digestLength: 32});
  h.update(new Buffer.from(message));
  return Base58.encode(h.digest());
}



////////////////////////////////////////////////////
////////Check if a transaction is confirmed/////////
////////////////////////////////////////////////////

//Trying to couple setInterval and setTimeout to wrap the findTransactionById fetch request
LokiJS.prototype.onConfirm = function(transactionResult, timeout = 60000, interval = 3000) {
  const transactionRes = JSON.parse(transactionResult);
  var _this = this;
    return new Promise((resolve, reject) => {
    var failureResponse;
    var intervalID = setInterval(function() {
      _this.getTransactionById(transactionRes.result.txHash)
      .then(function(response) {
        try{
          failureResponse = response;
          const confirmationRes = JSON.parse(response);
          //If result is non-null (transaction found)
          //resolve the promise with json of result
          //and stop interval and timeout threads
          if(confirmationRes.result != undefined) {
            clearInterval(intervalID);
            clearTimeout(timeoutID);
            resolve(response);
          }
        }
        catch(error) {//Catch if response cannot be parsed correctly
          reject("Unexepected API response from findTransactionById" + '\n' + error);
        }
      },function(error) {//Failure callback for .then() on findTransactionById
        reject("Error: findTransactionById promise failed to resolve" + '\n' + error);
      })
      .catch(function(error) {//Catch for findTransactionById
        reject(error);
      });
    }, interval);
    //Setting timeout thread to clear interval thread after timeout duration
    var timeoutID = setTimeout(function() {
      clearInterval(intervalID);
      reject("Error: Request timed out, transaction not found" + '\n' + failureResponse);
    }, timeout);
  });
}



///////////////////////////////////////////////////

module.exports = LokiJS;

//////////////////////////////////////////////