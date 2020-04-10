require('dotenv').config()
const LokiJS = require('../index')

const loki = new LokiJS({
    // Requests: {
    //     url: 'https://valhalla.torus.topl.co:9585/',
    //     apiKey: process.env.VALHALLA_KEY
    // },
    KeyManager: {
        password: 'genesis',
        keyPath: './keystore/itGuy.json'
    }
})

const createParams = {
    issuer: loki.keyManager.pk,
    assetCode: "test-" + Date.now(),
    recipient: loki.keyManager.pk,
    amount: 1,
    fee: 0
};

loki.transaction('createAssetsPrototype', createParams).then(console.log)