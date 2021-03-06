interface KeyManager {
    [x: string]: any;
    keyStore: any;
    password: any;
    constants: string;
    instance: any;
    mnemonic: any;
}

interface Requests {
    url: string;
    apiKey: string;
    instance: any;
}
export interface Params {
    KeyManager: KeyManager;
    Requests: Requests;
}
export interface PrototypeTx {
    formattedTx: any;
    messageToSign: string;
}
export interface Options {
    interval: number;
    timeout: number;
    maxFailedQueries: number;
}
export interface Key {
    pk: string;
    sign: (txBytes: any) => any;
}
