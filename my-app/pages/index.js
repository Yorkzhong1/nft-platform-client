import { Contract, providers, utils,ethers } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import axios from "axios"
// import { getProviderOrSigner } from "./utils";


import {
  CONTRACT_abi,
  NFT_CONTRACT_ADDRESS,
  CONTRACT_code,
  serverUrl,
} from "../constants";

const Pinata_api_key =  "dc5bf98b2fd4875f0913"
const Pinata_secret_api_key =  "479ec86c28bdf05eb13a13c86ea6029281f204b3ed3d6e55d372d5eff2b70044"


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


 



  const renderButton = () => {
    
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

//
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
//Mint component
const Mint = () => {
  const [contractData,setContractData] = useState([{name: "FakeNFT", pic: "QmWaeSpuG8Vhz9LDyYYY7Z23Rbg35dU5QLkQd8tSiSTe89/k8v12nzrjshdlqqqgrci.webp", contractAdd: "0x705bb008f6Ea39551d77d1015bD18849Efc7BfC4", myAddress: "0xAA162386d3a9B2B8F35d9f578dC27E7F4F28dB89" }])
  const [contractIndex,setContractIndex] = useState(0);
  const changeHandler = (event) => {
    selectedFiles.current=event.target.files
  };
  useEffect(() => {
      setInterval(()=>{
        console.log('get contract')
        // getContract()
        
        }, 100000);

  }, []);


  function creatButton(name,index) {
    var btn = document.createElement("input");
    btn.type = "button";
    btn.style.width = "80px";
    btn.id = `${index}`;
    btn.name = "submit";
    btn.value = `${name}`;
    btn.addEventListener('click', () => {
      setContractIndex(index)      
   })
    document.getElementById("contract").appendChild(btn);
}

  

  const getContract=async ()=>{
    let res = await axios.get(`${serverUrl}/contracts`)
    setContractData(JSON.parse(res.data))
    console.log(contractData)
    document.getElementById("contract").innerHTML=""
    for(let i=0;i<contractData.length;i++){
      creatButton(contractData[i].name,i)
    }
  }
  

  return (
      <div >
          <div className="m-5 p-3 border border-dark border-1">
            <button type="button" className="btn btn-dark mt-5" onClick={getContract}>刷新合约</button>
            <div id="contract">
                
            </div>
            <div>{contractIndex}</div>
          </div>
          <div className="m-5 p-3 border border-dark border-1">Alread Minted</div>
          <div className="m-5 p-3 border border-dark border-1">Mint</div>
      </div>
    )
}


//Folder upload component

export const FolderUpload = () => {

  const selectedFiles=useRef()
  const [loading,setLoading] = useState(false);
  
  //states on NFT
  const [numberOfPic, setNumberOfPic] = useState(0);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [fileNames, setFileNames] = useState([]);
  
//States on IPFS CID
  const [CID, setCID] = useState("");
  const [MetaDataCID, setMetaDataCID] = useState("");


//contract deploy states

  const symble = useRef('Punk');
  const changeHandler = (event) => {
    selectedFiles.current=event.target.files
  };



  const upLoadMeta = async function() {
    console.log('sending request to server')
    console.log(serverUrl)
    const res2 = await axios.post(`${serverUrl}/meta`,{name:name,description:description,number:numberOfPic,CID:CID,fileNames:JSON.stringify(fileNames)})
    console.log(res2.data)
    setMetaDataCID(res2.data)
    document.getElementById('uploadMeta').className="btn btn-info w-100 mt-3 text-white"
    document.getElementById('deployContract').className="btn btn-danger w-100 mt-3 text-white"
    window.alert(`MetaData已经上传至IPFS; 地址为:${res2.data}`);
  }

  async function handleSubmission() {
    let names=[]

    
    setNumberOfPic(Array.from(selectedFiles.current).length)

    const formData = new FormData();
    Array.from(selectedFiles.current).forEach((file) => {
      formData.append("file", file);
      names.push(file.name)
    });
    setFileNames(names)
    var relativePath = selectedFiles.current[0].webkitRelativePath;
    var folderName = relativePath.split("/")[0];
    const metadata1 = JSON.stringify({
      name: folderName
    });

    formData.append('pinataMetadata', metadata1);
    const options = JSON.stringify({
      cidVersion: 0
    });
    formData.append('pinataOptions', options);
    let metaCID
    try{
      await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key:Pinata_api_key,
          pinata_secret_api_key:Pinata_secret_api_key
        }
      }).then((res)=>{
        metaCID=res.data.IpfsHash
        setCID(res.data.IpfsHash)});
    } catch (error) {
      console.log(error);
    }

    console.log('Picture are uploaded')
    window.alert(`${Array.from(selectedFiles.current).length}个图片已经上传IPFS; 地址为:${metaCID}`);
    
    document.getElementById('uploadPic').className="btn btn-info w-100 mt-3 text-white"
    document.getElementById('uploadMeta').className="btn btn-danger w-100 mt-3 text-white"
   
  }


  const deploytContract = async (name,maxTokenId,symble,URI) => {
    console.log('deploy contract prop',name,maxTokenId,symble,URI)
    try {
      const signer = await getProviderOrSigner(true);
      const myAddress=await signer.getAddress();
      const Contract = new ethers.ContractFactory(CONTRACT_abi,CONTRACT_code,signer);
      const contract = await Contract.deploy(name,maxTokenId,symble,URI);
      // wait for the transaction to get mined
      const tx = await contract.deployed();
      // setLoading(true)
      // await tx.wait()
      // setLoading(false)
      window.alert(`合约已部署，地址为${contract.address}`);
      document.getElementById('deployContract').className="btn btn-info w-100 mt-3 text-white"
      //upadte contract address
      console.log(name,myAddress,contract.address)
      const res = await axios.post(`${serverUrl}/contracts`,{name:name,pic:`${CID}/${fileNames[0]}`, contractAdd:contract.address,myAddress:myAddress})
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div >
      <div className="m-5 p-3 border border-dark border-1">
          <h4 className="text-center">合约部署</h4>
          <div className="text-left">
              <div className="text-info">合约部署共需要三个步骤，请逐次点击按钮:</div>
              <div>第一步：将所有图片放在一个文件夹内，并将次文件夹上传</div>
              <div>第二步：制作并上传metaData</div>
              <div>第三步：部署合约</div>
          </div>
          <div className="input-group mb-3 mt-2">
              <div className="input-group-prepend">
                  
              </div>
              <input type="file" directory="" webkitdirectory="" className="form-control" onChange={changeHandler}/>
              
          </div>

          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1" >NFT名字</span>
              </div>
              <input type="text" className="form-control" required = {true} placeholder="CryptoPunk" aria-label="Username" aria-describedby="basic-addon1"
              onChange={(e)=>{
                setName(e.target.value)
              }}
              />
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1" >NFT符号</span>
              </div>
              <input type="text" className="form-control" required = {true} placeholder="PK" aria-label="Username" aria-describedby="basic-addon1"
              onChange={(e)=>{
                symble.current=e.target.value
              }}
              />
        </div>


        <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">NFT描述</span>
              </div>
              <input type="text" className="form-control" placeholder="CryptoPunk是一种数字生成艺术NFT" aria-label="Username" aria-describedby="basic-addon1"
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
              />
        </div>
        <button id="uploadPic" className="btn btn-danger w-100" onClick={handleSubmission}>1. 上传图片至IPFS</button>
        <button id="uploadMeta" className="btn btn-white w-100 mt-3 text-white" onClick={upLoadMeta}>2. 制作并上传MetaData</button> 
        <button id="deployContract" className="btn btn-white w-100 mt-3 text-white" onClick={()=>{deploytContract(name,numberOfPic,symble,`ipfs://${MetaDataCID}`)}}>3.部署合约 🚀</button> 
      </div>

      <div className="m-5"></div>
      <div id="output" className="output"></div>
      
    </div>
  )
}


