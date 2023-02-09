import React,{useState,useEffect,useMemo} from 'react';

import WeatherCard from './WeatherCard';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import MiniCard from './MiniCard';
import { useRouter } from 'next/router';

const HeaderSearch=({assets})=>{
    const router=useRouter()
    const [search, setSearch] = useState("");
    const [filterAssets, setFilterAssets]=useState([]);
    const [visible, setVisible]=useState(true)




    // Searching Method
    useEffect(() => {
        if(search){
        setFilterAssets(
          assets.filter((asset) =>
            asset.name.toLowerCase().includes(search.toLowerCase())
          )
        )};
        
    
      }, [search]);

    //   useEffect(()=>{router.events.on("routeChangeComplete",setSearch(""))},[router])
 
    
    return(
      <div className={'overflow-auto'}   >
        <div  className={`flex items-center max-w-xl m-auto mb-8 relative`}>
            <input      onFocus={(e)=>{setSearch(e.target.value)}} onBlur={()=>{setSearch("")}}   type="text" onChange={(e) => setSearch(e.target.value)} className={`w-full form-input z-50`} placeholder="Search for assets"></input>
            <FaSearch className={`absolute right-5 text-gray-500 z-50`}></FaSearch>
        </div>
       <div className={`z-50`}>
        
            {!search 
            ? <div></div>
            : (search && filterAssets.length>0 ?
              <ul  className={`grid   2xl:grid-cols-1 xl:grid-cols-1 grid-cols-1  m-auto z-50 overflow-y-scroll slim-scroll container-line `+ (filterAssets.length>=8 ? 'h-500' : "") }>
              {(filterAssets.map((card)=>(<li key={card.ticker}  onMouseDown={()=>{ router.push({pathname:`/detail/`, query:{asset:card.ticker}})}}><MiniCard key={card.ticker} asset={card}></MiniCard></li>)))}
              </ul>
            : (<ul className={`grid grid-cols-1`}>
                <li className={`w-full h-80 flex flex-col items-center justify-center container-line`}>
                  <Image width="140px" height="156px" src={`/img/coin_character.png`} alt={``}></Image>
                  <h2 className={`text-4 mt-4`}>No Search Result</h2>
                  <p className={`text-6 font-light`}>We are going to add an information as soon as possible</p>
                </li>
              </ul>))}
        </div>
      </div>

    )
}

export default HeaderSearch

