const base58 = require('base-58')

/**
 * Used to sign a prototype transaction and broadcast to a chain provider
 *
 * @param {Requests} reqs
 * @param {KeyManager} userKeys
 * @param {object} tx
 */
function signAndBroadcast(reqs, userKeys, tx) {
    const txBytes = base58.decode(tx.messageToSign)
    const formattedTx = tx.formattedTx

    // function for generating the signature and placing into the transaction body
    const addSig = (keyManObj) => {
        formattedTx.signatures = Object.fromEntries([
            [keyManObj.pk, base58.encode(keyManObj.sign(txBytes))]
        ]);
    }

    // in case a single given is given not as an array
    keys = Array.isArray(userKeys) ? userKeys : [userKeys]

    // add signatures of all given key files to the transaction
    keys.forEach(addSig)

    return reqs.broadcastTx({ tx: formattedTx }).catch(e => { console.error(e); throw e })

}

module.exports = { signAndBroadcast }