export interface paramsCreate {
  keyBytes: number;
  ivBytes: number;
}
export interface KdfParams {
  n: number;
  r: number;
  p: number;
  dkLen: number;
}
export interface ConstructorParams {
  password: any;
  constants: any;
  constructor: any;
  keyPath: string;
}
export interface KeyObject {
  publicKey: string;
  privateKey: string;
}
export interface Options {
  kdfParams: KdfParams;
  scrypt: any;
  cipher: string;
}
interface CipherParams {
  iv: any;
}
interface Crypto {
  kdfSalt: string;
  kdsfSalt: string;
  cipherText: string;
  mac: Uint8Array;
  cipher: Buffer;
  cipherParams: CipherParams;
}
export interface KeyStorage {
  crypto: Crypto;
}
interface Crypt {
  cipher: string;
  cipherText: any;
  cipherParams: any;
  mac: any;
  kdf: string;
  kdsfSalt: any;
}
export interface DeriveKey {
  publicKeyId: any;
  crypto: Crypt;
}
export interface KeyGen {
  publicKey: Buffer;
  privateKey: Buffer;
  iv: Buffer;
  salt: Buffer;
}
export interface KeyGenBuff {
  publicKey: string;
  privateKey: string;
  iv: string;
  salt: string;
}
