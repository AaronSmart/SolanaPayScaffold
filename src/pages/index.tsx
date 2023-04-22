import { Keypair } from "@solana/web3.js";
import { SendTransactionRequest } from "components/SendTransactionRequest";
import { TransactionRequestQR } from "components/TransactionRequestQR";
import useTransactionListener from "hooks/useTransactionListener";
import  handler from "pages/api/work";
import type { NextPage } from "next";
import { useMemo } from "react";
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestForm } from "./RequestForm";

import { useLocalStorage } from '@solana/wallet-adapter-react';


import store  from '../stores/myredux';

//import store from '../Redux/Store/store'
import { SortAscendingIcon } from "@heroicons/react/solid";


import React, { Component, Fragment } from "react";
import Son1 from '../Redux/Son1'
import Son2 from '../Redux/Son2'

const Home: NextPage = () => {
  // Generate a public key that will be added to the transaction
  // so we can listen for it
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  // Listen for transactions with the reference
  useTransactionListener(reference);
  // const mykey=useLocalStorage("mykey","");
 let mydata ="test";

//  store.subscribe(() => { 
//   console.log("进入函数内部",store.getState()[0]);
//   mydata=store.getState()[0];
// });

store.subscribe(() => {console.log("Store updated to",store.getState());
});

// console.log("进入dispatch函数")
store.dispatch({
  type:"NewAccount",
  payload: "testvines1vzrYbzLMRdu58ou5XTby4qAqVRLmqo36NKPTg"
});
// console.log("退出dispatch函数")

 setInterval(function() {
  //mydata=window.localStorage.getItem("account");
    // store.dispatch({
    //   type:"ADD",
    //   payload: 1
    // });
    //console.log("进行动态参数测试，进行数据调试");
    // store.subscribe(() => { 
    //   mydata=store.getState()[0]
    //   console.log("这是动态参数测试",mydata);
    // });
// });

   mydata=store.getState()[0]
  //console.log(store.getState());
  let info = document.getElementById("info");
  //info.setAttribute("value",mydata);
  info.innerText="SendtoAccount:"+mydata;
  //this.$forceUpdate;
  
},1000);

//mydata=mydata+store.getState();
// store.subscribe(() => {console.log("Store updated hello !",store.getState());
// });
// axios.post('/api/work' );
  return (
    <div className="hero rounded-2xl bg-base-content">
      <div className="hero-content text-center">
        <div className="max-w-lg flex flex-col gap-6">
        {/* <Fragment>
        <Son1></Son1>
        <hr/>
        <Son2></Son2>
        </Fragment> */}
        {/* <RequestForm/> */}
          {/* <h1 className="text-3xl font-bold text-primary">Transaction Request</h1> */}
          <h4 id="info" className="text-3xl font-bold text-primary">{mydata}</h4>
          {/* Button to send a transaction request */}
          <SendTransactionRequest reference={reference} />
          {/* QR code for a transaction request */}
          <TransactionRequestQR reference={reference} />
        </div>
      </div>
    </div>
  );
};

export default Home;