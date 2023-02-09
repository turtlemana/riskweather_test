import React,{useState,useEffect,useMemo} from 'react';

import WeatherCard from './WeatherCard';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';



const SearchBar=({mainCard})=>{
    const [search, setSearch] = useState("");
    const [filterCoins, setFilterCoins]=useState([]);


    // Filtering Main 4 Crypto
    const mainCrypto=useMemo(()=>{
      const defaultCrypto=mainCard.filter((coin) =>
            coin.name=="Bitcoin"|| coin.name=="Ethereum" || coin.name=="Ripple" || coin.name=="Cardano")
            defaultCrypto.splice(4,0,defaultCrypto[0])
            defaultCrypto.splice(0,1)
            return defaultCrypto
          },[mainCard])

    // Searching Method
    useEffect(() => {
        if(search){
        setFilterCoins(
          mainCard.filter((coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase())
          )
        )};
        
    
      }, [search]);
    
    return(
      <div>
        <div className={`flex items-center max-w-xl m-auto mb-8 relative`}>
            <input type="text" onChange={(e) => setSearch(e.target.value)} className={`w-full form-input`} placeholder="Search for assets"></input>
            <FaSearch className={`absolute right-5 text-gray-500`}></FaSearch>
        </div>
        <div className={`card-list`}>
          
            {!search 
            ? <ul className={`grid 2xl:grid-cols-4 xl:grid-cols-2 grid-cols-1 gap-5`}>
              {(mainCrypto.map((card)=>(<li key={card.ticker}><WeatherCard key={card.ticker} ticker={card.ticker} name={card.name} 
                weather={card.weather} coinIcon={card.ticker} figure={card.tailriskchg}></WeatherCard></li>)))}
              </ul>
            : (search && filterCoins.length>0 ?
              <ul className={`grid 2xl:grid-cols-4 xl:grid-cols-2 grid-cols-1 gap-5`}>
              {(filterCoins.map((card)=>(<li key={card.ticker}><WeatherCard key={card.ticker} ticker={card.ticker} name={card.name} weather={card.weather} 
                coinIcon={card.ticker} figure={card.tailriskchg}></WeatherCard></li>)))}
              </ul>
            : (<ul className={`grid grid-cols-1`}>
                <li className={`w-full h-80 flex flex-col items-center justify-center`}>
                  <Image width="140px" height="156px" src={`/img/coin_character.png`} alt={``}></Image>
                  <h2 className={`text-4 mt-4`}>No Search Result</h2>
                  <p className={`text-6 font-light`}>We are going to add an information as soon as possible</p>
                </li>
              </ul>))}
        </div>
      </div>

    )
}

export default SearchBar

