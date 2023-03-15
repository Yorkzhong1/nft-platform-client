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


export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();
  const [buttonFunction, setButtonFunction] = useState(1);
  const [chain, setChain] = useState(1337);

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
    
      if (buttonFunction==1){
        return(
            <div> 
                <FolderUpload chain={chain} setLoading={setLoading}/>
            </div>
            
        )
      }

      if (buttonFunction==2){
        return(
          <div> 
             <Mint chain={chain} setLoading={setLoading}/>
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
              <div className="d-flex">
                <div className="dropdown me-5">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      连接网络
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(1337)
                        connectWallet(1337)
                        }}>本地测试网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(80001)
                        connectWallet(80001)}}>Polygon 测试网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(5)
                        connectWallet(5)}}>以太测试网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(1)
                        connectWallet(1)}}>以太主网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(137)
                        connectWallet(137)}}>Polygon主网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(42161)
                        connectWallet(42161)}}>Arbitrum主网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(10)
                        connectWallet(10)}}>Optimsim主网</button></li>
                      <li><button className="dropdown-item" type="button" onClick={()=>{
                        setChain(56)
                        connectWallet(56)}}>BSC主网</button></li>
                    </ul>
                </div>
                <button className="btn btn-light ">
                  {chain==1337?
                  ('本地测试网'):(chain==80001?
                    ("Polygon测试网"):(chain==5?("以太测试网"):(chain==1?
                      ("以太主网"):(chain==137?("Polygon主网"):(chain==42161?
                        ("Arbitrum"):(chain==10?("Optimsim"):(chain==56?
                          ("BSC"):("未选择"))))))))}
                </button>
              </div>
                  <div className="text-center">
                  <h1 className={styles.title}>欢迎来到Per Se Gallery!</h1>                      
                      {renderButton()}
                  </div>
              </div>
          </div>
        </div>
      <footer className={styles.footer}>由Per Se Gallery &#10084;制作</footer>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossOrigin="anonymous" async/>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossOrigin="anonymous" async/>

    </div>
  );
}

const getChainName = (chain)=>{

  let chainName
  switch (chain) {
    case 1337:
      chainName="本地测试网"
      break;

    case 80001:
        chainName="Polygon测试网"
        break;
    case 5:
          chainName="以太测试网"
          break;
    case 1:
          chainName="以太主网"
          break;
    case 137:
          chainName="Polygon主网"
          break;
    case 42161:
          chainName="Arbitrum主网"
          break;
    case 10:
          chainName="Optimsim主网"
          break;
    case 56:
          chainName="BSC主网"
          break;
       

    default:
      chainName="本地测试网"
      break;
  }
  return chainName
}

//
const getProviderOrSigner = async (needSigner = false,chain=1337) => {
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
    window.alert(`请将钱包网络改变${chainName}`)
    throw new Error(`请将钱包网络改变${chainName}`);
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
  const [chainName,setChainName]=useState("以太主网");
  

  const changeHandler = (event) => {
    selectedFiles.current=event.target.files
  };

  useEffect(() => {
      getContract() 
      console.log("initial contract data",contractData,contractIndex)
      
      
  }, []);
  
  const creatButton=(name,index,chainName)=>{
      var btn = document.createElement("input");
      btn.type = "button";
      
      btn.className="btn btn-outline-secondary m-2"
      btn.id = `${index}`;
      btn.name = "submit";
      btn.value = `${name} @ ${chainName}`;
      btn.addEventListener('click', async () => {
        setContractIndex(index)
        setChainName(chainName)
        await getTokenIdsMinted(contractData[index].contractAdd,prop.chain)
        
    })
      document.getElementById("contract").appendChild(btn);
    }

    const getTokenIdsMinted = async (add,chain) => {
      try {
        console.log('getToken contract Address',add)
        const provider=await getProviderOrSigner(false,prop.chain);
        const nftContract = new Contract(add, CONTRACT_abi, provider);
        await nftContract.tokenIds().then((res)=>setTokenIdsMinted(res.toString()));
        await nftContract.maxTokenIds().then((res)=>setMaxTokenId(res.toString()));
        console.log('token data refreshed')
        
      } catch (err) {
        console.error(err);
      }
    };


  const publicMint = async () => {
  try {
    console.log("Public mint");
    let add=contractData[contractIndex].contractAdd
    console.log('Mint Contract Address',add)
    const signer = await getProviderOrSigner(true,prop.chain);
    const nftContract = new Contract(add, CONTRACT_abi, signer);
    const tx = await nftContract.mint({value: utils.parseEther("0.001"),});
    // prop.setLoading(true);
    //   await tx.wait();
    // prop.setLoading(false);
    window.alert(`你成功的mint了一个${contractData[contractIndex].name} NFT!`);
    getTokenIdsMinted(add,prop.chain)

  } catch (err) {
    console.error(err);
  }
};



  const getContract=async ()=>{
    console.log('getting contract data')
    let res = await axios.get(`${serverUrl}/contracts`)
    setContractData(JSON.parse(res.data))
    console.log('合约数据',contractData)
    document.getElementById("contract").innerHTML=""
    for(let i=0;i<contractData.length;i++){
      let chainName=getChainName(contractData[i].chain)
      creatButton(contractData[i].name,i,chainName)
    }
  }
  

  return (
      <div >
          <div className="m-5 p-3 border border-dark border-1">
            <button type="button" className="btn btn-light mt-5 text-danger" onClick={getContract}>点击这里刷新NFT列表</button>
            <div id="contract"> </div>
            <div className="m-5"><h5>项目:{(contractData[contractIndex])?(contractData[contractIndex].name):("")}<br></br>公链:{chainName}<br></br> Mint情况：{tokenIdMinted}/{maxTokenId}个NFT已经被Mint</h5></div>
            <button className={styles.button} onClick={publicMint}>Public Mint 🚀</button>
          </div>
          
          
      </div>
    )
}


//Folder upload component

const FolderUpload = (prop) => {
  console.log('chain in FolderUpload',prop.chain)
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

  

  const deploytContract = async (name,symble,URI,maxTokenId,chain) => {
    console.log('deploy contract prop',name,maxTokenId,symble,URI)
    try {
      const signer = await getProviderOrSigner(true,chain);
      const myAddress=await signer.getAddress();
      const Contract = new ethers.ContractFactory(CONTRACT_abi,CONTRACT_code,signer);
      const contract = await Contract.deploy(name,symble,URI,maxTokenId);
      // wait for the transaction to get mined
      const tx = await contract.deployed();
      // prop.setLoading(true)
      // await tx.wait()
      // prop.setLoading(false)
      window.alert(`合约已部署，地址为${contract.address}`);
      document.getElementById('deployContract').className="btn btn-info w-100 mt-3 text-white"
      //upadte contract address
      console.log(name,myAddress,contract.address)
      const res = await axios.post(`${serverUrl}/contracts`,{name:name,pic:`${CID}/${fileNames[0]}`, chain:prop.chain,contractAdd:contract.address,myAddress:myAddress})
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData=async()=>{
    console.log('deleting data on server')
    try {
      const res = await axios.post(`${serverUrl}/delete`)
      window.alert(res.data)
    } catch (err) {
      console.error(err);
    }

  }


  return (
    <div >
      <div className="m-5 p-3 border border-dark border-1">
          <h4 className="text-center">合约部署</h4>
          <div className="text-left">
              <div className="text-info">合约部署共需要三个步骤，请逐次完成:</div>
          </div>
          <button id="deleteData" className="btn btn-secondary w-100" onClick={deleteData}>0. 如需要，可清理服务器已有数据</button>
          <div>第一步：将所有图片放在一个文件夹内，并将次文件夹上传</div>
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
        <button id="uploadPic" className="btn btn-danger w-100" onClick={handleSubmission}>第二步：上传图片至IPFS</button>
        <button id="uploadMeta" className="btn btn-white w-100 mt-3 text-white" onClick={upLoadMeta}>第三步： 制作并上传MetaData</button> 
        <button id="deployContract" className="btn btn-white w-100 mt-3 text-white" onClick={()=>{deploytContract(name,symble,`ipfs://${MetaDataCID}`,numberOfPic,prop.chain)}}>第四步：部署合约 🚀</button> 
        </div>

      <div className="m-5"></div>
      <div id="output" className="output"></div>
      
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

const createNFT=async ()=>{
  try{
      // console.log(`${serverUrl}/addNFT`)
      await axios.post(`${serverUrl}/addNFT`,newNFT)
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




