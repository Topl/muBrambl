const crypto = require('crypto')

const { pk, sk } = crypto.generateKeyPairSync('x25519');