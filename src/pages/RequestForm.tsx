import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { Cluster, clusterApiUrl, Connection, PublicKey, Transaction, SystemProgram, Keypair } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { threadId } from 'worker_threads';
export const RequestForm: FC = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  let response=null;
  let mystatus="work";

  let myobject={mystatus};
  
  let that = this;

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log('error', 'Wallet not connected!');
      notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
      return;
    }

    let signature: TransactionSignature = '';
    try {

      let cdata  = await axios.post('/api/work' );
    
       response = cdata as unknown as PostResponse | PostError;
       console.log("this is the data from post",response.status);

      myobject.mystatus =response.status;
      signature = "";
      //await connection.confirmTransaction(signature, 'confirmed');
      notify({ type: 'success', message: myobject.mystatus, txid: signature });

     // getUserSOLBalance(publicKey, connection);
    } catch (error: any) {
      notify({ type: 'error', message: `Airdrop failed!`, description: error?.message, txid: signature });
      console.log('error', `Airdrop failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, getUserSOLBalance,myobject]);

  return (
    <div>
      <button
        className="px-8 m-2 btn btn-outline btn-secondary"
        onClick={onClick}
        disabled={!publicKey}
      >{myobject.mystatus}</button>

      <button
        className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
        onClick={onClick} disabled={!publicKey}
      > ${myobject.mystatus}
        <div className="hidden group-disabled:block ">
          Wallet not connected
        </div>
        <span className="block group-disabled:hidden" >
        ${myobject.mystatus}
        </span>
      </button>
    </div>
    
  );
};


export type PostRequest = {
  account: string,
};
type GetResponse = {
  label: string,
  icon: string,
};

export type PostResponse = {
  transaction: string,
  message: string,
  network: Cluster,
};

export type PostError = {
  error: string
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse | PostError> 
) {
  //alert("api 请求数据获取");
  console.log("chat gpt");
  //console.log(req);
  console.log("==========this is what we get ");
  //return res.status(405).json({ error: 'Method not allowed' });
  return res.status(200).json({ error:'return hello world' });
}