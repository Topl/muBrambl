require('dotenv').config()
const LokiJS = require('../../index')

const loki = new LokiJS({
    Requests: {
        url: 'https://valhalla.torus.topl.co/',
        apiKey: process.env.VALHALLA_KEY
    },
    KeyManager: {
        password: 'newKey'
    }
})

const arr = Array(1000).fill().map((x, i) => i);

const createParams = arr.map(x => {
    return {
        issuer: loki.keyManager.pk,
        assetCode: x + '-test-' + Date.now(),
        recipient: loki.keyManager.pk,
        amount: 1,
        fee: 0
    }
})


let failed = 0;
const first = async () => createParams.forEach(x => {
    loki.transaction('createAssetsPrototype', x)
        .then(res => { console.log('Unconfirmed transaction'); console.log(res); return res })
        .then(res => loki.pollTx(res.result.txHash))
        .then(res => { console.log('\nConfirmed transaction'); console.log(res) })
        .catch(e => {failed++; console.log("\n" + failed); console.error(e)})
    return failed
})

first().then(f => console.log(f)).catch(e => { console.error(e); console.log(failed); })