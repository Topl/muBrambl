const BramblJS = require('../dist');
// const brambl = new BramblJS({
//     KeyManager: {
//         password: 'password',
//         keyStore: {
//             publicKeyId: 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM',
//             crypto: {
//                 cipher: 'aes-256-ctr',
//                 cipherText: 'CP5EKt792bPgijmZ129nnVsi3LwL1rN98aNmexATTGx2',
//                 cipherParams: { iv: 'QetaiStk9HwfkJAf6zmuQb' },
//                 mac: '71DqsZdGTaS7kNPWDEFUg4XScDxVULzEFkHxhdMYeo8Q',
//                 kdf: 'scrypt',
//                 kdsfSalt: 'FoxVcL6TJnU8RMW8W8vacdhjS5RdvcqvmzvjtsunVQeN',
//             },
//         },
//     },
// });
const brambljs = new BramblJS({
    KeyManager: {
        password: 'genesis',
        keyStore: {
            crypto: {
                mac: 't8VMxRK8adtDERfsmvhXLWqtibYYTKffbUHJH9B8dDp',
                kdf: 'scrypt',
                cipherText: '6VZBEcMN2ui6GHyLck3tfDoDtAuCxYvdh99pEoDVU7SR',
                kdsfSalt: '3gETzze8KyUXng8eg5vNMdQMCPoBKr6AnJJzty19Pi3e',
                cipher: 'aes-256-ctr',
                cipherParams: {
                    iv: 'BUvtCTrLvBWzcJ6Q5fGLFQ',
                },
            },
            publicKeyId: '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ',
        },
    },
});

// console.log(brambljs);
const createParams = {
    recipient: 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM',
    sender: [brambljs.keyManager.pk],
    amount: 1,
    fee: 1,
};
const param = {
    issuer: '6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ',
    recipient: 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM',
    amount: 1,
    assetCode: 'test',
    fee: 1,
};
brambljs.transaction('transferArbitsPrototype', createParams).then(console.log);
// brambljs.transaction('createAssetsPrototype', param).then(console.log);
// brambljs.transaction('transferPolysPrototype', createParams).then(console.log);
brambljs.requests
    .getBalancesByKey({
        publicKeys: ['6sYyiTguyQ455w2dGEaNbrwkAWAEYV1Zk6FtZMknWDKQ', 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM'],
    })
    .then((res) => console.log(res.result));
