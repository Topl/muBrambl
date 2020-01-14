const assert =  require('assert')
const LokiJS = require('../src/Requests')

describe('Asset', () => {
    it('should create assets', () => {
        lokijs = new LokiJS()

        console.log('before createAssets')

        lokijs.createAssets('6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 10, 'testAssets', 0, '')
            .then((response) => {
                const res = JSON.parse(response)
                assert.equal(typeof res.result, 'object')
            })
            .catch((error) => {
                console.log(error)
            })
    })
})