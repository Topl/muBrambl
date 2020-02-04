/** A Javascript API wrapper module for the Bifrost Protocol.
 * Currently supports version 4.1 of Bifrost's Loki-Layer API
 * Documentation for Loki-layer is available at https://lokilayer.docs.topl.co
 *
 * @author James Ama (j.aman@topl.me)
 * @version 4.1.0
 * @date 2020.0.29
 * 
 * Based on the original work of Yamir Tainwala - 2019
 */

require("fetch-everywhere");
require("es6-promise").polyfill();

("use strict");

/**
 * General builder function for formatting API request
 *
 * @param {object} routeInfo - call specific information
 * @param {string} routeInfo.route - the route where the request will be sent
 * @param {string} routeInfo.method - the json-rpc method that will be triggered on the node
 * @param {string} routeInfo.id - an identifier for tracking requests sent to the node
 * @param {object} params - method specific parameter object
 * @param {object} self - internal reference for accessing constructor data
 * @returns {object} JSON response from the node
 */
async function LokiRequest(routeInfo, params, self) {
  try {
    const route = routeInfo.route;
    const body = {
      jsonrpc: "2.0",
      id: routeInfo.id || "1",
      method: routeInfo.method,
      params: [
        { ...params }
      ]
    };
    const payload = {
      url: self.url + route,
      method: "POST",
      headers: self.headers,
      body: JSON.stringify(body)
    };
    const response = await (await fetch(self.url + route, payload)).json();
    if (response.error) { throw response }
    else { return response }

  } catch (err) {
    throw err
  }
};

/**
 * The Loki layer interface object.
 * 
 * @param {string} [url="http://localhost:9085/"]
 * @param {string} [apiKey="topl_the_world!"]
 */
const LokiLayer = function (url = "http://localhost:9085/", apiKey = "topl_the_world!") {
  this.url = url;
  this.headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey
  };
};

//Allows setting a different url than the default from which to create and accept RPC connections
LokiLayer.prototype.setUrl = function (url) {
  this.url = url;
};

LokiLayer.prototype.setApiKey = function (apiKey) {
  this.headers["x-api-key"] = apiKey
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////Wallet Api Routes////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////getBalances/////////////////////
/**
 * Get the balances of a specified public key in the keyfiles directory of the node
 * @param {number} id - identifying number for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.getBalances = async function (id = "1") {
  const params = {};
  const route = "wallet/"
  const method = "balances"
  return LokiRequest({ route, method, id }, params, this)
}

//////getBalancesByKey/////////////////////
/**
 * Get the balances of a specified public key in the keyfiles directory of the node
 * @param {Object} params - body parameters passed to the specified json-rpc method
 * @param {string|string[]} params.publicKey - Public key to query the balance for
 * @param {number} id - identifying number for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.getBalancesByKey = async function (params, id = "1") {
  if (!params.publicKey) throw new Error("A publicKey field must be specified")
  const route = "wallet/"
  const method = "balances"
  return LokiRequest({ route, method, id }, params, this)
}

//////listOpenKeyfiles////////////////
/**
 * Get a list of all open keyfiles
 * @param {string} [id] - identifier for the json-rpc request
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.listOpenKeyfiles = async function (id = "1") {
  const params = {};
  const route = "wallet/"
  const method = "listOpenKeyfiles"
  return LokiRequest({ route, method, id }, params, this)
}

//////generateKeyfile////////////////
/**
 * Generate a new keyfile in the node keyfile directory
 * @param {Object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.password - Password for encrypting the new keyfile
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.generateKeyfile = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.password) throw new Error("A password must be provided to encrypt the keyfile")
  const route = "wallet/"
  const method = "generateKeyfile"
  return LokiRequest({ route, method, id }, params, this)
}

//////lockKeyfile////////////////
/**
 * Lock an open keyfile
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.publicKey - Base58 encoded public key to get the balance of
 * @param {string} params.password - Password used to encrypt the keyfile
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.lockKeyfile = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.publicKey) throw new Error("A publicKey field must be specified")
  if (!params.password) throw new Error("A password must be provided to encrypt the keyfile")
  const route = "wallet/"
  const method = "lockKeyfile"
  return LokiRequest({ route, method, id }, params, this)
}

//////unlockKeyfile////////////////
/**
 * Unlock a keyfile in the node's keyfile directory
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.publicKey - Base58 encoded public key to get the balance of
 * @param {string} params.password - Password used to encrypt the keyfile
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.unlockKeyfile = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.publicKey) throw new Error("A publicKey field must be specified")
  if (!params.password) throw new Error("A password must be provided to encrypt the keyfile")
  const route = "wallet/"
  const method = "unlockKeyfile"
  return LokiRequest({ route, method, id }, params, this)
}

//////signTransaction////////////////
/**
 * Have the node sign a JSON formatted prototype transaction
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.publicKey - Base58 encoded public key to get the balance of
 * @param {string} params.tx - a JSON formatted prototype transaction
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.signTransaction = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.publicKey) throw new Error("A publicKey field must be specified")
  if (!params.tx) throw new Error("A tx object must be specified")
  const route = "wallet/"
  const method = "signTx"
  return LokiRequest({ route, method, id }, params, this)
}

///////////broadcastTx////////////////////
/**
 * Have the node sign a `messageToSign` raw transaction
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.tx - a JSON formatted transaction (must include signature(s))
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.broadcastTx = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.tx) throw new Error("A tx object must be specified")
  const route = "wallet/"
  const method = "broadcastTx"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////transferPolys////////////
/**
 * Transfer Polys to a specified public key.
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.recipient - Public key of the transfer recipient
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string|string[]} [params.sender] - Array of public keys which you can use to restrict sending from
 * @param {string} [params.changeAddress] - Public key you wish to send change back to
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.transferPolys = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "wallet/"
  const method = "transferPolys"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////transferArbits////////////
/**
 * Transfer Arbits to a specified public key.
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.recipient - Public key of the transfer recipient
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string|string[]} [params.sender] - Array of public keys which you can use to restrict sending from
 * @param {string} [params.changeAddress] - Public key you wish to send change back to
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.transferArbits = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "wallet/"
  const method = "transferArbits"
  return LokiRequest({ route, method, id }, params, this)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////Asset Api Routes/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////createAssets////////////
/**
 * Create a new asset on chain
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.issuer - Public key of the asset issuer
 * @param {string} params.assetCode - Identifier of the asset
 * @param {string} params.recipient - Public key of the asset recipient
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.createAssets = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.issuer) throw new Error("An asset issuer must be specified")
  if (!params.assetCode) throw new Error("An assetCode must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "asset/"
  const method = "createAssets"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////createAssetsPrototype////////////
/**
 * Create a new asset on chain
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.issuer - Public key of the asset issuer
 * @param {string} params.assetCode - Identifier of the asset
 * @param {string} params.recipient - Public key of the asset recipient
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.createAssetsPrototype = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.issuer) throw new Error("An asset issuer must be specified")
  if (!params.assetCode) throw new Error("An assetCode must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "asset/"
  const method = "createAssetsPrototype"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////transferAssets////////////
/**
 * Transfer an asset to a recipient
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.issuer - Public key of the asset issuer
 * @param {string} params.assetCode - Identifier of the asset
 * @param {string} params.recipient - Public key of the asset recipient
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string|string[]} [params.sender] - Array of public keys which you can use to restrict sending from
 * @param {string} [params.changeAddress] - Public key you wish to send change back to
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.transferAssets = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.issuer) throw new Error("An asset issuer must be specified")
  if (!params.assetCode) throw new Error("An assetCode must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "asset/"
  const method = "transferAssets"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////transferTargetAssets////////////
/**
 * Transfer a specific asset box to a recipient
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.recipient - Public key of the asset recipient
 * @param {string} params.assetId - BoxId of the asset to target
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.transferTargetAssets = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.assetId) throw new Error("An assetId is required for this request")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "asset/"
  const method = "transferTargetAssets"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////transferTargetAssetsPrototype////////////
/**
 * Get an unsigned targeted transfer transaction
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.recipient - Public key of the asset recipient
 * @param {array} params.sender - Array of public keys of the asset senders
 * @param {string} params.assetId - BoxId of the asset to target
 * @param {number} params.amount - Amount of asset to send
 * @param {number} params.fee - Fee to apply to the transaction
 * @param {string} [params.data] - Data string which can be associated with this transaction (may be empty)
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.transferTargetAssetsPrototype = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.recipient) throw new Error("A recipient must be specified")
  if (!params.sender) throw new Error("A sender must be specified")
  if (!params.assetId) throw new Error("An assetId is required for this request")
  if (!params.amount) throw new Error("An amount must be specified")
  if (!params.fee && params.fee !== 0) throw new Error("A fee must be specified")
  const route = "asset/"
  const method = "transferTargetAssetsPrototype"
  return LokiRequest({ route, method, id }, params, this)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////NodeView Api Routes//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////getTransactionById////////////
/**
 * Lookup a transaction from history by the provided id
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.transactionId - Unique identifier of the transaction to retrieve
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.getTransactionById = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.transactionId) throw new Error("A transactionId must be specified")
  const route = "nodeView/"
  const method = "getTransactionById"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////getTransactionFromMempool////////////
/**
 * Lookup a transaction from the mempool by the provided id
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.transactionId - Unique identifier of the transaction to retrieve
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.getTransactionFromMempool = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.transactionId) throw new Error("A transactionId must be specified")
  const route = "nodeView/"
  const method = "getTransactionFromMempool"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////getMempool////////////
/**
 * Return the entire mempool of the node
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.getMempool = async function (id = "1") {
  const params = {};
  const route = "nodeView/"
  const method = "mempool"
  return LokiRequest({ route, method, id }, params, this)
}

/////////////////getBlockById////////////
/**
 * Lookup a block from history by the provided id
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.blockId - Unique identifier of the block to retrieve
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.getBlockById = async function (params, id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.blockId) throw new Error("A blockId must be specified")
  const route = "nodeView/"
  const method = "blockById"
  return LokiRequest({ route, method, id }, params, this)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////Debug Api Routes/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////Get chain information////////////
/**
 * Return the chain information
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.chainInfo = async function (id = "1") {
  const params = {};
  const route = "debug/"
  const method = "info"
  return LokiRequest({ route, method, id }, params, this)
}

////////////Calculate block delay////////////
/**
 * Get the average delay between blocks
 * @param {object} params - body parameters passed to the specified json-rpc method
 * @param {string} params.blockId - Unique identifier of a block
 * @param {string} params.numBlocks - Number of blocks to consider behind the specified block
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.calcDelay = async function (id = "1") {
  if (!params) throw new Error("A parameter object must be specified")
  if (!params.blockId) throw new Error("A blockId must be specified")
  if (!params.numBlocks) throw new Error("A number of blocks must be specified")
  const route = "debug/"
  const method = "delay"
  return LokiRequest({ route, method, id }, params, this)
}

//////////Blocks generated by node's keys////////////
/**
 * Return the number of blocks forged by keys held by this node
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.myBlocks = async function (id = "1") {
  const params = {};
  const route = "debug/"
  const method = "myBlocks"
  return LokiRequest({ route, method, id }, params, this)
}

/////////Map block geneators to blocks////////////
/**
 * Return the blockIds that each accessible key has forged
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.blockGenerators = async function (id = "1") {
  const params = {};
  const route = "debug/"
  const method = "generators"
  return LokiRequest({ route, method, id }, params, this)
}

////////////Print full chain////////////
/**
 * Return the entire history of the canonical chain
 * @param {string} [id] - identifier for the json-rpc request
 * @return {object} json-rpc response from the chain
 */
LokiLayer.prototype.printChain = async function (id = "1") {
  const params = {};
  const route = "debug/"
  const method = "chain"
  return LokiRequest({ route, method, id }, params, this)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////Check if a transaction is confirmed///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 2020.02.03 - JAA - Currently not working because I changed how errors propoagate back to the API, this is causing
// the first call of getTx to fail and thus the whole thing is failing.

// //Trying to couple setInterval and setTimeout to wrap the findTransactionById fetch request
// LokiLayer.prototype.onConfirm = function (
//   transactionResult,
//   timeout = 60000,
//   interval = 3000
// ) {
//   //const transactionRes = JSON.parse(transactionResult);
//   const transactionRes = transactionResult;

//   const self = this;
//   return new Promise((resolve, reject) => {
//     var failureResponse;
//     var intervalID = setInterval(function () {
//       self
//         .getTransactionById({transactionId: transactionRes.result.txHash})
//         .then(
//           function (response) {
//             try {
//               failureResponse = response;
//               //const confirmationRes = JSON.parse(response);
//               const confirmationRes = response;
//               console.log(response)
//               //If result is non-null (transaction found)
//               //resolve the promise with json of result
//               //and stop interval and timeout threads
//               if (confirmationRes.result != undefined) {
//                 clearInterval(intervalID);
//                 clearTimeout(timeoutID);
//                 resolve(response);
//               }
//             } catch (error) {
//               //Catch if response cannot be parsed correctly
//               reject(
//                 "Unexepected API response from findTransactionById" +
//                 "\n" +
//                 error
//               );
//             }
//           },
//           function (error) {
//             //Failure callback for .then() on findTransactionById
//             //console.error(error)
//             reject(new Error("findTransactionById promise failed to resolve"));
//           }
//         )
//         .catch(function (error) {
//           //Catch for findTransactionById
//           reject(error);
//         });
//     }, interval);
//     //Setting timeout thread to clear interval thread after timeout duration
//     var timeoutID = setTimeout(function () {
//       clearInterval(intervalID);
//       reject(
//         new Error("Request timed out, transaction not found" + failureResponse)
//       );
//     }, timeout);
//   });
// };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = LokiLayer;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
