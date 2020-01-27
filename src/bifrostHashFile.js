// Hash an input message and produce an output that matches the output of Bifrost blake2b
const Base58 = require("base-58");
const blake = require("blake2");
const fs = require("fs");

// TODO: add option to return encoded hash (hex, Base64, or Base58) or the Buffer

module.exports = file => {
  return new Promise((resolve, reject) =>
    fs
      .createReadStream(file)
      .on("error", reject)
      .pipe(blake.createHash("blake2b", { digestLength: 32 }))
      .once("finish", function() {
        this.end();
        resolve(Base58.encode(this.read()));
      })
  );
};
