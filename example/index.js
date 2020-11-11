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
let brambljs = new BramblJS({
    Requests: {
        url: 'https://valhalla.torus.topl.co/',
        apiKey: 'Ku6v7NUyFFFkhqN5',
    },
    KeyManager: {
        password: 'password',
        // keyPath: 'keyfile.json'
        mnemonic: 'style shove crisp family hand depend diagram end august blur lens ticket gasp beyond token',
    },
});
let brambl = BramblJS.KeyManager({
    password: 'password',
    mnemonic: 'style shove crisp family hand depend diagram end august blur lens ticket gasp beyond token',
});
