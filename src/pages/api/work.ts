// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cluster, clusterApiUrl, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SendTransactionRequest } from "components/SendTransactionRequest";
import { TransactionRequestQR } from "components/TransactionRequestQR";
import useTransactionListener from "hooks/useTransactionListener";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useLocalStorage } from '@solana/wallet-adapter-react';
import { useEffect, useRef, useState } from 'react';


// Store
import useUserAddressStore from '../../stores/useUserAddressStore';

import store  from '../../stores/myredux';
import mystore from '../../Redux/Store/store';
import actionCreator from '../../Redux/Store/actionCreator';

// const Home: NextPage = () => {
//   // Generate a public key that will be added to the transaction
//   // so we can listen for it
//   const reference = useMemo(() => Keypair.generate().publicKey, []);

//   // Listen for transactions with the reference
//   useTransactionListener(reference);

//   type GetResponse = {
//     label: string,
//     icon: string,
//   };

//   return (
//     <div className="hero rounded-2xl bg-base-content">
//       <div className="hero-content text-center">
//         <div className="max-w-lg flex flex-col gap-6">
//           <h1 className="text-3xl font-bold text-primary">Transaction Request</h1>
//           {/* Button to send a transaction request */}
//           <SendTransactionRequest reference={reference} />
//           {/* QR code for a transaction request */}
//           <TransactionRequestQR reference={reference} />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Home;

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
  console.log("day day to day day up");
  //console.log(req);
  console.log("==========test2 ");
  //return res.status(405).json({ error: 'Method not allowed' });
  //useLocalStorage("mykey","aaaaaabbbbbccccc");
  //window.localStorage.setItem("account", JSON.stringify("solanaaccount"));

  // const { getUserAddress } = useUserAddressStore();
  // getUserAddress("hxxxxxxxxxlddddddd");
  // const address = useUserAddressStore((s) => s.address);
  // console.log("获取到地址的数据是",address);

  store.dispatch({
    type:"NewAccount",
    payload: "vines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg"
  });
  console.log("inject data to the store");

  // let action = { // action对象
  //   type: 'CHANGE_NAME', // type 标识: 必须的属性, 固定属性只能是type
  //   payload: 'name' // 这是传递数据的参数
  // }
  // /* store.dispatch 是 View 发出 Action 的唯一方法。
  // 接受一个 Action 对象作为参数，将它发送出去。
  // */
  // mystore.dispatch(action);

  if (typeof window !== 'undefined') {
    console.log('we are running on the client')
} else {
    console.log('we are running on the server');
}
  return res.status(200).json({ error:'return success' });
}