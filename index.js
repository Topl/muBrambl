const base58 = require('base-58')

// internal classes
const Requests = require('./src/Requests');
const KeyManager = require('./src/KeyManager');

// Utilities
const hash = require('./src/utils/Hash')

// Constants definitions
const validTxMethods = [
    'createAssetsPrototype',
    'transferAssetsPrototype',
    'transferTargetAssetsPrototype'
]

/**
 * A class for simplifying interactions with the Topl blockchain
 *
 * @class Loki
 */
class Loki {

    constructor(params = {}) {
        // default values for the constructor arguement
        const keyManagerVar = params.KeyManager || {};
        const requestsVar = params.Requests || {};

        // if only a string is given in the constructor, assume it is the password.
        // Therefore, target a local chain provider and make a new key
        if (params.constructor === String) keyManagerVar.password = params


        // Setup reqeusts object
        if (requestsVar.instance) {
            this.requests = requestsVar.instance
        } else if (requestsVar.url) { 
            this.requests = new Requests(requestsVar.url, requestsVar.apiKey)
        } else {
            this.requests = new Requests()
        }

        // Setup KeyManager object
        if (!keyManagerVar.password) throw new Error('An encryption password is required to open a keyfile')
        if (keyManagerVar.instance) {
            this.keyManager = keyManagerVar.instance
        } else if(keyManagerVar.keyPath) {
            this.keyManager = new KeyManager({ password: keyManagerVar.password, keyPath: keyManagerVar.keyPath, constants: keyManagerVar.constants })
        } else {
            this.keyManager = new KeyManager({ password: keyManagerVar.password })
        }

        // Import utilities
        this.utils = { hash }

    }
}

/**  
 * Add a signature to a prototype transaction using the an unlocked key manager object
 * 
 * @param {object} prototypeTx An unsigned transaction JSON object
 * @param {object|object[]} userKeys A keyManager object containing the user's key (may be an array)
*/
Loki.prototype.addSig = async function (prototypeTx, userKeys) {
    // function for generating a signature in the correct format
    const genSig = (keys, txBytes) => {
        return Object.fromEntries( keys.map( key => [key.pk, base58.encode(key.sign(txBytes))]));
    }

    // in case a single given is given not as an array
    const keys = Array.isArray(userKeys) ? userKeys : [userKeys]

    // add signatures of all given key files to the formatted transaction
    return { 
        ...prototypeTx.formattedTx, 
        signatures: genSig(keys, base58.decode(prototypeTx.messageToSign))
    }
}

/**
 * Used to sign a prototype transaction and broadcast to a chain provider
 *
 * @param {object} prototypeTx
 */
Loki.prototype.signAndBroadcast = async function (prototypeTx) {
    const formattedTx = await this.addSig(prototypeTx, this.keyManager)
    return this.requests.broadcastTx({ tx: formattedTx }).catch(e => { console.error(e); throw e })
}

/** 
 * Create a new transaction, then sign and broadcast
 * 
 * @param {string} method The method to 
*/
Loki.prototype.transaction = async function (method, params) {
    if (!validTxMethods.includes(method)) throw new Error('Invalid transaction method')
    return this.requests[method](params).then(res => this.signAndBroadcast(res.result))
}

module.exports = Loki;
