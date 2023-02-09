import React,{useState,useEffect,useCallback,useRef,useMemo} from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import ProfileImage from '../../components/ProfileImage'
import MiniCard from '../../components/MiniCard'
import useSWR from 'swr'
import fetcher from '../../public/utils/fetchUserInfo'
import Image from 'next/image'
// import {unstable_getServerSession} from 'next-auth/next'
import ProfileDetails from '../../components/ProfileDetails'
import {useRouter} from 'next/router'
import FormButton from '../../components/FormButton'
import {AiOutlineEdit} from 'react-icons/ai'
import {BiArrowBack} from 'react-icons/bi'
import Button from '../../components/Button'
import AssetChart from '../../components/chart/AssetChart'
import PortfolioSearch from '../../components/PortfolioSearch'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import {toast} from 'react-toastify'
import Loading from '../../components/Loading'


function Profile({allAssets,session}) {
  console.log(allAssets)
  const [onEdit, setOnEdit]=useState(false)
  const router=useRouter()
  // const session=useSession();
  if(!session){router.push("/auth/signin")}

  console.log(session)  
  
  
  const {data:userInfo,error,isValidating,mutate}=useSWR("/api/auth/getUser",fetcher)
  console.log(userInfo?.accessLevel)

  const accessLevel=userInfo?.accessLevel
  if(accessLevel==1){router.push("/auth/userinfo")}
  const interestedAssets=useMemo(()=>{
    const userAsset=userInfo?.interestedAssets
    
    const filteredAssets=[]
    for (let i=0; i<userAsset?.length; i++){
      for (let j=0; j<allAssets.length; j++){
        if (userAsset[i] === allAssets[j].name){
          filteredAssets.push(allAssets[j])
          break
        }
      }
    }
    return filteredAssets
  },[userInfo,allAssets])
  console.log(interestedAssets)
  const bannerInputRef=useRef(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const imageButtonClick = e => {
    e.preventDefault();
    bannerInputRef.current.click();

    
  };
  
  const imageChange=async(e)=>{
    console.log(e.target.files[0])
    const i = e.target.files[0];
    setBannerImage(i);
    setCreateObjectURL(URL.createObjectURL(i));
    
    const enteredInput={
      ...userInfo,
      bannerImage:createObjectURL

  }
    const bannerImageData=await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({enteredInput})
  })

}

const assetPercent=useMemo(()=>{
  const checkedAssets={}
  for (let i=0; i<userInfo?.interestedAssets?.length; i++){
      checkedAssets[userInfo?.interestedAssets[i]]=0
  }
  return checkedAssets
},[userInfo])
console.log(assetPercent)

const [percentInput, setPercentInput]=useState(userInfo?.portFolio ? userInfo?.portFolio : assetPercent  ? assetPercent : "")

const handleInput=(event)=>{
  // let val=Object.values(percentInput).map((p)=>parseInt(p))
  // let sumVal=val.reduce((a,b)=>a+b,0)
  // console.log(sumVal)
  if(!event.target.value){return}
  setPercentInput({...percentInput,[event.target.name]:event.target.value})}
  // if(sumVal != 100){alert("Should be less than 100")}
  // else{
  
  console.log(percentInput)
  console.log(userInfo?.portFolio)
  const [chartData,setChartData]=useState(userInfo?.assetPortFolio)
  console.log(chartData)
  // setPercentInput({...percentInput,[event.target.name]:event.target.value})}
  useEffect(()=>{
   
    setPercentInput(userInfo?.portFolio ? userInfo?.portFolio : assetPercent)

    
  },[userInfo?.portFolio,assetPercent,userInfo?.interestedAssets])
console.log(percentInput)
  const sumVal=useMemo(()=>{
    
    let val= Object.values(percentInput).map((p)=>parseInt(p))
    let sumVal=val.reduce((a,b)=>a+b,0)
    return sumVal


  },[percentInput,interestedAssets,userInfo?.interestedAssets])

  const assetChartData=useMemo(()=>{
    const chartData=[]
    let objKey=Object.keys(percentInput)
    let objVal=Object.values(percentInput).map((p)=>parseInt(p))
    for (let i=0; i<objKey.length; i++){
      let obj={name:objKey[i],value:objVal[i]}
      chartData.push(obj)
    }
    return chartData
  },[percentInput,userInfo?.portFolio])
  console.log(assetChartData)

  const backHandler=()=>{
    setOnEdit(false)
    setPercentInput(userInfo?.portFolio ? userInfo?.portFolio : assetPercent)
  }

console.log(userInfo?.assetPortFolio)
const submitHandler=async(event)=>{
  event.preventDefault();
  console.log(percentInput)
  let val=Object.values(percentInput).map((p)=>parseInt(p))
  let sumVal=val.reduce((a,b)=>a+b,0)
  console.log(sumVal)
   if(sumVal != 100){return alert("You have to fit 100%")}
   const enteredInput={
    ...userInfo,
    portFolio:percentInput

}



const data=await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({enteredInput})
}).then((res)=>{if(res.ok){alert("Your Information has added");}else{alert("Fetch Error")}})

setOnEdit(false)
}


// if(isValidating){return <Loading></Loading>}

  return (
  
   
    <div className="min-h-screen">
      <Header></Header>
        {/* <div className={`h-[50vh] w-screen overflow-hidden flex justify-center items-center`}>
            <img onClick={imageButtonClick} ref={bannerInputRef} className={`w-full object-cover`} src={userInfo?.bannerImage ? `/img/banner_band.png` : `/img/banner_band.png`} alt="banner"></img>
            <input type="file"
          accept='image/jpg,image/png,image/jpeg,image/gif' 
             ref={bannerInputRef}
             style={{ display: "none" }}
             onChange={imageChange} />
        </div> */}
        <div className="my-40 wrap2 max-[1280px]:wrap4">
        <div className={`flex flex-col items-center container-lg text-black`}>
          
            <div className={ `container p-6`}>
            <div className={`container-line`}>
                <div className={`flex`}>
                    <div className={ `flex-1 mr-4 `}>
                        <ProfileImage userInfo={userInfo} profileImg={userInfo?.profileImage}></ProfileImage>                    
                        </div>
                        {/* <p className={``}>Edit Profile</p> */}
                        <AiOutlineEdit className={`flex-end text-black inline ml-2 cursor-pointer  text-[1.8rem]`} onClick={()=>{router.push({pathname:'/auth/userinfo'})}}/>

                    </div>
                    <div className={`flex-2 ml-4 mt-4`}>
                        <ProfileDetails userInfo={userInfo} ></ProfileDetails>
                        
                    </div>
                </div>
                {/* <div className={` container-line mt-5 `}>
                  <div className={`flex justify-end items-center`}>
                  <div className={`flex-1 `}> */}
                {/* <AssetChart data={userInfo?.assetPortFolio}></AssetChart> */}
                {/* </div> */}
     
                  <PortfolioSearch allAssets={allAssets} />
                  {/* {allAssets.map((asset)=><MiniCard key={asset.ticker} asset={asset}/>)} */}
   
                {/* </div>
                </div> */}
                   
                    {interestedAssets.length>=1 ?  <div className={" container-line flex mt-5"}>
                   
                      <form onSubmit={submitHandler} className={`flex-1`}>
                      {onEdit && <div className={' flex text-lg font-bold justify-start mb-5'}>Percent : {sumVal} %</div>}
                     {interestedAssets.map((asset)=>(
                      <div key={asset.ticker}   className={`mr-4 inline cursor-pointer`}>
                        <Image onClick={()=>{router.push({pathname:'/detail', query:{asset:asset.ticker}})}}  width="48px" height="48px" src={`/img/${asset.ticker}.png`} alt={`${asset.name}`}></Image>
                        <h4 className={`text-6  mb-0 max-[1280px]:text-[12px] mr-4 inline`}>{asset.name}</h4>
                      
                       {onEdit && <input className={'form-input inline mr-5'} onWheel={ event => event.currentTarget.blur() } defaultValue={(userInfo?.portFolio ? ((userInfo?.portFolio)[asset.name] ? (userInfo?.portFolio)[asset.name]  : 0): assetPercent[asset.name])}max="100" min="1" required id={asset.name} type="number" onChange={handleInput} name={asset.name}/>}
                        <div className={`text-6  mb-0 max-[1280px]:text-[12px] mr-4 inline font-bold`}>{userInfo?.portFolio ? ((userInfo?.portFolio)[asset.name] ? (userInfo?.portFolio)[asset.name]+" %" : 0) : assetPercent[asset.name]}</div>
                        </div>
                        
                       )) }
                        {onEdit &&
                            <div className={`flex justify-end`}>
                                <FormButton name="Submit" size={`w-[150px]`}></FormButton>
                            </div> }                      
                      </form> 
                      {onEdit ? <BiArrowBack className={`flex-end text-black inline ml-2 cursor-pointer  text-[1.8rem]`} onClick={backHandler}/> : 
                      <AiOutlineEdit className={`flex-end text-black inline ml-2 cursor-pointer  text-[1.8rem]`} onClick={()=>{setOnEdit(true)}}/>
                      
                      }
                    </div> : 
                    <div className={" container-line flex"}>
                      <div className={'flex-1 justify-center text-lg'}>No Assets to display</div>
                    <div className={`flex justify-end`}>
                    <Button name="Add Assets" link={'/auth/userinfo'} size={`w-[150px]`}></Button>
                    
                </div>
                
                </div>}

                    {/* <form onSubmit={emailSubmitHandler}>
                    <input type="email" value={email} onChange={emailChangeHandler}></input>
                    <button type="submit">Email Change</button>
                    </form> */}
                </div>
                
            </div>
                    
        

            </div>

        <Footer/>
    </div>
  )
}

export default Profile

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res,authOptions)
  const res = await fetch(`http://localhost:8000/api/AllAssets`)
  // const data=JSON.stringify(res)
  const allAssets= await res.json()
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
     allAssets,session
    },
  }
}