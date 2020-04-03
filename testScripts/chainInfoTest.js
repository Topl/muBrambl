require('dotenv')
const loki = require('../index')

const lokiLayer = new loki.Requests("https://valhalla.torus.topl.co:9585/", process.env.VALHALLA_KEY)
lokiLayer.chainInfo().then(x => {
    const timestamp = new Date(x.result.bestBlock.timestamp)
    const blockHeight = x.result.height
    console.log(blockHeight + ' forged at ' + timestamp)
})