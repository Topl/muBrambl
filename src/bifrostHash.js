// Hash an input message and produce an output that matches the output of Bifrost blake2b
const Base58 = require("base-58");
const blake = require("blake2");

JSON.canonify = require("canonicalize");

// TODO: add option to return encoded hash (hex, Base64, or Base58) or the Buffer

module.exports = message =>
  Base58.encode(
    blake
      .createHash("blake2b", { digestLength: 32 })
      .update(
        Buffer.from(
          typeof message === "string" ? message : JSON.canonify(message)
        )
      )
      .digest()
  );
