import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";



export default function Home() {
  const [buttonFunction, setButtonFunction] = useState(1);

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
             2
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