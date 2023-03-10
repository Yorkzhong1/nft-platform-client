import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from "../styles/Home.module.css";
// import {publicMint,getTokenIdsMinted,deploytContract} from "./contractInteract";
// import FolderUpload from "./Upload"
// import {getContracts, FolderUpload} from "./Upload"
// import {getProviderOrSigne} from "./utils";



export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [buttonFunction, setButtonFunction] = useState(1);
  
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const [maxTokenId, setMaxTokenId] = useState("0");
  const [contractData,setContractData]=  useState([])
  const [contractAdd1,setContractAdd1]=  useState('')
  // const contractAdd = useRef("");
  /**
   * publicMint: Mint an NFT
   */


  /*
        connectWallet: Connects the MetaMask wallet
      */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

 

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Mumbai network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });

      const connectWallet = async () => {
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
          setWalletConnected(true);
        } catch (err) {
          console.error(err);
        }
      };

      connectWallet();
      // eslint-disable-next-line-react-hooks/exhaustive-deps
      
      // getContracts(setContractData)  
      // let add=contractAdd1
      // console.log('contract data',contractData)
      // getTokenIdsMinted({add,setTokenIdsMinted,setMaxTokenId,setLoading})
      
      // setInterval(async function () {
      //   getContracts(setContractData) 
      //   await getTokenIdsMinted({add,setTokenIdsMinted,setMaxTokenId,setLoading})
      //   await getTokenIdsMinted({add,setTokenIdsMinted,setMaxTokenId});
      // }, 5 * 1000);
         
    }
  }, [walletConnected]);


  return (
    <div>
      <Head>
        <title>AlphaPunks</title>
        <meta name="description" content="LW3Punks-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
           <div className="row mt-5">
              <div className="col-1 bg-dark m-1">
              <div className="d-grid gap-2">
                  <div className='mt-3 text-left'></div>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(1)}}>部署合约</button>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(2)}}>Mint NFT</button>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(3)}}>NFT市场</button>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(4)}}>使用说明</button>
                </div>
              </div>
              <div className="col-10 bg-light m-1">
                  <div className="text-center">
                      <h1 className={styles.title}>欢迎来到NFT世界!</h1>
                  </div>
                  <div> <h4 className="text-center">选择要Mint的NFT</h4>ShowContracts</div>
                  <div id="contactDisplay"></div>
                  
              </div>
          </div>
        </div>
      <footer className={styles.footer}>由Alpha &#10084;制作</footer>
    </div>
  );
}