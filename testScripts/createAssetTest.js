const loki = require('../index')
require('dotenv')

const lokiLayer = new loki.Requests("https://valhalla.torus.topl.co:9585/", process.env.VALHALLA_KEY)
const keyMan = new loki.KeyManager; keyMan.importFromFile('./keystore/itGuy.json' , 'genesis')
const signAndBroadcast = (tx) => loki.utils.transactions.signAndBroadcast(lokiLayer, keyMan, tx)

const createParams = {
    issuer: keyMan.pk,
    assetCode: "test-" + Date.now(),
    recipient: keyMan.pk,
    amount: 1,
    fee: 0
};

lokiLayer.createAssetsPrototype(createParams)
    .then(res => signAndBroadcast(res.result))
    .then(res => console.log(res))