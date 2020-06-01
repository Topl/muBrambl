export interface paramsCreate{
    keyBytes: number;
    ivBytes: number;
}
export interface KdfParams{
    n:any;
    r:any;
    p:any;
    dkLen:any;
}
export interface ConstructorParams{
    password:any;
    constants:any;
    constructor:any;
    keyPath:any;
}
export interface KeyObject{
    publicKey:string;
    privateKey:string;

}
export interface Options{
    kdfParams:any
    scrypt:any
    cipher:any
}
interface CipherParams{
    iv: any;
}
interface Crypto{
    kdfSalt:any;
    kdsfSalt:any;
    cipherText:string;
    mac:Uint8Array;
    cipher:Buffer
    cipherParams: CipherParams;
}
export interface KeyStorage{
    crypto: Crypto
}