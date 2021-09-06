import React, { useEffect, useState } from 'react'
import { PhantomProvider } from '../wallet/Phantom';
import styles from '../styles/Wallet.module.css'

const getPhantomProvider = (): PhantomProvider | undefined => {
    if (typeof window !== "undefined") {
        if ("solana" in window) {
            const provider = (window as any).solana;
            if (provider.isPhantom) {
                return provider;
            }
        }
        window.open("https://phantom.app/", "_blank");
    }
    return undefined
};

export const Wallet = () => {
    const provider = getPhantomProvider()

    const [address, setAddress] = useState("")

    useEffect(() => {
        if (provider !== undefined) {
            // provider.connect({ onlyIfTrusted: true })
            provider.on("connect", () => {
                const walletAddress = provider.publicKey?.toBase58()?.toString() ?? ""
                console.log("Connected to wallet " + walletAddress)
                setAddress(walletAddress)
            });
            provider.on("disconnect", () => {
                console.log("Disconnected from wallet")
            });
            try {
                provider.connect({ onlyIfTrusted: true })
            } catch (err) {
                console.warn(err)
            }
            return () => {
                provider.disconnect()
            }
        }
    }, [provider])

    if (address.length > 0) {
        return (<div className={styles.walletstatus}>{address.substr(0, 4)}...{address.substr(-4, address.length)}</div>)
    }

    return <button className={`${styles.connectwallet} ${styles.walletstatus}`} onClick={async () => {
        try {
            const res = await provider?.connect();
            console.log(JSON.stringify(res));
        } catch (err) {
            console.warn(err);
            console.log("Error: " + JSON.stringify(err));
        }
    }}>Connect wallet</button>
}