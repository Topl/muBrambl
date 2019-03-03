//require('request');
require('fetch-everywhere');
require('es6-promise').polyfill();

'use strict';

//Sets the url to localhost and port 9085 by default, which is the default setting
//when a private chain is run locally
const LokiJS = function() {
  this.url = 'http://localhost:9085/';
}

//Allows setting a different url than the default from which to create and accept RPC connections
LokiJS.prototype.setUrl = function(url) {
  this.url = url;
}

const header =
{
  'Content-Type': 'application/json-rpc',
  'Accept': 'application/json-rpc'
};

//////getBalances////////////////

LokiJS.prototype.getBalances = function(){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

//////getBalancesByKey////////////////

LokiJS.prototype.getBalancesByKey = function(publicKey){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

//////getOpenKeyfiles////////////////

LokiJS.prototype.getOpenKeyfiles = function(){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

//////generateKeyfile////////////////

LokiJS.prototype.generateKeyfile = function(password){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

//////lockKeyfile////////////////

LokiJS.prototype.lockKeyfile = function(publicKey, password){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

//////unlockKeyfile////////////////

LokiJS.prototype.unlockKeyfile = function(publicKey, password){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

/////////////////createAssets////////////

LokiJS.prototype.createAssets = function(issuer, recipient, amount, assetCode, fee, data){
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
    header: header,
    body: JSON.stringify(body)
  };
  // var response;
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    // response = JSON.stringify(jsonData);
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
  // return response
}

/////////////////transferAssets////////////

LokiJS.prototype.transferAssets = function(issuer, recipient, amount, assetCode, fee, data){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

/////////////////transferArbits////////////

LokiJS.prototype.transferArbits = function(recipient, amount, fee, data){
  const route = 'wallet/';
  const body =
  {
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
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

/////////////////transferArbitsByPublicKey////////////
/* Optional parameters publicKeysToSendFrom and publicKeyToSendChangeTo may be
 * specified, publicKeysToSendFrom must be a list of Base 58 encoded string addresses
 * and publicKeyToSendChangeTo must be a Base58 encoded string
*/

LokiJS.prototype.transferArbitsByPublicKey = function(recipient, amount, fee, data, publicKeysToSendFrom = [], publicKeyToSendChangeTo = ''){
  const route = 'wallet/';
  const body =
  {
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
  const payload =
  {
    url: this.url + route,
    method: 'POST',
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

/////////////////findTransactionById////////////

LokiJS.prototype.findTransactionById = function(transactionId){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

/////////////////findTransactionFromMempool////////////

LokiJS.prototype.findTransactionFromMempool = function(transactionId){
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
    header: header,
    body: JSON.stringify(body)
  };
  return fetch(this.url + route, payload)
  .then(function(response){
    return response.json();
  }).then(function(jsonData){
    return JSON.stringify(jsonData, null, 2);
  }).catch(function(err){
    return err;
  })
}

///////////////////////////////////////////////////

module.exports = LokiJS;


//////////////////////////////////////////////

// LokiJS.prototype.createAssets = async function(issuer, recipient, amount, assetCode, fee, data){
//   const route = 'asset/';
//   const createAssets_body =
//   {
//     "jsonrpc": "2.0",
//     "id": "30",
//     "method": "createAssets",
//     "params": [{
//       "issuer": issuer,
//       "recipient": recipient,
//       "amount": amount,
//       "assetCode": assetCode,
//       "fee": fee,
//       "data": data
//     }]
//   };
//
//   const createAssets_payload =
//   {
//     url: this.url + route,
//     method: 'POST',
//     header: header,
//     body: JSON.stringify(createAssets_body)
//   };
//
//   try {
//     const val = await fetch(this.url + route, createAssets_payload);
//     const response = await val.json();
//     // console.log(response);
//     // console.log(response);
//     // console.log(JSON.stringify(response));
//     return response;
//   }
//
//   catch(err) {
//     console.log(err);
//   }
// }


///////////Different ways to fetch api results////////////////


// fetch('http://localhost:9085/wallet/', balances_payload)
// .then(function(response){
//   // console.log(response.json())
//   return response.json();
// }).then(function(jsonData){
//   console.log(JSON.stringify(jsonData));
//   return jsonData;
// }).catch(function(err){
//   return err;
// })


/////////////////////////////////////////////////

// async function getBalances() {
//   fetch('http://localhost:9085/wallet/', balances_payload)
//   .then(function(response){
//     // console.log(response.json())
//     return response.json();
//   }).then(function(jsonData){
//     console.log(jsonData);
//     return jsonData;
//   }).catch(function(err){
//     return err;
//   })
// }

//////////////////////////////////////////////////////
// const route = 'wallet/';
// const balances_body =
// {
//   "jsonrpc": "2.0",
//   "id": "30",
//   "method": "balances",
//   "params": [{}]
// };
// const balances_payload =
// {
//   url: this.url + route,
//   method: 'POST',
//   header: header,
//   body: JSON.stringify(balances_body)
// };
// var anotherTry = request(balances_payload, function(error, response, body){

//   if(!error && response.statusCode == 200) {
//     // console.log(body);
//     return body;
//   }
//   else {
//     return error;
//   }
// });
// console.log(anotherTry);


// console.log(getBalances());
