import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import axios from "axios"
import styles from "../styles/Home.module.css";
import {publicMint,getTokenIdsMinted,deploytContract} from "./backup/contractInteract";
import {FolderUpload} from "./upload"
import {Mint} from "./mint"
import {getProviderOrSigner} from "./utils";

import {
  serverUrl,
} from "../constants";



export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [buttonFunction, setButtonFunction] = useState(1);
  
//contract states
  const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
  const [maxTokenId, setMaxTokenId] = useState("0");
  const [contractData,setContractData]=  useState([])
  const [contractAdd1,setContractAdd1]=  useState('')
  // const contractAdd = useRef("");

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      const connectWallet = async () => {
        try {
          await getProviderOrSigner();
          setWalletConnected(true);
        } catch (err) {
          console.error(err);
        }
      }
      connectWallet();   
    }
  }, [walletConnected]);

 //these two functions will get and show data from contract data saved on server
  

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  

  /*
        renderButton: Returns a button based on the state of the dapp
      */
  const renderButton = () => {
    // If wallet is not connected, return a button which allows them to connect their wallet
    if (!walletConnected) {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }


    if (buttonFunction==1){
      return(
          <div> 
              <FolderUpload/>
          </div>
          
      )
    }

    if (buttonFunction==2){
      return(
        <div> 
            <Mint/>
        </div>
        
      )
    }

    if (buttonFunction==3){
      return(<div className="text-center">
           <div className="m-5"><a href="https://testnets.opensea.io/collection/mumbai-creatures-v2"  target="_blank" role="button" aria-pressed="true"><h4>OpenSea</h4></a></div> 
           <div className="m-5"><a href="https://blur.io/collections"  target="_blank"  role="button" aria-pressed="true"><h4>Blur</h4></a></div> 
      </div>)
    }

    if (buttonFunction==4){
      return(<div>????????????</div>)
    }

   
  };

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
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(1)}}>????????????</button>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(2)}}>Mint NFT</button>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(3)}}>NFT??????</button>
                  <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(4)}}>????????????</button>
                </div>
              </div>
              <div className="col-10 bg-light m-1">
                  <div className="text-center">
                      <h1 className={styles.title}>????????????NFT??????!</h1>
                  </div>
                  {renderButton()}
              </div>
          </div>
        </div>
      <footer className={styles.footer}>???Alpha &#10084;??????</footer>
    </div>
  );
}