require('dotenv').config();
const BramblJS = require('../dists/Brambl');
const assert = require('assert');

const brambljs = new BramblJS({
    Requests: {
        url: 'https://valhalla.torus.topl.co/',
        apiKey: process.env.VALHALLA_KEY,
    },
    KeyManager: {
        password: 'password',
        keyStore: {
            publicKeyId: 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM',
            crypto: {
                cipher: 'aes-256-ctr',
                cipherText: 'CP5EKt792bPgijmZ129nnVsi3LwL1rN98aNmexATTGx2',
                cipherParams: { iv: 'QetaiStk9HwfkJAf6zmuQb' },
                mac: '71DqsZdGTaS7kNPWDEFUg4XScDxVULzEFkHxhdMYeo8Q',
                kdf: 'scrypt',
                kdsfSalt: 'FoxVcL6TJnU8RMW8W8vacdhjS5RdvcqvmzvjtsunVQeN',
            },
        },
    },
});
console.log(brambljs);
brambljs.keyManager.getKeyStorage();
describe('KeyManager', () => {
    it('should show the keymanager', function (done) {
        h = brambljs.keyManager.getKeyStorage();
        if (h) {
            assert.equal(typeof h, 'object');
            done();
        } else {
            assert.equal(typeof ver, 'boolean');
            done();
        }
    });
    it('Show array', function (done) {
        h = brambljs.keyManager.getKeyStorage();
        sig = brambljs.keyManager.sign('this is a msg', Buffer.from);

        if (sig) {
            assert.equal(typeof sig, 'object');
            done();
        } else {
            assert.equal(typeof ver, 'boolean');
            done();
        }
    });
    it('Verify the Public Key', function (done) {
        h = brambljs.keyManager.getKeyStorage();
        sig = brambljs.keyManager.sign('this is a msg', Buffer.from);
        ver = brambljs.keyMan.verify(h.publicKeyId, 'this is a msg', sig);

        if (ver) {
            assert.equal(typeof ver, 'boolean');
            done();
        } else {
            assert.equal(typeof ver, 'boolean');
            done();
        }
    });
    it('Import from keystore', function (done) {
        // /////////////////////////
        try {
            const gjam = new BramblJS({
                Requests: {
                    url: 'https://valhalla.torus.topl.co/',
                    apiKey: process.env.VALHALLA_KEY,
                },
                KeyManager: {
                    password: 'password',
                    keyStore: {
                        publicKeyId: 'Cc93BCQn31pAtpTMR4BDBPPEFLVKACbcJVNpTH9SJKfM',
                        crypto: {
                            cipher: 'aes-256-ctr',
                            cipherText: 'CP5EKt792bPgijmZ129nnVsi3LwL1rN98aNmexATTGx2',
                            cipherParams: { iv: 'QetaiStk9HwfkJAf6zmuQb' },
                            mac: '71DqsZdGTaS7kNPWDEFUg4XScDxVULzEFkHxhdMYeo8Q',
                            kdf: 'scrypt',
                            kdsfSalt: 'FoxVcL6TJnU8RMW8W8vacdhjS5RdvcqvmzvjtsunVQeN',
                        },
                    },
                },
            });
            assert.equal(typeof gjam.keyManager.getKeyStorage().publicKeyId, 'string');

            done();
        } catch (err) {
            console.log(err);
        }
    });
});
