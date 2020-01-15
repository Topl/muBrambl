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
                assert.equal(typeof response.result, 'object')
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
                assert.equal(typeof response.result, 'object')
                done()
            })
            .catch((error) => {
                console.log(error)
            })
    })

    it('should return a successfully locked keyfile', (done) => {
        lokijs.lockKeyfile('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 'genesis')
            .then((response) => {
                console.log(response)
                assert.equal(typeof response.result, 'object')
                done()
            })
            .catch((error) => {
                console.log(error)
            })
    })

    it('should return a successfully unlocked keyfile', (done) => {
        lokijs.unlockKeyfile('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 'genesis')
            .then((response) => {
                assert.equal(typeof response.result, 'object')
                done()
            })
            .catch((error) => {
                console.log(error)
            })
    })
})