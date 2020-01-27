/**
 * Create, import, and export Topl Bifrost keys.
 * @author James Aman (j.aman@topl.me)
 * 
 * Based on the keythereum library from Jack Peterson
 * https://github.com/Topljs/keythereum
 */

const crypto = require('crypto')
const blake = require('blake2')
const keccak256 = require('keccak256')
const Base58 = require('base-58')
const path = require('path')
const fs = require('fs')

// would like to move away from this eventually but NodeJS Crypto
// doesn't let me define my own format so the key output. We might
// eventually move to a standard encrypted encoding of the keyfile (like PEM)
// but this will require us to change how Bifrost handles keys
const curve25519 = require("curve25519-js");


function isFunction(f) {
    return typeof f === "function";
}

// Bifrost restricts the digest length to 32 bytes currently. Node crypto does not
// currently allow me to set a digest length so we are using an external library.
function bifrostBlake2b(buffer) {
    return blake.createHash("blake2b", { digestLength: 32 }).update(buffer).digest();
}

module.exports = {
    // Default options for key generation as of 2020.01.25
    constants: {

        // Symmetric cipher for private key encryption
        //--- anything from crypto.getCiphers() is eligible
        cipher: "aes-256-ctr",

        // Initialization vector size in bytes
        ivBytes: 16,

        // Private key size in bytes
        keyBytes: 32,

        // Key derivation function parameters
        scrypt: {
            dklen: 32,
            n: Math.pow(2,18), // cost (as given in bifrost)
            r: 8,        // blocksize
            p: 1         // parallelization
        }
    },

    /**
     * Check whether a string is valid hex.
     * @param {string} str String to validate.
     * @return {boolean} True if the string is valid hex, false otherwise.
     */
    isHex: function (str) {
        if (str.length % 2 === 0 && str.match(/^[0-9a-f]+$/i)) return true;
        return false;
    },

    /**
     * Check whether a string is valid base-64.
     * @param {string} str String to validate.
     * @return {boolean} True if the string is valid base-64, false otherwise.
     */
    isBase64: function (str) {
        let index;
        if (str.length % 4 > 0 || str.match(/[^0-9a-z+\/=]/i)) return false;
        index = str.indexOf("=");
        if (index === -1 || str.slice(index).match(/={1,2}/)) return true;
        return false;
    },

    /**
     * Convert a string to a Buffer.  If encoding is not specified, hex-encoding
     * will be used if the input is valid hex.  If the input is valid base64 but
     * not valid hex, base64 will be used.  Otherwise, utf8 will be used.
     * @param {string} str String to be converted.
     * @param {string=} enc Encoding of the input string (optional).
     * @return {buffer} Buffer (bytearray) containing the input data.
     */
    str2buf: function (str, enc) {
        if (!str || str.constructor !== String) return str;
        // if (!enc && this.isHex(str)) enc = "hex";
        // if (!enc && this.isBase64(str)) enc = "base64";
        // our keys are Base-58 encoded for now so default to that
        return enc ? Buffer.from(str, enc) : Buffer.from(Base58.decode(str))
    },

    /**
     * Check if the selected cipher is available.
     * @param {string} algo Encryption algorithm.
     * @return {boolean} If available true, otherwise false.
     */
    isCipherAvailable: function (cipher) {
        return crypto.getCiphers().some(function (name) { return name === cipher; });
    },

    /**
     * Symmetric private key encryption using secret (derived) key.
     * @param {buffer|string} plaintext Data to be encrypted.
     * @param {buffer|string} key Secret key.
     * @param {buffer|string} iv Initialization vector.
     * @param {string=} algo Encryption algorithm (default: constants.cipher).
     * @return {buffer} Encrypted data.
     */
    encrypt: function (plaintext, key, iv, algo) {
        let cipher, ciphertext;
        algo = algo || this.constants.cipher;
        if (!this.isCipherAvailable(algo)) throw new Error(algo + " is not available");
        cipher = crypto.createCipheriv(algo, this.str2buf(key), this.str2buf(iv));
        ciphertext = cipher.update(this.str2buf(plaintext));
        return Buffer.concat([ciphertext, cipher.final()]);
    },

    /**
     * Symmetric private key decryption using secret (derived) key.
     * @param {buffer|string} ciphertext Data to be decrypted.
     * @param {buffer|string} key Secret key.
     * @param {buffer|string} iv Initialization vector.
     * @param {string=} algo Encryption algorithm (default: constants.cipher).
     * @return {buffer} Decrypted data.
     */
    decrypt: function (ciphertext, key, iv, algo) {
        let decipher, plaintext;
        algo = algo || this.constants.cipher;
        if (!this.isCipherAvailable(algo)) throw new Error(algo + " is not available");
        decipher = crypto.createDecipheriv(algo, this.str2buf(key), this.str2buf(iv));
        plaintext = decipher.update(this.str2buf(ciphertext));
        return Buffer.concat([plaintext, decipher.final()]);
    },

    /**
     * Calculate message authentication code from secret (derived) key and
     * encrypted text.  The MAC is the keccak-256 hash of the byte array
     * formed by concatenating the second 16 bytes of the derived key with
     * the ciphertext key's contents.
     * @param {buffer|string} derivedKey Secret key derived from password.
     * @param {buffer|string} ciphertext Text encrypted with secret key.
     * @return {string} Base58-encoded MAC.
     */
    getMAC: function (derivedKey, ciphertext) {
        if (derivedKey !== undefined && derivedKey !== null && ciphertext !== undefined && ciphertext !== null) {
            return keccak256(Buffer.concat([
                this.str2buf(derivedKey).slice(16, 32),
                this.str2buf(ciphertext)
            ]));
        }
    },

    /**
     * Derive secret key from password with key derivation function.
     * @param {string|buffer} password User-supplied password.
     * @param {string|buffer} salt Randomly generated salt.
     * @param {Object=} options Encryption parameters.
     * @param {string=} options.kdf Key derivation function (default: scrypt).
     * @param {string=} options.cipher Symmetric cipher (default: constants.cipher).
     * @param {Object=} options.kdfparams KDF parameters (default: constants.<kdf>).
     * @param {function=} cb Callback function (optional).
     * @return {buffer} Secret key derived from password.
     */
    deriveKey: function (password, salt, options, cb) {
        if (typeof password === "undefined" || password === null || !salt) {
            throw new Error("Must provide password and salt to derive a key");
        }
        options = options || {};
        options.kdfparams = options.kdfparams || {};

        // convert strings to buffers
        password = this.str2buf(password, "utf8");
        salt = this.str2buf(salt);

        // get scrypt parameters
        N = options.kdfparams.n || this.constants.scrypt.n
        r = options.kdfparams.r || this.constants.scrypt.r
        p = options.kdfparams.p || this.constants.scrypt.p
        maxmem = 2 * 128 * N * r

        // use scrypt as key derivation function
        // synchronous key generation if callback not provided
        if (!isFunction(cb)) {
            return crypto.scryptSync(password, salt, this.constants.scrypt.dklen, {N, r, p, maxmem})
        }

        // asynchronous key generation
        cb(function (err, deriveKey) {
            if (err) return cb(err);
            crypto.scrypt(password, salt, this.constants.scrypt.dklen, {N, r, p, maxmem})
        });
    },

    /**
     * Generate random numbers for private key, initialization vector,
     * and salt (for key derivation).
     * @param {Object=} params Encryption options (defaults: constants).
     * @param {string=} params.keyBytes Private key size in bytes.
     * @param {string=} params.ivBytes Initialization vector size in bytes.
     * @param {function=} cb Callback function (optional).
     * @return {Object<string,buffer>} Keys, IV and salt.
     */
    create: function (params, cb) {
        let keyBytes, ivBytes
        params = params || {};
        keyBytes = params.keyBytes || this.constants.keyBytes;
        ivBytes = params.ivBytes || this.constants.ivBytes;

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
        crypto.randomBytes(keyBytes + ivBytes + keyBytes, function (err, randomBytes) {
            if (err) return cb(err);
            cb(curve25519KeyGen(randomBytes));
        });
    },

    /**
     * Assemble key data object in secret-storage format.
     * @param {buffer} derivedKey Password-derived secret key.
     * @param {Object} keyObject Object containing the raw public / private keypair 
     * @param {buffer} salt Randomly generated salt.
     * @param {buffer} iv Initialization vector.
     * @param {Object=} options Encryption parameters.
     * @param {string=} options.kdf Key derivation function (default: scrypt).
     * @param {string=} options.cipher Symmetric cipher (default: constants.cipher).
     * @param {Object=} options.kdfparams KDF parameters (default: constants.<kdf>).
     * @return {Object} key data object in secret-storage format
     */
    marshal: function (derivedKey, keyObject, salt, iv, options) {
        let ciphertext, keyStorage, algo;
        options = options || {};
        options.kdfparams = options.kdfparams || {};
        algo = options.cipher || this.constants.cipher;

        // encrypt using last 16 bytes of derived key (this matches Bifrost)
        ciphertext = this.encrypt(keyObject.privateKey, derivedKey, iv, algo);

        keyStorage = {
            publicKeyId: Base58.encode(keyObject.publicKey),
            crypto: {
                cipher: options.cipher || this.constants.cipher,
                cipherText: Base58.encode(ciphertext),
                cipherParams: { iv: Base58.encode(iv) },
                mac: Base58.encode(this.getMAC(derivedKey, ciphertext))
            },
        };

        keyStorage.crypto.kdf = "scrypt";
        keyStorage.crypto.kdfSalt = Base58.encode(salt)

        return keyStorage;
    },

    /**
     * Export private key to keystore secret-storage format.
     * @param {string|buffer} password User-supplied password.
     * @param {Object} keyObject Object containing the raw public / private keypair 
     * @param {string|buffer} salt Randomly generated salt.
     * @param {string|buffer} iv Initialization vector.
     * @param {Object=} options Encryption parameters.
     * @param {string=} options.kdf Key derivation function (default: scrypt).
     * @param {string=} options.cipher Symmetric cipher (default: constants.cipher).
     * @param {Object=} options.kdfparams KDF parameters (default: constants.<kdf>).
     * @param {function=} cb Callback function (optional).
     * @return {Object} keyStorage for use with exportToFile
     */
    dump: function (password, keyObject, options, cb) {
        options = options || {};
        iv = this.str2buf(keyObject.iv);
        salt = this.str2buf(keyObject.salt);
        privateKey = this.str2buf(keyObject.privateKey);
        publicKey = this.str2buf(keyObject.publicKey);

        // synchronous if no callback provided
        if (!isFunction(cb)) {
            return this.marshal(this.deriveKey(password, salt, options), { privateKey, publicKey }, salt, iv, options);
        }

        // asynchronous if callback provided
        this.deriveKey(password, salt, options, function (derivedKey) {
            cb(this.marshal(derivedKey, privateKey, salt, iv, options));
        }.bind(this));
    },

    /**
     * Recover plaintext private key from secret-storage key object.
     * @param {Object} keyStorage Keystore object.
     * @param {function=} cb Callback function (optional).
     * @return {buffer} Plaintext private key.
     */
    recover: function (password, keyStorage, cb) {
        let keyStorageCrypto, iv, salt, ciphertext, algo, self = this;
        keyStorageCrypto = keyStorage.Crypto || keyStorage.crypto;

        // verify that message authentication codes match, then decrypt
        function verifyAndDecrypt(derivedKey, iv, ciphertext, algo) {
            if (!self.getMAC(derivedKey, ciphertext).equals(self.str2buf(keyStorageCrypto.mac))) {
                throw new Error("message authentication code mismatch");
            }
            // What is going on with this line below ?!?
            //key = bifrostBlake2b(derivedKey.slice(0, 16)).slice(0, 16);
            return self.decrypt(ciphertext, derivedKey, iv, algo);
        }

        iv = this.str2buf(keyStorageCrypto.cipherParams.iv);
        salt = this.str2buf(keyStorageCrypto.kdfSalt);
        ciphertext = this.str2buf(keyStorageCrypto.cipherText);
        algo = keyStorageCrypto.cipher;

        // derive secret key from password
        if (!isFunction(cb)) {
            return verifyAndDecrypt(this.deriveKey(password, salt, keyStorageCrypto), iv, ciphertext, algo);
        }
        this.deriveKey(password, salt, keyStorageCrypto, function (derivedKey) {
            try {
                cb(verifyAndDecrypt(derivedKey, salt, iv, ciphertext, algo));
            } catch (exc) {
                cb(exc);
            }
        });
    },

    /**
     * Generate filename for a keystore file.
     * @param {string} publicKeyId Topl address.
     * @return {string} Keystore filename.
     */
    generateKeystoreFilename: function (publicKey) {
        if (typeof publicKey !== 'string') throw new Error('PublicKey must be given as a string for the filename')
        let filename = new Date().toISOString() + "-" + publicKey + ".json";

        return filename.split(":").join("-");
    },

    /**
     * Export formatted JSON to keystore file.
     * @param {Object} keyStorage Keystore object.
     * @param {string=} keystore Path to keystore folder (default: "keystore").
     * @param {function=} cb Callback function (optional).
     * @return {string} JSON filename 
     */
    exportToFile: function (keyStorage, keystore, cb) {
        let outfile, outpath, json;
        keystore = keystore || "keystore";
        outfile = this.generateKeystoreFilename(keyStorage.publicKeyId);
        json = JSON.stringify(keyStorage);
        outpath = path.join(keystore, outfile);
        if (!isFunction(cb)) {
            fs.writeFileSync(outpath, json);
            return outpath;
        }
        fs.writeFile(outpath, json, function (err) {
            if (err) return cb(err);
            cb(outpath);
        });
    },

    /**
     * Import key data object from keystore JSON file.
     * (Note: Node.js only!)
     * @param {string} address Topl address to import.
     * @param {string=} datadir Topl data directory (default: ~/.Topl).
     * @param {function=} cb Callback function (optional).
     * @return {Object} Keystore data file's contents.
     */
    importFromFile: function (address, datadir, cb) {
        let keystore, filepath;
        address = address.toLowerCase();

        function findKeyfile(keystore, address, files) {
            let i, len, filepath = null;
            for (i = 0, len = files.length; i < len; ++i) {
                if (files[i].indexOf(address) > -1) {
                    filepath = path.join(keystore, files[i]);
                    if (fs.lstatSync(filepath).isDirectory()) {
                        filepath = path.join(filepath, files[i]);
                    }
                    break;
                }
            }
            return filepath;
        }

        datadir = datadir || path.join(process.env.HOME, ".Topl");
        keystore = path.join(datadir, "keystore");
        if (!isFunction(cb)) {
            filepath = findKeyfile(keystore, address, fs.readdirSync(keystore));
            if (!filepath) {
                throw new Error("could not find key file for address " + address);
            }
            return JSON.parse(fs.readFileSync(filepath));
        }
        fs.readdir(keystore, function (ex, files) {
            let filepath;
            if (ex) return cb(ex);
            filepath = findKeyfile(keystore, address, files);
            if (!filepath) {
                return cb(new Error("could not find key file for address " + address));
            }
            return cb(JSON.parse(fs.readFileSync(filepath)));
        });
    }

};