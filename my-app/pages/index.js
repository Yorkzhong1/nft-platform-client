import Link from 'next/link';
import Image from 'next/image'
import { Contract, providers, utils,ethers } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import axios from "axios"
// import {createNFT,getNFT,deactiveNFT,removeNFT } from "./client.js"

// import { getProviderOrSigner } from "./utils";


import {
  CONTRACT_abi,
  CONTRACT_code,
  serverUrl,
} from "../constants";
// import { async } from "recursive-fs/lib/copy";

const Pinata_api_key =  "dc5bf98b2fd4875f0913"
const Pinata_secret_api_key =  "479ec86c28bdf05eb13a13c86ea6029281f204b3ed3d6e55d372d5eff2b70044"


export default function NFT() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [buttonFunction, setButtonFunction] = useState(1);
  const [chain, setChain] = useState(80001);

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  const connectWallet = async (chain) => {
    try {
      await getProviderOrSigner(false, chain);
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (!walletConnected) {
      console.log(`请选择网络并连接钱包`)
    }
    // If we are currently waiting for something, return a loading button
    if (loading) {
      return <button className={styles.button}>Loading...</button>;
    }
    if (buttonFunction==0){
      return(
        <div className="container-lg">

        <div className="row">
            <div className="col">
                <Image src="/images/04.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>

        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/05.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/06.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/07.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/08.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
            <div className="col">
                <Image src="/images/09.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>        
        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/10.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/11.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Image src="/images/12.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>
            <div className="col">
                <Image src="/images/13.jpg" layout='responsive' width="1152" height="357" alt=""/>
            </div>        
        </div>


    </div>
          
      )
    }

      if (buttonFunction==1){
        return(
            <div> 
                <Image src="/images/17.jpeg" layout='responsive' width="144" height="45" alt=""/>
                <FolderUpload/>
            </div>
            
        )
      }

      if (buttonFunction==2){
        return(
          <div> 
            <Image src="/images/17.jpeg" layout='responsive' width="144" height="45" alt=""/>
             <Mint />
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
        <title>Per Se Gallery</title>
        <meta name="description" content="LW3Punks-Dapp" />
        
      </Head>
      <div className="container">
     
          <div className="row">
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
     
                  <div className="collapse navbar-collapse d-flex" id="navbarTogglerDemo01">
                        <button type="button" className="btn btn-dark btn-sm mt-5 me-2" onClick={()=>{setButtonFunction(0)}}>HOME</button>
                        <button type="button" className="btn btn-dark btn-sm mt-5 me-2" onClick={()=>{setButtonFunction(1)}}>DEPLOY</button>
                        <button type="button" className="btn btn-dark btn-sm mt-5 " onClick={()=>{setButtonFunction(2)}}>MINT</button>  
                  </div>
                </div>
              </nav>
          </div>
        
           <div className="row">
              <div className="col text-center">
                      {renderButton()}
                      <Image src="/images/14.jpg" layout='responsive' width="1152" height="357" alt=""/>
              </div>
          </div>
        </div>
      
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossOrigin="anonymous" async/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossOrigin="anonymous" async/>
    </div>
  );
}

const getChainName = (chain)=>{

  let chainName
  switch (chain) {
    case 1337:
      chainName="Local testnet"
      break;

    case 80001:
        chainName="Polygon testnet"
        break;
    case 5:
          chainName="ethereum testnet"
          break;
    case 1:
          chainName="ethereum"
          break;
    case 137:
          chainName="Polygon"
          break;
    case 42161:
          chainName="Arbitrum"
          break;
    case 10:
          chainName="Optimsim"
          break;
    case 56:
          chainName="BSC"
          break;
       

    default:
      chainName="local testnet"
      break;
  }
  return chainName
}

//
const getProviderOrSigner = async (needSigner = false,chain) => {
  console.log('chain in getProviderOrSigner',chain)
  let chainName = getChainName(chain)
  const web3ModalRef = new Web3Modal({
      network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
    })
  
  const provider = await web3ModalRef.connect();
  const web3Provider = new providers.Web3Provider(provider);

  // If user is not connected to the Mumbai network, let them know and throw an error
  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== chain) {
    window.alert(`Please change your metamask to ${chainName} and retry`)
    throw new Error(`please change your metamask to ${chainName}`);
  }

  if (needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
};


//Mint component
const Mint = (prop) => {
  const [contractData,setContractData] = useState([])
  const [contractIndex,setContractIndex] = useState(0);
  const [tokenIdMinted,setTokenIdsMinted]=useState(0);
  const [maxTokenId,setMaxTokenId]=useState(0);
  const [chainName,setChainName]=useState("Polygon Testnet");
  const [chain,setChain]=useState(80001);
  const button = useRef("0")
  

  const changeHandler = (event) => {
    selectedFiles.current=event.target.files
  };

  useEffect(() => {
      getContract() 
      console.log("initial contract data",contractData,contractIndex)
  }, []);
  
  const createButton=(Cdata,index,chainName)=>{
      var btn = document.createElement("input");
      btn.type = "button";
      btn.className="btn btn-secondary m-2 rounded-pill"
      btn.id = `${index}`;
      btn.name = "submit";
      btn.value = `${Cdata[index].name} @ ${chainName}`;
      
      btn.addEventListener('click', async () => {
        // getContract()
        setContractIndex(index)
        setChainName(chainName)
        console.log("chain in createbutton",Cdata[index].chain)
        setChain(Cdata[index].chain)
        let res=await getTokenIdsMinted(Cdata[index].contractAdd,Cdata[index].chain)
        console.log(res)
        
    })
      document.getElementById("contract").appendChild(btn);
    }

    const getTokenIdsMinted = async (add,chain) => {
      try {
        console.log('getToken contract Address',add)
        console.log('chain in get TokenId',chain)
        const provider=await getProviderOrSigner(false,chain);
        const nftContract = new Contract(add, CONTRACT_abi, provider);
        let _tokenIds = await nftContract.tokenIds()
        let _maxTokenIds = await nftContract.maxTokenIds()
        console.log("已经挖完？",_tokenIds.toNumber(),_maxTokenIds.toNumber())
        setTokenIdsMinted(_tokenIds.toString());
        setMaxTokenId(_maxTokenIds.toString());
        console.log('token data refreshed')
        if(_tokenIds.toNumber()==_maxTokenIds.toNumber()){
          await axios.post(`${serverUrl}/deActive`,{contractAdd:add})//if all NFT are minted, then deactive it
          window.alert(`NFT ${add} Mint is finished，please refresh the NFT project list`)
        }
        
        
      } catch (err) {
        console.error(err);
      }
    };


  const publicMint = async () => {
  try {
    console.log("Public mint");
    let add=contractData[contractIndex].contractAdd
    console.log('Mint Contract Address',add)
    const signer = await getProviderOrSigner(true,chain);
    const nftContract = new Contract(add, CONTRACT_abi, signer);
    
    
    const tx = await nftContract.mint({value: utils.parseEther("0.001"),});
    window.alert(`Start minting...`);
      await tx.wait();
    window.alert(`You minted a ${contractData[contractIndex].name} NFT!`);
    let res=await getTokenIdsMinted(add,chain)    
  } catch (err) {
    console.error(err);
  }
};



  const getContract=async ()=>{
    console.log('getting active contract data')
    // let res = await axios.get(`${serverUrl}/contracts`)
    let res= await axios.post(`${serverUrl}/getNFT`,{active:true})
    console.log(res.data)
    let Cdata=res.data
    setContractData(Cdata)
    
    document.getElementById("contract").innerHTML=""
    for(let i=0;i<Cdata.length;i++){
      let chainName=getChainName(Cdata[i].chain)
      createButton(Cdata,i,chainName)
    }
  }
  

  return (
      <div >
          <div className="m-5 p-3">
            <button type="button" className="btn btn-light mt-5 text-danger" onClick={getContract}>Refresh list of existing NFT projects</button>
            <div id="contract"> </div>
            <div className="m-5 text-center"><p>Project: {(contractData[contractIndex])?(contractData[contractIndex].name):("")}<br></br>Chain: {chainName}<br></br> {tokenIdMinted}/{maxTokenId} NFT Minted </p></div>
            <button className="btn btn-lg btn-dark w-50 rounded-pill" onClick={publicMint}>Mint NFT🚀</button>
          </div>
      </div>
    )
}


//Folder upload component

const FolderUpload = (prop) => {
  console.log('folder upload')
  const selectedFiles=useRef()
  const [status,setStatus] = useState("normal");
  const [chain,setChain] = useState(80001);
  
  
  //states on NFT
  const [numberOfPic, setNumberOfPic] = useState(0);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [fileNames, setFileNames] = useState([]);
  const [price, setPrice] = useState(0.001);
  
//States on IPFS CID
  const [CID, setCID] = useState("");
  const [MetaDataCID, setMetaDataCID] = useState("");


//contract deploy states

  const symble = useRef('Punk');
  // const price = useRef(0.001);
  const changeHandler = (event) => {
    selectedFiles.current=event.target.files
  };



  async function handleSubmission() {
    //get all inputs
    let names=[]
    let numbers = Array.from(selectedFiles.current).length
    setNumberOfPic(numbers)
    console.log(numbers)

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
    //loading picture to IPFS
    setStatus("pic")
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
    console.log(`${Array.from(selectedFiles.current).length}个图片已经上传IPFS; 地址为:${metaCID}`);
    
   
    //upload Meta
    console.log('uploading Meta')
    setStatus("metadata")
    console.log(`${serverUrl}/meta`,{name:name,description:description,number:numbers,CID:metaCID,fileNames:JSON.stringify(names)})
    const res2 = await axios.post(`${serverUrl}/meta`,{name:name,description:description,number:numbers,CID:metaCID,fileNames:JSON.stringify(names)})
    console.log(res2.data)
    console.log('Meta数据上传完毕')
    setMetaDataCID(res2.data)
    console.log(`MetaData已经上传至IPFS; 地址为:${res2.data}`);
    
    //testing
    console.log('start deploying contract')
    console.log("contract pro in handleSubmission",name,symble.current,`ipfs://${res2.data}`,numbers,chain,price)
    setStatus("contract")
    await deployContract(name,symble.current,`ipfs://${res2.data}`,numbers,chain,price)
    
  }

  

  const deployContract = async (name,symble,URI,maxTokenId,chain,price) => {
    console.log('deploy contract prop',name,symble,URI,maxTokenId,chain,price)
    const priceInWei = ethers.utils.parseUnits(price.toString(), "ether");
  // const deployedLW3PunksContract = await lw3PunksContract.deploy("testing Punk","TP",metadataURL,2,price);

    try {
      const signer = await getProviderOrSigner(true,chain);
      const myAddress=await signer.getAddress();
      const Contract = new ethers.ContractFactory(CONTRACT_abi,CONTRACT_code,signer);
      console.log("prop for deploying contract:",name,symble,URI,maxTokenId,priceInWei)
      const contract = await Contract.deploy(name,symble,URI,maxTokenId,priceInWei);
      // wait for the transaction to get mined
      const tx = await contract.deployed();
      // prop.setLoading(true)
      // await tx.wait()
      // prop.setLoading(false)
      console.log(`合约已部署，地址为${contract.address}`);
      setStatus("uploadServer")
      //upadte contract address
      console.log(name,myAddress,contract.address)
      // const res = await axios.post(`${serverUrl}/contracts`,{name:name,pic:`${CID}/${fileNames[0]}`, chain:prop.chain,contractAdd:contract.address,myAddress:myAddress})
      let newNFT={name:name,pic:`${CID}/${fileNames[0]}`,chain:chain,contractAdd:contract.address,ownerAdd:myAddress,active:true}
      console.log('new NFT data to server',newNFT)
      await axios.post(`${serverUrl}/addNFT`,newNFT)
      .then((res)=>{console.log(res.data)})
      setStatus("done")
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData=async()=>{
    console.log('deleting data on server')
    try {
      await axios.post(`${serverUrl}/remove`,{active:false})
      .then((res)=>{window.alert(res.data)})
    } catch (err) {
      console.error(err);
    }
  }
  const renderButton=()=>{
    if(status=="normal"){
      return(<div className="alert alert-dark text-danger text-center" role="alert">Not started deploying yet...</div>)
    }else if(status=="pic"){
      return(
        <div className="alert alert-dark text-danger text-center" role="alert">Uploading pictures...</div>
      )
    }else if(status=="metadata"){
      return(<div className="alert alert-dark text-danger text-center" role="alert">Uploading Meta...</div>)
    }else if(status=="contract"){
      return(<div className="alert alert-dark text-danger text-center" role="alert">Deploying contract...</div>)
    }else if(status=="uploadServer"){
      return(<div className="alert alert-dark text-danger text-center" role="alert">Uploading contract information to server...</div>)
    }else if(status=="done"){
      return(<div className="alert alert-dark text-danger text-center" role="alert">NFT deployed</div>)
    }   
  }

  return (
    <div className="row d-flex">
      <div className="col-12 p-2">
        <p className="text-start">Select the folder contains your arts pictures and upload</p>
          <div className="text-start">
              <input type="file" directory="" webkitdirectory="" className="w-60 form-control rounded-pill" onChange={changeHandler}/>
              <button htmlFor="exampleFormControlFile1" className="btn mr-3 w-40">NFT Name</button>
                <input type="text" className="w-60 form-control rounded-pill" required = {true} placeholder="CryptoPunk" aria-label="Username" aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      setName(e.target.value)
                    }}
                    />
               <button htmlFor="exampleFormControlFile1" className="btn w-40">NFT Symble</button>
                <input type="text" className="w-60 form-control rounded-pill" required = {true} placeholder="PK" aria-label="Username" aria-describedby="basic-addon1"
                    onChange={(e)=>{
                      symble.current=e.target.value
                    }}
                    />

                <button htmlFor="exampleFormControlFile1" className="btn w-40">Price/NFT</button>
                  <input type="text" className="w-60 form-control rounded-pill" required = {true} placeholder="0.001" aria-label="Username" aria-describedby="basic-addon1"
                        onChange={(e)=>{
                          setPrice(e.target.value)
                        }}
                        />

              <button htmlFor="exampleFormControlFile1" className="btn  w-40">NFT Description</button>
                  <input type="text" className="w-60 form-control rounded-pill" placeholder="myPunk is a AI generated art NFT" aria-label="Username" aria-describedby="basic-addon1"
                  onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
                  />
            
            <div className="dropdown mt-2">
                    <button htmlFor="exampleFormControlFile1" className="btn w-40">Which network to deploy</button>
                    <button className="btn btn-outline-secondary w-60 dropdown-toggle rounded-pill" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {chain==1337?
                              ('Local testnet'):(chain==80001?
                                ("Polygon Testnet"):(chain==5?("Ethereum testnet"):(chain==1?
                                  ("Ethereum"):(chain==137?("Polygon"):(chain==42161?
                                    ("Arbitrum"):(chain==10?("Optimsim"):(chain==56?
                                      ("BSC"):("Did not selected"))))))))}
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item " type="button" onClick={()=>{setChain(80001)}}>Polygon Testnet</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(1337)
                        }}>local Testnet</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(137)
                        }}>Polygon</button></li>
                      <li><button className="dropdown-item " type="button" onClick={()=>{
                        setChain(1)
                        }}>Ethereum</button></li>
                    </ul>
              </div>



              <a href="#" id= "uploadPic" className="mt-2 btn btn-dark w-100 rounded-pill" onClick={handleSubmission}>Submit</a>
              {renderButton()}         
            </div>
            
      </div> 
    </div>
  )
}



//functions to interact with server


const test=async ()=>{
  try{
      // console.log(`${serverUrl}/addNFT`)
      await axios.get(`${serverUrl}/test`)
      .then((res)=>{console.log(res.data)})
  }catch (error) {
      console.log(error);
    }
}
// test()

const createNFT=async (NFT)=>{
  try{
      // console.log(`${serverUrl}/addNFT`)
      await axios.post(`${serverUrl}/addNFT`,NFT)
      .then((res)=>{console.log(res.data)})
  }catch (error) {
      console.log(error);
    }
}
//   createNFT()

//get list of active NFT, change the input to "true" or "false" to get active or inactive lists of NFT
const getNFT=async (active)=>{
  try{
      await axios.post(`${serverUrl}/getNFT`,{active:active})
      .then((res)=>{console.log(res.data)})
  }catch (error) {
      console.log(error);
    }
}

//   getNFT(false) 


//deActive a specific NFT

const deactiveNFT=async (contractAdd)=>{
  try{
      await axios.post(`${serverUrl}/deActive`,{contractAdd:contractAdd})
      .then((res)=>{console.log(res.data)})
  }catch (error) {
      console.log(error);
    }
}

//   deactiveNFT('0x000')

//   remove 
const removeNFT=async (contractAdd)=>{
  try{
      await axios.post(`${serverUrl}/remove`,{contractAdd:contractAdd})
      .then((res)=>{console.log(res.data)})
  }catch (error) {
      console.log(error);
    }

  }




