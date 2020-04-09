# LokiJS

A NodeJS library to facilitate interaction with the Topl blockchain network. This server-side SDK is compliant with the Dion version of the Topl protocol as defined by the reference implementation, [Bifrost client](https://github.com/topl/bifrost).

# Installation

To install from npm run ``npm install --save bifrost-lokijs`` in your project directory<br/>

To install from source:
- Git clone using ``git clone https://github.com/topl/LokiJS``
- Run `npm run install` within the cloned repo to install all dependencies

# Usage

To create a minimal instance of LokiJS in your application, include the following commands:<br/>
```
const LokiJS = require('bifrost-lokijs');
const loki = new LokiJS('PASSWORD')
```
This will create a new `Requests` instance targetting a local node running at `http://localhost:9085` and generate a new `KeyManager` instance for signing transactions, using Curve25519 and encrypted with `PASSWORD`

LokiJS provides the following modules:
* `Loki` - [(link)](./Loki.html) - primary module that provides high-level capabilities and access to 
* `Requests` - [(link)](./Requests.html) - sub-module for sending json-rpc requests to a specified chain provider.
* `KeyManager` - [(link)](./KeyManager.html) - sub-module that provides functions for creating, importing, and exporting Bifrost compatible keyfiles. 
* `Hash` - [(link)](./Hash.html) - utility to recreates hashes calculated in Bifrost

A brief overview of each module is given below but for a detailed descriptions of all available methods, please use the links given for each class above.

## Loki
A helper library for interacting with the Topl protocol. Requests to the API layer of a chain provider conform to JSON-RPC standards and are managed by the Requests module. Key Management conforms to the Dion specification of the Topl protocol as implemented in the reference client Bifrost v1.0.0.

Transactions may be issued using the method `loki.transaction` following instantiation of the class. In summary, a transaction is implemented by:
  1. Requesting a prototype transaction from a specified network provider (i.e Topl Torus service or local private testnet)
  2. Signing the raw transaction bytes using the keyfile in the `KeyManager` instance.
  3. Sending the fully formed transaction to the `broadcastTx` method available in the `Requests` module.

After issuance, the `pollTx` method may be used to begin polling the chain provider to determine the status of the newly issued transaction.

## Requests
The `Requests` module is compliant with Bifrost's Loki Layer interface documented at https://lokilayer.docs.topl.co <br/>
A new Loki Layer interface class may be instantiated by <br/>
```
const requests = LokiJS.Requests()
```

By default requests will be sent to ``http://localhost:9085``. This is the standard address and API port that Bifrost listens on when launched locally. All of the methods available in this module are asynchronous and will return `Promises` that must be handled using `async/await` structures or `.then()`. For example:
```
requests.chainInfo().then(console.log).catch(console.error)
```

### Loki-layer API key protection
By default, Bifrost uses an API key of ``topl_the_world!`` to validate requests on locally running test nets. If you are planning to use the Topl Torus service for servicing API requests, you will need to register for an API key from Torus and subsequently use this value in the constructor of the Loki layer object. Standard best practices for protecting API keys should be followed in this case (i.e. saving variables in .ENV or config files that are not shared with version control).

## KeyManager
The `KeyManager` module is compliant with Bifrost's Gjallarhorn Key Manager service and provides an straightforward interface for creating new keyfiles as well as creating and verifying signatures on transactions. New encrypted keyfiles are generated using Curve25519 key pairs and are encrypted using an AES-256 cipher with a user-specified password. All data within the keyfile is encoded using Base58.<br/>

A new  ``KeyManager`` may be created directly using<br/>
```
const keyManager = LokiJS.KeyManager('PASSWORD')
```
where `'PASSWORD'` is the user provided encryption password for the keyfile.

# Examples
Below are examples for using the LokiJS library with a private testnet running on your localhost. Please consult the [Bifrost documentation](https://github.com/topl/bifrost) for further instructions on deploying a local private testnet.

### Retrieving the timestamp of the latest block
```
LokiJS.Requests().chainInfo().then(x => {
    const timestamp = new Date(x.result.bestBlock.timestamp)
    const blockHeight = x.result.height
    console.log('Block #' + blockHeight + ' forged at ' + timestamp)
})
```

### Importing a keyfile to a KeyManager instance
```
const keyManager = LokiJS.KeyManager({ keyPath: '/path/to/file', password: 'encryption_password' })
```

### Issuing a `createAsset` transaction
```
const loki = new LokiJS('test')

const createParams = {
    issuer: loki.keyManager.pk,
    assetCode: "test-" + Date.now(),
    recipient: loki.keyManager.pk,
    amount: 1,
    fee: 0
};

loki.transaction('createAssetsPrototype', createParams).then(console.log)
```

### Creating and polling a `createAsset` transaction
```
const loki = new LokiJS('test')

const createParams = {
    issuer: loki.keyManager.pk,
    assetCode: "test-" + Date.now(),
    recipient: loki.keyManager.pk,
    amount: 1,
    fee: 0
};

loki.transaction('createAssetsPrototype', createParams)
    .then(res => { console.log('Unconfirmed transaction'); console.log(res); return res })
    .then(res => loki.pollTx(res.result.txHash))
    .then(res => { console.log('\nConfirmed transaction'); console.log(res) })
    .catch(console.log)
```

# License
LokiJS is licensed under the [Mozilla Public License version 2.0 (MPL 2.0)](https://www.mozilla.org/en-US/MPL/2.0). A copy of this license may be found [here](../LICENSE.md)
