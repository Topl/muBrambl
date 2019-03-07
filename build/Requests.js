'use strict';

//require('request');
require('fetch-everywhere');
require('es6-promise').polyfill();
var secureRandom = require('secure-random');
var Base58 = require('base-58');
var blake2 = require('blake2');

'use strict';

//Sets the url to localhost and port 9085 by default, which is the default setting
//when a private chain is run locally
var LokiJS = function LokiJS() {
  this.url = 'http://localhost:9085/';
  this.defaultAccount = '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ';
};

//Allows setting a different url than the default from which to
//create and accept RPC connections
LokiJS.prototype.setUrl = function (url) {
  this.url = url;
};

LokiJS.prototype.setDefaultAccount = function (account) {
  this.defaultAccount = account;
};

var header = {
  'Content-Type': 'application/json-rpc',
  'Accept': 'application/json-rpc'
};

/////////////////////////////////
/////Wallet Api Routes///////////
/////////////////////////////////

//////getBalances////////////////

LokiJS.prototype.getBalances = function () {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "balances",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

//////getBalancesByKey////////////////

LokiJS.prototype.getBalancesByKey = function (publicKey) {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "balances",
    "params": [{
      "publicKey": publicKey
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

//////getOpenKeyfiles////////////////

LokiJS.prototype.getOpenKeyfiles = function () {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "listOpenKeyfiles",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

//////generateKeyfile////////////////

LokiJS.prototype.generateKeyfile = function (password) {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "generateKeyfile",
    "params": [{
      "password": password
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

//////lockKeyfile////////////////

LokiJS.prototype.lockKeyfile = function (publicKey, password) {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "lockKeyfile",
    "params": [{
      "publicKey": publicKey,
      "password": password
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

//////unlockKeyfile////////////////

LokiJS.prototype.unlockKeyfile = function (publicKey, password) {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "unlockKeyfile",
    "params": [{
      "publicKey": publicKey,
      "password": password
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////transferPolys////////////

LokiJS.prototype.transferPolys = function (recipient, amount, fee, data) {
  var route = 'wallet/';
  var body = {
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
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////transferArbits////////////

LokiJS.prototype.transferArbits = function (recipient, amount, fee, data) {
  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transferArbits",
    "params": [{
      "recipient": recipient,
      "amount": amount,
      "fee": fee,
      "data": data
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////transferArbitsByPublicKey////////////
/* Optional parameters publicKeysToSendFrom and publicKeyToSendChangeTo may be
 * specified, publicKeysToSendFrom must be a list of Base 58 encoded string addresses
 * and publicKeyToSendChangeTo must be a Base58 encoded string
*/

LokiJS.prototype.transferArbitsByPublicKey = function (recipient, amount, fee, data) {
  var publicKeysToSendFrom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var publicKeyToSendChangeTo = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

  var route = 'wallet/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transferArbits",
    "params": [{
      "recipient": recipient,
      "publicKeysToSendFrom": publicKeysToSendFrom,
      "publicKeyToSendChangeTo": publicKeyToSendChangeTo,
      "amount": amount,
      "fee": fee,
      "data": data
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////////////////////
/////Asset Api Routes////////////
/////////////////////////////////

/////////////////createAssets////////////

LokiJS.prototype.createAssets = function (issuer, recipient, amount, assetCode, fee, data) {
  var route = 'asset/';
  var body = {
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
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////transferAssets////////////

LokiJS.prototype.transferAssets = function (issuer, recipient, amount, assetCode, fee, data) {
  var route = 'asset/';
  var body = {
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
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////////////////////
/////NodeView Api Routes/////////
/////////////////////////////////

/////////////////getTransactionById////////////

LokiJS.prototype.getTransactionById = function (transactionId) {
  var route = 'nodeView/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transactionById",
    "params": [{
      "transactionId": transactionId
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////getTransactionFromMempool////////////

LokiJS.prototype.getTransactionFromMempool = function (transactionId) {
  var route = 'nodeView/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "transactionFromMempool",
    "params": [{
      "transactionId": transactionId
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////getMempool////////////

LokiJS.prototype.getMempool = function () {
  var route = 'nodeView/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "mempool",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////getBlockById////////////

LokiJS.prototype.getBlockById = function (blockId) {
  var route = 'nodeView/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "blockById",
    "params": [{
      "blockId": blockId
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////////////////////
/////Debug Api Routes////////////
/////////////////////////////////

///////////Get chain information////////////

LokiJS.prototype.chainInfo = function () {
  var route = 'debug/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "info",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

////////////Calculate block delay////////////

LokiJS.prototype.calcDelay = function (blockId, numBlocks) {
  var route = 'debug/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "delay",
    "params": [{
      "blockId": blockId,
      "numBlocks": numBlocks
    }]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

//////////Blocks generated by node's keys////////////

LokiJS.prototype.myBlocks = function () {
  var route = 'debug/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "myBlocks",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////Map block geneators to blocks////////////

LokiJS.prototype.blockGenerators = function () {
  var route = 'debug/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "generators",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

////////////Print full chain////////////

LokiJS.prototype.printChain = function () {
  var route = 'debug/';
  var body = {
    "jsonrpc": "2.0",
    "id": "30",
    "method": "chain",
    "params": [{}]
  };
  var payload = {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload).then(function (response) {
    return response.json();
  }).then(function (jsonData) {
    return JSON.stringify(jsonData, null, 2);
  }).catch(function (err) {
    return err;
  });
};

/////////////////////////////////
////////Utils methods////////////
/////////////////////////////////


///////Generates random seed of specified length - defaults to 32//////

LokiJS.prototype.seed = function () {
  var seedLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

  var bytes = new secureRandom(seedLength);
  return Base58.encode(bytes);
};

/////Generates Blake2b256 hash of specified string////////

LokiJS.prototype.blakeHash = function (message) {
  var h = blake2.createHash('blake2b', { digestLength: 32 });
  h.update(new Buffer(message));
  return Base58.encode(h.digest());
};

////////////////////////////////////////////////////
////////Check if a transaction is confirmed/////////
////////////////////////////////////////////////////

//Trying to couple setInterval and setTimeout to wrap the findTransactionById fetch request
LokiJS.prototype.onConfirm = function (transactionResult) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60000;
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;

  var transactionRes = JSON.parse(transactionResult);
  var _this = this;
  return new Promise(function (resolve, reject) {
    var failureResponse;
    var intervalID = setInterval(function () {
      _this.getTransactionById(transactionRes.result.txHash).then(function (response) {
        try {
          failureResponse = response;
          var confirmationRes = JSON.parse(response);
          //If result is non-null (transaction found)
          //resolve the promise with json of result
          //and stop interval and timeout threads
          if (confirmationRes.result != undefined) {
            clearInterval(intervalID);
            clearTimeout(timeoutID);
            resolve(response);
          }
        } catch (error) {
          //Catch if response cannot be parsed correctly
          reject("Unexepected API response from findTransactionById" + '\n' + error);
        }
      }, function (error) {
        //Failure callback for .then() on findTransactionById
        reject("Error: findTransactionById promise failed to resolve" + '\n' + error);
      }).catch(function (error) {
        //Catch for findTransactionById
        reject(error);
      });
    }, interval);
    //Setting timeout thread to clear interval thread after timeout duration
    var timeoutID = setTimeout(function () {
      clearInterval(intervalID);
      reject("Error: Request timed out, transaction not found" + '\n' + failureResponse);
    }, timeout);
  });
};

///////////////////////////////////////////////////

module.exports = LokiJS;

//////////////////////////////////////////////