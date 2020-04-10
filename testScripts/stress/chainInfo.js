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

var reqId = 0;
const intID = setInterval( () => {
    const runner = id => {
        return loki.requests.chainInfo(id.toString()).catch(e => {console.log(id); console.error(e)})
    }
    runner(++reqId)
}, 100)


setTimeout(() => clearInterval(intID), 10*60*1000)