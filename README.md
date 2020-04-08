# LokiJS

A NodeJS library to facilitate interaction with the Topl blockchain network. This library currently supports Topl's Bifrost client.

# Installation

To install from npm run ``npm install bifrost-lokijs`` in your project directory<br/>

To install locally:
- Git clone using ``git clone https://github.com/topl/LokiJS``
- Run `npm run install` within the cloned repo to install all dependencies

# Usage

Create an instance of LokiJS in your JS application by including:<br/>
`const LokiJS = require('bifrost-lokijs')`

LokiJS provides the following modules:
* The `Requests` module provides a class for sending json-rpc requests to a targeted instance of Bifrost. 
* The `KeyManager` module provides functions for creating, importing, and exporting Bifrost compatible keyfiles. 
* The `Hash` module recreates hashes calculated in Bifrost

## Requests
The `Requests` module is compliant with Bifrost's Loki Layer interface documented at https://lokilayer.docs.topl.co <br/>
A new Loki Layer interface class may be instantiated by <br/>
``const lokiLayer = new LokiJS.LokiLayer()``

By default requests will be sent to ``http://localhost:9085``. This is the standard address and API port that Bifrost listens on when launched locally.

All of the methods available in this module are asynchronous and will return Promises that must be handled using async/await structures or .then(). For example: <br/>
``lokiLayer.chainInfo().then(res => console.log(res)).catch(e => console.error(e))``

## KeyManager
The `KeyManager` module is compliant with Bifrost's Gjallarhorn Key Manager service. 
* New encrypted keyfiles are generated using Curve25519 key pairs and an AES-256 cipher with a user-specified password. All data within the keyfile is encoded using Base58.
* Transaction creation using locally managed keyfiles is implemented by:
  1. Requesting a prototype transaction from a specified network provider (i.e Topl Torus service or local private testnet)
  2. Signing the raw transaction bytes using the locally managed keyfile thruogh LokiJS.
  3. Sending the fully formed transaction to the ``broadcast`` method of your chosen network provider.

A new  ``KeyManager`` may be created directly using<br/>
``const keyManager = new LokiJS.KeyManager(<PASSWORD>)``<br/>
where `<PASSWORD>` is the user provided encryption password for the keyfile.


# Loki-layer API key protection
By default, Bifrost uses an API key of ``topl_the_world!`` to validate requests on locally running test nets. If you are planning to use the Topl Torus service for servicing API requests, you will need to register for an API key from Torus and subsequently use this value in the constructor of the Loki layer object. Standard best practices for protecting API keys should be followed in this case (i.e. saving variables in .ENV or config files that are not shared with version control).

# License

LokiJS is licensed under the
[Mozilla Public License version 2.0 (MPL 2.0)](https://www.mozilla.org/en-US/MPL/2.0), also included
in our repository in the `LICENSE` file.
