const brambljs = new BramblJS({
    Requests: {
        url: 'https://valhalla.torus.topl.co/',
        apiKey: 'Ku6v7NUyFFFkhqN5',
    },
    KeyManager: {
        password: 'password',
        //keyPath: './keystore/itGuy.json'
    },
});

const createParams = {
    issuer: brambljs.keyManager.pk,
    assetCode: 'test-' + Date.now(),
    recipient: brambljs.keyManager.pk,
    amount: 1,
    fee: 1,
};
brambljs.transaction('createAssetsPrototype', createParams).then((response) => {
    console.log(response);
});
