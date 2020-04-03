// Hash an input message and produce an output that matches the output of Bifrost blake2b
const Base58 = require("base-58");
const blake = require("blake2");
const fs = require("fs");

// Based on JCS spec
// https://tools.ietf.org/html/draft-rundgren-json-canonicalization-scheme-17
JSON.canonify = require("canonicalize");

// standard FastCryptographicHash in Bifrost
const hashFunc = () => blake.createHash("blake2b", { digestLength: 32 });

// setup encoding options
const digestAndEncode = (hash, encoding) => {
    hash.end()
    switch (encoding) {
        case "hex":
        case "base64":
            return hash.read().toString(encoding)

        case "base58":
            return Base58.encode(hash.read())
            
        default:
            return hash.read()
    }
}

const any = (message, encoding) => {
    const msg = Buffer.from(JSON.canonify(message))
    const hash = hashFunc().update(msg)
    return digestAndEncode(hash, encoding)
}

const string = (message, encoding) => {
    const msg = Buffer.from(message)
    const hash = hashFunc().update(msg)
    return digestAndEncode(hash, encoding)
}

const file = (filePath, encoding) => {
    return new Promise((resolve, reject) =>
        fs
            .createReadStream(filePath)
            .on("error", reject)
            .pipe(hashFunc())
            .once("finish", function () {
                resolve(digestAndEncode(this, encoding));
            })
    );
};

module.exports = { file, string, any }