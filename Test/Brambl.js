// require('dotenv').config()
// const BramblJS = require('../index')
// const assert = require("assert")



// const brambljs = new BramblJS({
//     Requests: {
//         url: 'https://valhalla.torus.topl.co/',
//         apiKey: process.env.VALHALLA_KEY
//     },
//     KeyManager: {
//         password: 'password',
//         // keyPath: 'keyfile.json'
//     }
// })


// describe("Requests Module", () => {
//     it("Transaction Test", done =>{
//         const createParams = {
//             issuer: brambljs.keyManager.pk,
//             assetCode: "test-" + Date.now(),
//             recipient: brambljs.keyManager.pk,
//             amount: 1,
//             fee: 0
//         };
//         brambljs.transaction("createAssetPrototype", createParams)
//         .then(response=>{
//             console.log(response)
//         })
//     })
// })