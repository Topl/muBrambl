
const assert =  require('assert')
const LokiJS = require('./../../src/Requests')

describe('Arbit', () => {

    before(() => {
        lokijs = new LokiJS()
    })

    it('should transfer arbits', (done) => {
        lokijs.transferArbits('A9vRt6hw7w4c7b4qEkQHYptpqBGpKM5MGoXyrkGCbrfb', ['6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ'], 1, 0, '')
            .then((response) => {
                console.log(response)
                assert.equal(typeof response.result, 'object')
                done()
            })
            .catch((error) => {
                console.log(error)
            })
    })
})