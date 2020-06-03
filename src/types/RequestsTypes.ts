export interface RoutInfo {
    route:string;
    method:string;
    id:string
}
export interface Self{
    headers:any;
    url:string;
}
export interface BalancesParams{
    publicKeys:Array<any>;
    password:string;
}
export interface Params{
    publicKey:string;
    password:string;
}
export interface TxParams{
    publicKey:string;
    password:string;
    tx:string;
}
export interface TransferArbitParams{
    recipient:string
    amount:number
    fee:number

}
export  interface txParams2 {
    tx:any
  }
export interface TransferParams{
    recipient:string
    amount:number
    fee:number
    issuer:string
    assetCode:string
}
export interface TransferAssetsParams{
    recipient:string
    amount:number
    fee:number
    issuer:string
    assetCode:string
    sender:Array<any>;
}
export interface TransferTargetAssetsParams{
    recipient:string
    fee:number
    assetId:string
    amount:number
}
export interface TransferTargetAssetsPrototypeParams{
    recipient:string
    fee:number
    assetId:string
    amount:number
    sender:Array<any>;

}
export interface getTransactionById{
    transactionId: string
}
export interface GetBlockById{
    blockId: string
}
export interface CalcDelay{
    blockId: string;
    numBlocks:number
}