const assert =  require('assert')
const LokiJS = require('./../../src/Requests')

describe('Keyfile', () => {

    before(() => {
        lokijs = new LokiJS()
    })

    it('should return a list of open keyfiles', (done) => {
        lokijs.getOpenKeyfiles()
            .then((response) => {
                console.log(response)
                const res = JSON.parse(response)
                assert.equal(typeof res.result, 'object')
                done()
            })
            .catch((error) => {
                console.log(error)
            })
    })

    it('should return a newly generated keyfile', (done) => {
        lokijs.generateKeyfile("password")
            .then((response) => {
                console.log(response)
                const res = JSON.parse(response)
                assert.equal(typeof res.result, 'object')
                done()
            })
            .catch((error) => {
                console.log(error)
            })
    })
})