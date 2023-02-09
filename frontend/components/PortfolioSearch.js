import React,{useState,useEffect,useMemo,useRef} from 'react';

import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import MiniCard from './MiniCard';
import useSWR from 'swr';
import fetcher from '../public/utils/fetchUserInfo';
import AssetChart from './chart/AssetChart';
import {TiDeleteOutline} from 'react-icons/ti'
import {AiOutlineEdit} from 'react-icons/ai'
import {AiOutlineCheck} from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi';
import {toast} from 'react-toastify';
import Loading from './Loading';



const PortfolioSearch=({allAssets})=>{
    const {data:userInfo, error,isValidating, mutate}=useSWR("/api/auth/getUser",fetcher)
    const [assetSelect,setAssetSelect]=useState(false)
    const [search, setSearch] = useState("");
    const [filteredAssets, setFilteredAssets]=useState([]);
    const [assetHover, setAssetHover]=useState(false)
    const [assetEdit, setAssetEdit]=useState(false)
    const inputRef=useRef();
    const editRef=useRef();
    console.log(assetSelect)
    console.log(userInfo)

    const [assetInput, setAssetInput]=useState(userInfo?.assetPortFolio ? userInfo?.assetPortFolio : {})

    // const handleInput=(event)=>{

    //     if(!event.target.value){
           
            
    //         return}

    //     setAssetInput({...assetInput, [event.target.name]:inputRef.current.value})}

    console.log(assetInput)
    console.log(inputRef)
    useEffect(()=>{
      if(userInfo?.assetPortFolio){
        
   
        setAssetInput(userInfo?.assetPortFolio ? userInfo?.assetPortFolio : {})
        console.log(assetInput)}
        
      },[userInfo?.assetPortFolio,assetInput])

      const portFolioAssets=useMemo(()=>{
        const userAsset=Object.keys(assetInput)
        console.log(userAsset)
        const filteredAssets=allAssets.filter((asset)=>userAsset?.includes(asset.name))
        // const filteredAssets=[]
        // for (let i=0; i<userAsset?.length; i++){
        //   for (let j=0; j<allAssets.length; j++){
        //     if (userAsset[i] === allAssets[j].name){
        //       filteredAssets.push(allAssets[j])
        //       break
        //     }
        //   }
        // }
        return filteredAssets
      },[assetInput,allAssets])
      console.log(portFolioAssets)
      console.log(Object.values(assetInput))

      const addHandler=async(event)=>{
        event.preventDefault();
        console.log(assetInput)
        // const val=Object.values(assetInput)
        // for (let i=0; i<val.length; i++){
        //     if(!val[i] || val[i]==0){return alert("You should add at least 1 asset")}
        //     // assetInput[i].value=parseInt(assetInput[i].value)
        
        // }
       if(!inputRef.current.value || inputRef.current.value<=0){return toast.error("You should add at least 1 asset")}
       const selectedName=assetSelect.name
         const enteredInput={
          ...userInfo,
          assetPortFolio:{...assetInput, [selectedName]: inputRef.current.value}
      
      }
      
    
      
      
      const data=await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
          method:"POST",
          headers:{"content-type":"application/json"},
          body:JSON.stringify({enteredInput})
      }).then((res)=>{if(res.ok){toast.success("Your Information has added");}else{toast.error("Fetch Error")}})
      setAssetSelect(false)
      mutate()
      }

      
      const editHandler=async(event)=>{
        event.preventDefault();
        console.log(assetInput)
        // const val=Object.values(assetInput)
        // for (let i=0; i<val.length; i++){
        //     if(!val[i] || val[i]==0){return alert("You should add at least 1 asset")}
        //     // assetInput[i].value=parseInt(assetInput[i].value)
        
        // }
       if(!editRef.current.value || editRef.current.value<=0){return toast.error("You should add at least 1 asset")}
    //    const selectedName=assetEdit
         const enteredInput={
          ...userInfo,
          assetPortFolio:{...assetInput, [assetEdit]: editRef.current.value}
      
      }
      const data=await fetch(`http://localhost:3000/api/auth/updateUserInfo`,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({enteredInput})
    }).then((res)=>{if(res.ok){toast.success("Your portfolio has updated");}else{toast.error("Fetch Error")}})
    mutate()
}
      const deleteHandler=async(event)=>{
        event.preventDefault();
        console.log(assetInput)
        // const val=Object.values(assetInput)
        // for (let i=0; i<val.length; i++){
        //     if(!val[i] || val[i]==0){return alert("You should add at least 1 asset")}
        //     // assetInput[i].value=parseInt(assetInput[i].value)
        
        // }
    //    if(!editRef.current.value || editRef.current.value<=0){return alert("You should add at least 1 asset")}
    //    const selectedName=assetEdit
    const deletedAssets={...assetInput}
  
    delete deletedAssets[assetHover]

         const enteredInput={
          ...userInfo,
          assetPortFolio:{...deletedAssets}
      
      }
      const data=await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({enteredInput})
    }).then((res)=>{if(res.ok){toast.success("Deleted");}else{toast.error("Fetch Error")}})
    mutate()
}


    // Filtering Main 4 Crypto
    const mainCard=useMemo(()=>{
        const totalData=JSON.parse(JSON.stringify(allAssets))
      const defaultCrypto=totalData.filter((coin) =>coin.cat=="Crypto")
            // coin.name=="Bitcoin"|| coin.name=="Ethereum" || coin.name=="Ripple" || coin.name=="Cardano")
            defaultCrypto.splice(4,0,defaultCrypto[0])
            defaultCrypto.splice(0,1)

            return defaultCrypto

          },[allAssets])

    // Searching Method
    useEffect(() => {
        if(search){
        setFilteredAssets(
          allAssets.filter((asset) =>
            asset.name.toLowerCase().includes(search.toLowerCase())
          )
        )};
        
    
      }, [search]);

      const assetChartData=useMemo(()=>{
        const chartData=[]
        let objKey=Object.keys(assetInput)
        // let objVal=Object.values(assetInput).map((p)=>parseInt(p))
        const filteredAssets=allAssets.filter((asset)=>objKey?.includes(asset.name))
        for(let i=0; i<filteredAssets.length;i++){
            let obj={name:filteredAssets[i].name, value:(assetInput[filteredAssets[i].name]*filteredAssets[i].price)}
            chartData.push(obj)
        }
        // for (let i=0; i<objKey.length; i++){
        //   let obj={name:objKey[i],value:objVal[i]*filteredAssets[i].price}
        //   chartData.push(obj)
        // }

        return chartData
      },[assetInput])
      console.log(assetChartData)
      console.log(assetEdit)
      console.log(portFolioAssets)
      // if(isValidating){return <Loading></Loading>}
    
 
    return(
                        <div className={` container-line mt-5 `}>
                  <div className={`flex justify-end items-center`}>
                  <div className={`flex-1 `}>
                <AssetChart data={assetChartData}></AssetChart>
                </div>
        <div className={`flex-1  h-500 overflow-auto`}>
            
        <ul className={`mb-10 `}>{portFolioAssets.map((asset)=>assetHover===asset.name ? 
        assetEdit===asset.name ? 
        <li key={asset.ticker} onMouseOver={()=>{setAssetHover(asset.name)}} onMouseLeave={()=>{setAssetHover(false); setAssetEdit(false)}}  className={`bg-white border-b hover:bg-gray-50 flex items-center justify-between px-4 py-2 gap-3 max-[1024px]:gap-6 `}>
       
        <Image  width="24px" height="24px" src={`/img/${asset.ticker}.png`} alt={`${asset.name}`}/>
        <p className={`font-medium`}>{asset.name}</p>
        <input min={1} ref={editRef} className={`form-input`} defaultValue={assetInput[asset.name]} type="number"></input>
        <AiOutlineCheck className={`cursor-pointer hover:bg-gray-100`} onClick={editHandler}/>

        <BiArrowBack className={`cursor-pointer hover:bg-gray-100`} onClick={()=>{setAssetEdit(false)}}/>
        </li> :


        <li key={asset.ticker} onMouseOver={()=>{setAssetHover(asset.name)}} onMouseLeave={()=>{setAssetHover(false)}}  className={`bg-white border-b hover:bg-gray-50 flex items-center justify-between px-4 py-2 gap-3 max-[1024px]:gap-6 `}>
        <AiOutlineEdit onClick={()=>{setAssetEdit(asset.name)}} className={`cursor-pointer hover:bg-gray-100`} />
        <TiDeleteOutline onClick={deleteHandler}  className={`cursor-pointer hover:bg-gray-100`}/>
        <Image  width="24px" height="24px" src={`/img/${asset.ticker}.png`} alt={`${asset.name}`}/>
        <p className={`font-medium`}>{asset.name}</p>
        <p className={``}>{assetInput[asset.name]}</p>
        <p className={``}>{(parseInt(assetInput[asset.name])*asset.price).toFixed(4)}</p>
        </li> : 
        <li key={asset.ticker} onMouseOver={()=>{setAssetHover(asset.name)}} onMouseLeave={()=>{setAssetHover(false)}}  className={`bg-white border-b hover:bg-gray-50 flex items-center justify-between px-4 py-2 gap-3 max-[1024px]:gap-6 `}>
        <Image  width="24px" height="24px" src={`/img/${asset.ticker}.png`} alt={`${asset.name}`}/>
        <p className={`font-medium`}>{asset.name}</p>
        <p className={``}>{assetInput[asset.name]}</p>
        <p className={``}>{(parseInt(assetInput[asset.name])*asset.price).toFixed(4)}</p>
        </li>)}</ul>
        <div className={`flex items-center max-w-md  mb-8 relative  `}>
            
            <input type="text"  disabled={assetSelect ? true : false} onChange={(e) => setSearch(e.target.value)} className={`w-full form-input`} placeholder="Search for assets"></input>
            <FaSearch className={`absolute right-5 text-gray-500`}></FaSearch>
        </div>
        
        { !assetSelect ?
        <div className={`card-list`}>
         
            {!search 
            ? <ul className={`grid   2xl:grid-cols-1 xl:grid-cols-1 grid-cols-1 `}>
              {(mainCard.map((asset)=>(Object.keys(assetInput).includes(asset.name) ? <li key={asset.name}><MiniCard key={asset.name} setDisabled={true} asset={asset} assetClick={()=>{setAssetSelect(asset)}} assetSelect={assetSelect}  onClick={addHandler}></MiniCard></li> : <li key={asset.name}><MiniCard key={asset.name} asset={asset} assetClick={()=>{setAssetSelect(asset)}} assetSelect={assetSelect}  onClick={addHandler}></MiniCard></li> )))}
              </ul>
            : (search && filteredAssets.length>0 ?
              <ul className={`grid   2xl:grid-cols-1 xl:grid-cols-1 grid-cols-1`}>
              {(filteredAssets.map((asset)=>(Object.keys(assetInput).includes(asset.name) ? <li key={asset.name}><MiniCard key={asset.name} setDisabled={true} asset={asset} assetClick={()=>{setAssetSelect(asset)}} assetSelect={assetSelect}  onClick={addHandler}></MiniCard></li> : <li key={asset.name}><MiniCard key={asset.name} asset={asset} assetClick={()=>{setAssetSelect(asset)}} assetSelect={assetSelect}  onClick={addHandler}></MiniCard></li> )))}
              
              </ul>
            : (<ul className={`grid grid-cols-1`}>
                <li className={`w-full h-80 flex flex-col items-center justify-center`}>
                  <Image width="140px" height="156px" src={`/img/coin_character.png`} alt={``}></Image>
                  <h2 className={`text-4 mt-4`}>No Search Result</h2>
                  <p className={`text-6 font-light`}>We are going to add an information as soon as possible</p>
                </li>
              </ul>))} 
        </div> :
        <div className={'card-list '}> 
        <ul className={`grid   2xl:grid-cols-1 xl:grid-cols-1 grid-cols-1 `}>
     <li className={`inline-block`}><TiDeleteOutline className={`cursor-pointer hover:bg-gray-100 inline`} onClick={()=>{setAssetSelect(false)}}/><MiniCard ref={inputRef} asset={assetSelect} assetSelect={assetSelect}  onClick={addHandler}></MiniCard></li>
      </ul> </div>}
      </div> 
     
      
      </div>
      </div>

    )
}

export default PortfolioSearch

