require('dotenv').config()
const LokiJS = require('../../../index')

const loki = new LokiJS({
    // Requests: {
    //     url: 'https://valhalla.torus.topl.co/',
    //     apiKey: process.env.VALHALLA_KEY
    // },
    KeyManager: {
        password: 'newKey'
    }
})

interval = 60; //ms
timeout = 60*1000; //ms

var reqId = 0;
const startTime = Date.now();
const runner = id => {
    return loki.requests.chainInfo(id.toString()).catch(e => {console.log(id); console.error(e)})
}

const intID = setInterval(() => runner(++reqId), interval)
setTimeout(() => {
    clearInterval(intID)
    const execTime = Date.now() - startTime
    console.log('Time (ms) to resolve all requests: ' + execTime)
}, timeout)