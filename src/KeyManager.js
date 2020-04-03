/**
 * Create, import, and export Topl Bifrost keys.
 * Also allows for signing of transactions
 * @author James Aman (j.aman@topl.me)
 * 
 * Based on the keythereum library from Jack Peterson
 * https://github.com/Ethereumjs/keythereum
 */

const crypto = require('crypto')
const path = require('path')
const fs = require('fs')

const keccakCreateHash = require('keccak')
const Base58 = require('base-58')
const blake = require('blake2')
const curve25519 = require("curve25519-js");

// function for checking the type input as a callback
function isFunction(f) { return typeof f === "function"; }

// Bifrost restricts the digest length to 32 bytes currently. Node crypto does not
// currently allow me to set a digest length so we are using an external library.
function bifrostBlake2b(buffer) {
    return blake.createHash("blake2b", { digestLength: 32 }).update(buffer).digest();
}

/**
 * Convert a string to a Buffer.  If encoding is not specified, hex-encoding
 * will be used if the input is valid hex.  If the input is valid base64 but
 * not valid hex, base64 will be used.  Otherwise, utf8 will be used.
 * @param {string} str String to be converted.
 * @param {string=} enc Encoding of the input string (optional).
 * @return {buffer} Buffer (bytearray) containing the input data.
 */
function str2buf(str, enc) {
    if (!str || str.constructor !== String) return str;
    return enc ? Buffer.from(str, enc) : Buffer.from(Base58.decode(str))
}

/**
 * Check if the selected cipher is available.
 * @param {string} algo Encryption algorithm.
 * @return {boolean} If available true, otherwise false.
 */
function isCipherAvailable(cipher) {
    return crypto.getCiphers().some(function (name) { return name === cipher; });
}

/**
 * Symmetric private key encryption using secret (derived) key.
 * @param {buffer|string} plaintext Data to be encrypted.
 * @param {buffer|string} key Secret key.
 * @param {buffer|string} iv Initialization vector.
 * @param {string=} algo Encryption algorithm (default: constants.cipher).
 * @return {buffer} Encrypted data.
 */
function encrypt(plaintext, key, iv, algo) {
    if (!isCipherAvailable(algo)) throw new Error(algo + " is not available");
    const cipher = crypto.createCipheriv(algo, str2buf(key), str2buf(iv));
    const ciphertext = cipher.update(str2buf(plaintext));
    return Buffer.concat([ciphertext, cipher.final()]);
}

/**
 * Symmetric private key decryption using secret (derived) key.
 * @param {buffer|string} ciphertext Data to be decrypted.
 * @param {buffer|string} key Secret key.
 * @param {buffer|string} iv Initialization vector.
 * @param {string=} algo Encryption algorithm (default: constants.cipher).
 * @return {buffer} Decrypted data.
 */
function decrypt(ciphertext, key, iv, algo) {
    if (!isCipherAvailable(algo)) throw new Error(algo + " is not available");
    const decipher = crypto.createDecipheriv(algo, str2buf(key), str2buf(iv));
    const plaintext = decipher.update(str2buf(ciphertext));
    return Buffer.concat([plaintext, decipher.final()]);
}

/**
 * Calculate message authentication code from secret (derived) key and
 * encrypted text.  The MAC is the keccak-256 hash of the byte array
 * formed by concatenating the second 16 bytes of the derived key with
 * the ciphertext key's contents.
 * @param {buffer|string} derivedKey Secret key derived from password.
 * @param {buffer|string} ciphertext Text encrypted with secret key.
 * @return {string} Base58-encoded MAC.
 */
function getMAC(derivedKey, ciphertext) {
    const keccak256 = (msg) => keccakCreateHash('keccak256').update(msg).digest()
    if (derivedKey !== undefined && derivedKey !== null && ciphertext !== undefined && ciphertext !== null) {
        return keccak256(Buffer.concat([
            str2buf(derivedKey).slice(16, 32),
            str2buf(ciphertext)
        ]));
    }
}

/**
 * Generate random numbers for private key, initialization vector,
 * and salt (for key derivation).
 * @param {Object} params Encryption options.
 * @param {string} params.keyBytes Private key size in bytes.
 * @param {string} params.ivBytes Initialization vector size in bytes.
 * @param {function=} cb Callback function (optional).
 * @return {Object} Keys, IV and salt.
 */
function create(params, cb) {
    const keyBytes = params.keyBytes
    const ivBytes = params.ivBytes

    function curve25519KeyGen(randomBytes) {
        const { public, private } = curve25519.generateKeyPair(bifrostBlake2b(randomBytes));
        return {
            publicKey: Buffer.from(public),
            privateKey: Buffer.from(private),
            iv: bifrostBlake2b(crypto.randomBytes(keyBytes + ivBytes + keyBytes)).slice(0, ivBytes),
            salt: bifrostBlake2b(crypto.randomBytes(keyBytes + ivBytes))
        };
    }

    // synchronous key generation if callback not provided
    if (!isFunction(cb)) {
        return curve25519KeyGen(crypto.randomBytes(keyBytes + ivBytes + keyBytes));
    }

    // asynchronous key generation
    crypto.randomBytes(keyBytes + ivBytes + keyBytes, function (randomBytes) {
        cb(curve25519KeyGen(randomBytes));
    });
}

/**
 * Derive secret key from password with key derivation function.
 * @param {string|buffer} password User-supplied password.
 * @param {string|buffer} salt Randomly generated salt.
 * @return {buffer} Secret key derived from password.
 */
function deriveKey(password, salt, kdfParams, cb) {
    if (typeof password === "undefined" || password === null || !salt) {
        throw new Error("Must provide password and salt to derive a key");
    }

    // convert strings to buffers
    password = str2buf(password, "utf8");
    salt = str2buf(salt);

    // get scrypt parameters
    const dkLen = kdfParams.dkLen
    const N = kdfParams.n
    const r = kdfParams.r
    const p = kdfParams.p
    const maxmem = 2 * 128 * N * r

    // use scrypt as key derivation function
    if (!isFunction(cb)) {
        return crypto.scryptSync(password, salt, dkLen, { N, r, p, maxmem })
    }

    // asynchronous key generation
    cb(crypto.scryptSync(password, salt, dkLen, { N, r, p, maxmem }));
}

/**
 * Assemble key data object in secret-storage format.
 * @param {buffer} derivedKey Password-derived secret key.
 * @param {Object} keyObject Object containing the raw public / private keypair 
 * @param {buffer} salt Randomly generated salt.
 * @param {buffer} iv Initialization vector.
 * @param {buffer} algo encryption algorithm to be used
 * @return {Object} key data object in secret-storage format
 */
function marshal(derivedKey, keyObject, salt, iv, algo) {
    // encrypt using last 16 bytes of derived key (this matches Bifrost)
    const ciphertext = encrypt(keyObject.privateKey, derivedKey, iv, algo);

    const keyStorage = {
        publicKeyId: Base58.encode(keyObject.publicKey),
        crypto: {
            cipher: algo,
            cipherText: Base58.encode(ciphertext),
            cipherParams: { iv: Base58.encode(iv) },
            mac: Base58.encode(getMAC(derivedKey, ciphertext))
        },
    };

    keyStorage.crypto.kdf = "scrypt";
    keyStorage.crypto.kdfSalt = Base58.encode(salt)

    return keyStorage;
}

/**
 * Export private key to keystore secret-storage format.
 * @param {string|buffer} password User-supplied password.
 * @param {Object} keyObject Object containing the raw public / private keypair 
 * @param {buffer} algo encryption algorithm to be used
 * @param {function=} cb Callback function (optional).
 * @return {Object} keyStorage for use with exportToFile
 */
function dump(password, keyObject, options, cb) {
    const kdfParams = options.kdfParams || options.scrypt
    const iv = str2buf(keyObject.iv);
    const salt = str2buf(keyObject.salt);
    const privateKey = str2buf(keyObject.privateKey);
    const publicKey = str2buf(keyObject.publicKey);

    // synchronous if no callback provided
    if (!isFunction(cb)) {
        return marshal(deriveKey(password, salt, kdfParams), { privateKey, publicKey }, salt, iv, options.cipher);
    }

    // asynchronous if callback provided
    deriveKey(password, salt, function (derivedKey) {
        cb(marshal(derivedKey, privateKey, salt, iv, options.cipher));
    }.bind(this));
}

/**
 * Recover plaintext private key from secret-storage key object.
 * @param {Object} keyStorage Keystore object.
 * @param {function=} cb Callback function (optional).
 * @param {Object} kdfParams 
 * @return {buffer} Plaintext private key.
 */
function recover(password, keyStorage, kdfParams, cb) {
    // verify that message authentication codes match, then decrypt
    function verifyAndDecrypt(derivedKey, iv, ciphertext, mac, algo) {
        if (!getMAC(derivedKey, ciphertext).equals(mac)) {
            throw new Error("message authentication code mismatch");
        }
        return decrypt(ciphertext, derivedKey, iv, algo);
    }

    const iv = str2buf(keyStorage.crypto.cipherParams.iv);
    const salt = str2buf(keyStorage.crypto.kdfSalt);
    const ciphertext = str2buf(keyStorage.crypto.cipherText);
    const mac = str2buf(keyStorage.crypto.mac);
    const algo = keyStorage.crypto.cipher;

    // derive secret key from password
    if (!isFunction(cb)) {
        return verifyAndDecrypt(deriveKey(password, salt, kdfParams), iv, ciphertext, mac, algo);
    }

    deriveKey(password, salt, kdfParams, derivedKey => {
        cb(verifyAndDecrypt(derivedKey, iv, ciphertext, mac, algo));
    });
}

/**
 * Generate filename for a keystore file.
 * @param {string} publicKeyId Topl address.
 * @return {string} Keystore filename.
 */
function generateKeystoreFilename(publicKey) {
    if (typeof publicKey !== 'string') throw new Error('PublicKey must be given as a string for the filename')
    let filename = new Date().toISOString() + "-" + publicKey + ".json";

    return filename.split(":").join("-");
}

/**
 * Check that a keyStorage object exists for the class
 * @param {object} keyStorage The keyStorage from the class
 * @return {object} 
 */
function isKeyInitialized(pk) {
    if (!pk) throw new Error('A key must be initialized before using this key manager')
    return true
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///// Key Manager Class //////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Default options for key generation as of 2020.01.25  
const defaultOptions = {
    // Symmetric cipher for private key encryption
    //--- anything from crypto.getCiphers() is eligible
    cipher: "aes-256-ctr",

    // Initialization vector size in bytes
    ivBytes: 16,

    // Private key size in bytes
    keyBytes: 32,

    // Key derivation function parameters
    scrypt: {
        dkLen: 32,
        n: Math.pow(2, 18), // cost (as given in bifrost)
        r: 8,        // blocksize
        p: 1         // parallelization
    }
}

/**
 * The Key management interface object.
 * 
 * @param {object} [constants] default encryption options for storing keyfiles
 */
class KeyManager {
    #sk;
    #password;

    constructor (constants) {
        this.constants = constants || defaultOptions 
        this.pk = null;
        this.isLocked = false;
        this.#sk = {};
        this.#password = null;
    }

    /**
     * Initialize a key manager object with a key storage object
     * @param {Object} keyStorage Keystore object (encrypted key file)
     * @param {string} password encryption password for accessing the keystorage object
     */
    initKeyStorage(keyStorage, password) {
        this.pk = keyStorage.publicKeyId;
        this.isLocked = false
        this.#sk = keyStorage.crypto;
        this.#password = password;
    };

    /**
     * Set the key manager to locked so that the private key may not be decrypted
     */
    lockKey() {
        this.isLocked = true;
    }

    /**
     * Unlock the key manager to be used in transactions
     * @param {string} _password encryption password for accessing the keystorage object
     */
    unlockKey(_password) {
        if (!this.isLocked) throw new Error('The key is already unlocked')
        if (_password !== this.#password) throw new Error('Invalid password')
        this.isLocked = false;
    }

    /**
     * Getter function to retrieve key storage in the Bifrost compatible format
     */
    _getKeyStorage() {
        if (isKeyInitialized(this.pk)) return { publicKeyId: this.pk, crypto: this.#sk }
    }

    /**
     * Getter function to retrieve private passwrod variable for decrypting the key storage object
     * @return {string} the saved password
     */
    _getPassword() {
        if (this.isLocked) {
            throw new Error('Key manager is currently locked. Please unlock and try again.')
        }
        return this.#password
    }
};

/** 
 * Generate a new keyfile and encrypt it using the given password
 * @param {string=} password Encryption password
 * @param {object?} [params] key creation parameters
 * @return {Object} keyStorage for use with exportToFile
 */
KeyManager.prototype.generateKey = function (password) {
    if (!password) throw new Error('An encryption password must be provided to secure your key')
    this.initKeyStorage(dump(password, create(this.constants), this.constants), password)
}

/**
 * Generate the signature of a message using the provided private key
 * @param {string=} message Message to sign
 * @param {function=} cb Callback function (optional).
 * @return {buffer=} signature 
 */
KeyManager.prototype.sign = function (message, cb) {
    const kdfParams = this.constants.scrypt
    const keyStorage = this._getKeyStorage()
    const password = this._getPassword()

    function curve25519sign(privateKey, message) {
        return curve25519.sign(str2buf(privateKey), str2buf(message, 'utf8'), crypto.randomBytes(64))
    }

    // synchronous key generation if callback not provided
    if (!isFunction(cb)) {
        return curve25519sign(recover(password, keyStorage, kdfParams), message);
    }

    // asynchronous
    let sig = {}
    recover(password, keyStorage, kdfParams, sk => { sig = cb(curve25519sign(sk, message)) });
    return sig
}

/**
 * Check whether a private key was used to generate the 
 * @param {buffer=} publicKey A public key
 * @param {string=} message Message to sign
 * @param {buffer=} signature 
 * @param {function=} cb Callback function (optional).
 * @return {boolean=} 
 */
KeyManager.prototype.verify = function (publicKey, message, signature, cb) {
    const pk = str2buf(publicKey)
    const msg = str2buf(message, 'utf8')
    const sig = str2buf(signature)

    // synchronous key generation if callback not provided
    if (!isFunction(cb)) {
        return curve25519.verify(pk, msg, sig);
    }

    // asynchronous
    cb(curve25519.verify(pk, msg, sug));
}

/**
 * Export formatted JSON to keystore file.
 * @param {Object} keyStorage Keystore object.
 * @param {string=} keystore Path to keystore folder (default: "keystore").
 * @return {string} JSON filename 
 */
KeyManager.prototype.exportToFile = function (_keyPath) {
    const keyPath = _keyPath || "keyfiles";
    const keyStorage = this._getKeyStorage();

    outfile = generateKeystoreFilename(keyStorage.publicKeyId);
    json = JSON.stringify(keyStorage);
    outpath = path.join(keyPath, outfile);

    fs.writeFileSync(outpath, json);
    return outpath;
}

/**
 * Import key data object from keystore JSON file.
 * (Note: Node.js only!)
 * @param {string} filepath path to stored keyfile
 * @return {Object} Keystore data file's contents.
 */
KeyManager.prototype.importFromFile = function (filepath, password) {
    const keyStorage = JSON.parse(fs.readFileSync(filepath));
    this.initKeyStorage(keyStorage, password)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = KeyManager;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////