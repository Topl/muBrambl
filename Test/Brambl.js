// require('dotenv').config()
const BramblJS = require('../dist');
// const assert = require("assert")

const brambljs = new BramblJS({
    Requests: {
        url: 'http://localhost:9085/',
        apiKey: 'topl_the_world!',
    },
    KeyManager: {
        password: 'password',
        // keyPath: 'keyfile.json'
    },
});

const createParams = {
    recipient: '22222222222222222222222222222222222222222222',
    sender: [brambljs.keyManager.pk],
    amount: 1,
    fee: 1,
    data: '',
};
console.log(createParams.sender);
brambljs.transaction('transferPolysPrototype', createParams).then(console.log);
// // describe("Transaction Module", () => {
// //     it("Transaction Test", done =>{

// //     })
// // })
