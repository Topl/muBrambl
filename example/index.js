let brambl = BramblJS.KeyManager({
    password: 'foo',
});
let importBrambl = BramblJS.KeyManager({
    password: 'foo',
    mnemonic: brambl.mnemonic,
});

console.log('|||||||||||||||||||MNEMONIC IMPORT TEST|||||||||||||||||||');
console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
console.log(brambl);
console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
console.log(importBrambl);
console.log('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
