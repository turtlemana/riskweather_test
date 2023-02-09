import {AiOutlineSearch} from 'react-icons/ai'
import React, {useEffect, useState,useMemo} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {signOut} from "next-auth/react"
import { useSession } from 'next-auth/react';
import {CgProfile} from 'react-icons/cg'
import useInterval from '../../public/useInterval';
import axios from 'axios';
import HeaderSearch from '../HeaderSearch';
import useSWR from 'swr';


const fetcher=(url)=>axios.get(url).then((res)=>res.data)

const Header=()=>{
    // const {data:userInfo, error, mutate}=useSWR("/api/auth/getUser",fetcher)
    const {data:allAssets, error, mutate}=useSWR("/api/allAssets",fetcher)

//     console.log(allAssets)
//     const mainData=useMemo(()=>{    
//         const totalData=JSON.parse(JSON.stringify(allAssets))
//         const filteredData=totalData.filter((asset)=>asset.name!='Bitcoin'&& asset.name!='Ethereum'&& asset.name!='Cardano'&& asset.name!='Ripple' && asset.name!='BNB'&& asset.name!='Litecoin'&& asset.name!='Dash'&& asset.name!='Bitcoin cash')
//     const mainData=mainCard.concat(filteredData)
// return mainData},[mainCard,allAssets])
// console.log(mainData)


    // Fetching data for each 5 minutes (coin data)

    // const [exploreData,setExploreData]=useState(mainData)

    // useInterval(async ()=>{
    //     const result=await axios.get(`https://riskweather.org/api/Crypto5min`)
    //     const res=[...allAssets].filter((asset)=>asset.name!='Bitcoin'&& asset.name!='Ethereum'&& asset.name!='Cardano'&& asset.name!='Ripple' && asset.name!='BNB'&& asset.name!='Litecoin'&& asset.name!='Dash'&& asset.name!='Bitcoin cash')
    //     const exploreRes=result.data.concat(res)
    //     setExploreData(exploreRes)

    
    // },310000
    // )

    // Fetching data for each 5 minutes (coin data)

    // const router=useRouter();
    const {data:session} = useSession();
    const router=useRouter()
    const [curPath,setCurPath]=useState();

    useEffect(()=>{setCurPath(router.asPath)},[router.asPath])
    return (
        <div className={`w-full  shadow-sm h-[100px] bg-white sticky z-50  pt-[35px] `}>
            <div className={` flex ` + ((curPath === "/" || curPath === "/contact" ) ? `wrap2` : `wrap2`)}>
                <div className={`logo cursor-pointer hidden lg:block  `}>
                    <Link href='/'>
                        <a>
                        <Image width="296px" height="45px" src="/img/logo_risk_weather.png" alt="logo-img"></Image>
                        </a>
                    </Link>           
       

                </div>
                <div className={'w-full'}>
            
            <HeaderSearch assets={allAssets}/>
            </div>

  
                <div className={`menu`}>
     
                    <ul id="listItem" className={`flex gap-9 max-[450px]:gap-5 `}>
 
                        <li className={`text-6 hover:text-primary ` + ((curPath === "/") ? `text-primary font-medium` : ``)}>
                            <Link href='/'>Home</Link>
                        </li>
                        <li className={`text-6 hover:text-primary  `  + ((curPath === "/explore") ? `text-primary font-medium` : ``)}>
                            <Link href='/explore/'>Explore</Link>
                        </li>
                        <li className={`text-6 hover:text-primary  `  + ((curPath === "/learn") ? `text-primary font-medium` : ``)}>
                            <Link href='/learn'>Learn</Link>
                        </li>
                        <li className={`text-6 hover:text-primary  `  + ((curPath === "/contact") ? `text-primary font-medium` : ``)}>
                            <Link href='/contact'>Contact</Link>
                        </li>
                        <li className={`text-6 hover:text-primary  `  + ((curPath === "/company") ? `text-primary font-medium` : ``)}>
                            <Link href='http://www.juroinstruments.com/'>Company</Link>
                        </li>
                        {session?.user ?
                        <li>
                        <button onClick={()=>signOut({callbackUrl:'/auth/signin'})} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded w-[100px] relative">Sign Out</button>
                        </li> :  <button onClick={()=>{router.push({pathname:"/auth/signin"})}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]">Sign In</button>}
                        <li onClick={()=>{router.push({pathname:`/auth/profile`})}} className="text-[#8a939b] text-3xl font-black px-4 hover:text-primary cursor-pointer">
                            <CgProfile></CgProfile>

                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;
