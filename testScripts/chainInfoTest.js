require('dotenv').config()
const loki = require('../index')

loki.Requests("https://valhalla.torus.topl.co:9585/", process.env.VALHALLA_KEY)
    .chainInfo()
    .then(x => {
        const timestamp = new Date(x.result.bestBlock.timestamp)
        const blockHeight = x.result.height
        console.log('Block #' + blockHeight + ' forged at ' + timestamp)
    })