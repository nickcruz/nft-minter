import { PublicKey, Transaction } from '@solana/web3.js'

/**
 * From https://docs.phantom.app/resources/sandbox
 */

export type DisplayEncoding = "utf8" | "hex";
export type PhantomEvent = "disconnect" | "connect";
export type PhantomRequestMethod =
    | "connect"
    | "disconnect"
    | "signTransaction"
    | "signAllTransactions"
    | "signMessage";
export interface ConnectOpts {
    onlyIfTrusted: boolean;
}

export interface PhantomProvider {
    publicKey: PublicKey | null;
    isConnected: boolean | null;
    autoApprove: boolean | null;
    signTransaction: (transaction: Transaction) => Promise<Transaction>;
    signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
    signMessage: (
        message: Uint8Array | string,
        display?: DisplayEncoding
    ) => Promise<any>;
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey, autoApprove: boolean }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, handler: (args: any) => void) => void;
    request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}