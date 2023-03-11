
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from "../styles/Home.module.css";
import axios from "axios"
import { Contract, providers, utils,ethers } from "ethers";

import {
  CONTRACT_abi,
  NFT_CONTRACT_ADDRESS,
  CONTRACT_code,
  serverUrl,
} from "../constants";

const Pinata_api_key =  "dc5bf98b2fd4875f0913"
const Pinata_secret_api_key =  "479ec86c28bdf05eb13a13c86ea6029281f204b3ed3d6e55d372d5eff2b70044"



export const Mint = () => {
  const [contractData,setContractData] = useState('');
  const [contractIndex,setContractIndex] = useState(0);
  
  const changeHandler = (event) => {
    selectedFiles.current=event.target.files
  };

  const downloadContracts=async ()=>{
    await axios.get(`${serverUrl}/contracts`).then((res)=>setContractData(JSON.parse(res.data)))
  }
  



  return (
    <div >
        <div className="m-5 p-3 border border-dark border-1">Contracts</div>
        <div className="m-5 p-3 border border-dark border-1">Alread Minted</div>
        <div className="m-5 p-3 border border-dark border-1">Mint</div>
    </div>
  )
}


