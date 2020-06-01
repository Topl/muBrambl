const brambl = require('../index')
require('dotenv').config()

const bramblLayer = new brambl.Requests("https://valhalla.torus.topl.co", process.env.VALHALLA_KEY)
const keyMan = new brambl.KeyManager; keyMan.importFromFile('./keystore/itGuy.json' , 'genesis')
const signAndBroadcast = (tx) => brambl.utils.transactions.signAndBroadcast(bramblLayer, keyMan, tx)

const createParams = {
    issuer: keyMan.pk,
    assetCode: "test-" + Date.now(),
    recipient: keyMan.pk,
    amount: 1,
    fee: 0
};

bramblLayer.createAssetsPrototype(createParams)
    .then(res => signAndBroadcast(res.result))
    .then(res => console.log(res))