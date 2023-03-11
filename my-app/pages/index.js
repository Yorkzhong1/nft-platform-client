import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
// import { getProviderOrSigner } from "./utils";
import Mint from "./mint";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [buttonFunction, setButtonFunction] = useState(1);

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

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };


  const getProviderOrSigner = async (needSigner = false) => {
      const web3ModalRef = new Web3Modal({
          network: "goerli",
          providerOptions: {},
          disableInjectedProvider: false,
        })
      
      const provider = await web3ModalRef.connect();
      const web3Provider = new providers.Web3Provider(provider);

      // If user is not connected to the Mumbai network, let them know and throw an error
      const { chainId } = await web3Provider.getNetwork();
      if (chainId !== 1337) {
        window.alert("Change the network to Mumbai");
        throw new Error("Change network to Mumbai");
      }

      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
};



  const renderButton = () => {
    
      if (buttonFunction==1){
        return(
            <div> 
                1
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
        return(<div>使用说明</div>)
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
              <div id="menue" className="col-1 bg-dark m-1">
                <div className="d-grid gap-2 mt-5 mb-5">
                    <div className='mt-3 text-left'></div>
                    <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(1)}}>部署合约</button>
                    <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(2)}}>Mint NFT</button>
                    <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(3)}}>NFT市场</button>
                    <button type="button" className="btn btn-dark mt-5" onClick={()=>{setButtonFunction(4)}}>使用说明</button>
                  </div>
                </div>
              <div id="maindisplay" className="col-10 bg-light m-1">
                  <div className="text-center">
                      <h1 className={styles.title}>欢迎来到NFT世界!</h1>
                      {renderButton()}
                  </div>
              </div>
          </div>
        </div>
      <footer className={styles.footer}>由Alpha &#10084;制作</footer>
    </div>
  );
}