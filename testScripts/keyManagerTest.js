const KeyMan = require('../src/KeyManager'); 
const b58 = require('base-58')

gjal = new KeyMan; 

gjal.generateKey('test'); 
h = gjal.getKeyStorage()
console.log(h)

sig = gjal.sign('this is a msg', Buffer.from)
console.log(sig)

ver = gjal.verify(h.publicKeyId, 'this is a msg', sig)
console.log(ver)

gjal.exportToFile('keystore/')

/////////////////////////
gjak = new KeyMan;

try {
    gjak.sign('this should break')
} catch(err) {
    console.log(err)
}

try {
    gjak.exportToFile('keystore/')
} catch(err) {
    console.log(err)
}

/////////////////////////
gjam = new KeyMan;
gjam.importFromFile('./keystore/testKey.json', 'test')
j = gjam.getKeyStorage();
console.log(j)