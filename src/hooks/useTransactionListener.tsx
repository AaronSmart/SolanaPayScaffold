import { PublicKey } from "@solana/web3.js";
import { useEffect, useRef } from "react";
import { findReference, FindReferenceError } from "@solana/pay";
import { useConnection } from "@solana/wallet-adapter-react";
import { notify } from "utils/notifications";
import { Connection, type ConnectionConfig } from '@solana/web3.js';

export default function useTransactionListener(reference: PublicKey) {
  const { connection } = useConnection();
  //const connection=new Connection("https://solana-mainnet.gateway.pokt.network/v1/lb/631fd78059104a00396c793e","confirmed");

  const mostRecentNotifiedTransaction = useRef<string | undefined>(undefined);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Check if there is any transaction for the reference
        const signatureInfo = await findReference(connection, reference, { until: mostRecentNotifiedTransaction.current });

        console.log('Transaction confirmed', signatureInfo);
        notify({ type: 'success', message: 'Transaction confirmed', txid: signatureInfo.signature });
        mostRecentNotifiedTransaction.current = signatureInfo.signature;
      } catch (e) {
        if (e instanceof FindReferenceError) {
          // No transaction found yet, ignore this error
          return;
        }
        console.error('Unknown error', e)
      }
    }, 50000)
    return () => {
      clearInterval(interval)
    }
  }, [connection, reference])
}
