import React,{useState,useEffect,useMemo} from "react";
import Image from "next/image";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import {useRouter} from "next/router";
import {AiOutlineGlobal} from 'react-icons/ai'

import ReactTooltip from 'react-tooltip';
import Ad from '/public/img/country/ad.svg'
import Vercel from '/public/vercel.svg'
import SnowStorm from '/public/img/snowstorm2.svg'
import Dry from '/public/img/dry2.svg'
import HeavySnow from '/public/img/heavy_snow2.svg'
import Freezy from '/public/img/freezy2.svg'
import Drought from '/public/img/drought2.svg'
import HeavyRain from '/public/img/heavy_rain2.svg'
import Humid from '/public/img/humid2.svg'
import Shower from '/public/img/shower2.svg'
import Rainy from '/public/img/rainy2.svg'
import Smoke from '/public/img/smoke2.svg'
import PartlyCloud from '/public/img/partly_cloud2.svg'
import MostlyCloud from '/public/img/mostly_cloud2.svg'
import Sunny from '/public/img/sunny2.svg'
import Snowy from '/public/img/snowy2.svg'
import ThunderStorm from '/public/img/thunderstorm2.svg'
import Volcano from '/public/img/volcano2.svg'
import Windy from '/public/img/windy2.svg'

import SnowStorm1 from '/public/img/snowstorm.svg'
import Dry1 from '/public/img/dry.svg'
import HeavySnow1 from '/public/img/heavy_snow.svg'
import Freezy1 from '/public/img/freezy.svg'
import Drought1 from '/public/img/drought.svg'
import HeavyRain1 from '/public/img/heavy_rain.svg'
import Humid1 from '/public/img/humid.svg'
import Shower1 from '/public/img/shower.svg'
import Rainy1 from '/public/img/rainy.svg'
import Smoke1 from '/public/img/smoke.svg'
import PartlyCloud1 from '/public/img/partly_cloud.svg'
import MostlyCloud1 from '/public/img/mostly_cloud.svg'
import Sunny1 from '/public/img/sunny.svg'
import Snowy1 from '/public/img/snowy.svg'
import ThunderStorm1 from '/public/img/thunderstorm.svg'
import Volcano1 from '/public/img/volcano2.svg'
import Windy1 from '/public/img/windy.svg'
import Icon_light from '/public/img/icon_lights.svg'
import WeatherCard from '../WeatherCard'

// Geo Json data & Map width/ Height
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
const mapWidth = 800;
const mapHeight = 600;

const markers=[
    {markerOffset: 25, name: "Brasilia", country:"Brazil", coordinates: [-47.8825, -15.7942],ticker:"^BVSP",countryCode:"br"},
    {markerOffset: 25, name: "New Delhi", country:"India", coordinates: [77.2, 28.6], ticker:"^BSESN",countryCode:"in" },
    {markerOffset: 25, name: "Beijing", country:"China",coordinates: [116.383333, 39.9166666666666],ticker:"399001.SZ" ,countryCode:"cn"},
    {markerOffset: 25, name: "Paris", country:"France",coordinates: [2.333333, 48.8666666666666],ticker:"^FCHI",countryCode:"fr" },
    {markerOffset: 25, name: "Washington", country:"United States",coordinates: [-77, 38.8833], ticker:"^IXIC" ,countryCode:"us" },
   //  {markerOffset: 25, name: "Hanoi", country:"Vietnam",coordinates: [105.85, 21.03333],countryCode:"VN" },
    {markerOffset: 25, name: "Seoul", country:"Korea",coordinates: [126.9833, 37.55], ticker:"^KS11" ,countryCode:"kr"},
    {markerOffset: 25, name: "Tokyo", country:"Japan",coordinates: [139.75, 35.6833],ticker:"^N225" ,countryCode:"jp"},
    {markerOffset: 25, name: "Berlin", country:"Germany",coordinates: [13.4, 52.51667],ticker:"^GDAXI" ,countryCode:"de"},
   //  {markerOffset: 25, name: "Amsterdam", country:"Netherland",coordinates: [4.916667, 52.35] ,countryCode:"NL"},
   //  {markerOffset: 25, name: "Taipei", country:"Taiwan",coordinates: [121.5167, 25.03333] ,countryCode:"TW"},
    {markerOffset: 25, name: "London", country:"United Kingdom",coordinates: [-0.083333, 51.5],ticker:"^FTSE" ,countryCode:"gb"},
]

const RiskMap=({allAssets})=>{
   const router=useRouter()
    const [isMounted,setIsMounted] = useState(false);
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 ,color:"#EAEAEC"});
    const [mapMarkers, setMapMarkers]=useState(markers)
    const [content, setContent]=useState("")
    const filteredIndexData=useMemo(()=>{return allAssets.filter((asset)=>asset.cat=="Index")},[allAssets])
    const filteredStockData=useMemo(()=>{return allAssets.filter((idx) =>
      idx.cat=="Stock")},[allAssets])
   const [stockList,setStockList]=useState()
   console.log(stockList)
   useEffect(()=>{
      for (let i=0; i<filteredIndexData.length; i++){
         if(filteredIndexData[i].ticker=="^BSESN"){
            filteredIndexData[i].country="India"
            filteredIndexData[i].countryCode="in"
            filteredIndexData[i].onClick={zoomIndia}
         }
         else if(filteredIndexData[i].ticker=="^BVSP"){
            filteredIndexData[i].country="Brazil"
            filteredIndexData[i].countryCode="br"
            filteredIndexData[i].onClick={zoomBrazil}
         }
         else if(filteredIndexData[i].ticker=="^FCHI"){
            filteredIndexData[i].country="France"
            filteredIndexData[i].countryCode="fr"
            filteredIndexData[i].onClick={zoomFrance}
         }
         else if(filteredIndexData[i].ticker=="^FTSE"){
            filteredIndexData[i].country="United Kingdom"
            filteredIndexData[i].countryCode="gb"
            filteredIndexData[i].onClick={zoomUK}
         }
         else if(filteredIndexData[i].ticker=="^GDAXI"){
            filteredIndexData[i].country="Germany"
            filteredIndexData[i].countryCode="de"
            filteredIndexData[i].onClick={zoomGermany}
         }
         else if(filteredIndexData[i].ticker=="399001.SZ"){
            filteredIndexData[i].country="China"
            filteredIndexData[i].countryCode="cn"
            filteredIndexData[i].onClick={zoomChina}
         }
         else if(filteredIndexData[i].ticker=="^IXIC"){
            filteredIndexData[i].country="United States"
            filteredIndexData[i].countryCode="us"
            filteredIndexData[i].onClick={zoomUS}
         }
         else if(filteredIndexData[i].ticker=="^KS11"){
            filteredIndexData[i].country="Korea"
            filteredIndexData[i].countryCode="kr"
            filteredIndexData[i].onClick={zoomKorea}
         }
         else if(filteredIndexData[i].ticker=="^N225"){
            filteredIndexData[i].country="Japan"
            filteredIndexData[i].countryCode="jp"
            filteredIndexData[i].onClick={zoomJapan}
         } 
      }
   },[filteredIndexData])
   console.log(filteredIndexData)


useEffect(()=>{
    setIsMounted(true);
    for (let i=0; i<markers.length; i++){
        for (let j=0; j<filteredIndexData.length; j++){
        if(markers[i].ticker == filteredIndexData[j].ticker){
          markers[i].weather=filteredIndexData[j].weather
          markers[i].assetName=filteredIndexData[j].name
          markers[i].risk=(filteredIndexData[j].tailriskchg)
          markers[i].onClick=(filteredIndexData[j].onClick)
        }}
      }
},[filteredIndexData])

const availableIndex=filteredIndexData?.filter((index)=>index?.onClick)
console.log(availableIndex)
useEffect(()=>{
      if (mapMarkers.length>=2){
         setStockList()
            }
      if (mapMarkers[0].name =="Washington"){
        setStockList(filteredStockData.filter((stock)=>stock.name=="Microsoft"||stock.name=="Amazon"||stock.name=="MicroStrategy"||stock.name=="JPMorgan"||stock.name=="Bank of America"||stock.name=="Google"||stock.name=="Marathon Digital"||stock.name=="Nvidia"||stock.name=="PayPal"||stock.name=="Block"||stock.name=="Tesla"||stock.name=="Apple"))
      }
      if (mapMarkers[0].name =="Amsterdam"){
        setStockList(filteredStockData.filter((stock)=>stock.name=="ASML Holding"))
      }
      if (mapMarkers[0].name =="Seoul"){
         setStockList(filteredStockData.filter((stock)=>stock.name=="Samsung"))
      }
      if (mapMarkers[0].name =="Tokyo"){
         setStockList(filteredStockData.filter((stock)=>stock.name=="SoftBank"))
      }
      if (mapMarkers[0].name =="Beijing"){
         setStockList(filteredStockData.filter((stock)=>stock.name=="Tencent "||stock.name=="Alibaba Group"))
      }
      if (mapMarkers[0].name =="Taipei"){
         setStockList(filteredStockData.filter((stock)=>stock.name=="TSMC"))
      
    } 
},[filteredStockData, mapMarkers])

console.log(stockList)
console.log(filteredStockData)
console.log(mapMarkers)
function handleMoveEnd(position) {
   setPosition(position);
 }

 const handleFilter = ({ constructor: { name } }) => {
   return name !== "MouseEvent";
 };
    function zoomOut(){
        setPosition((pos)=>({...pos, zoom:1, coordinates:[0,0], name:""}))
        setMapMarkers(markers)

    }
    function zoomUS(){
        setPosition((pos)=>({...pos, zoom:2, coordinates:[-77, 38.8833],color:"#000000", name:"United States of America"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Washington")))
    }
    function zoomBrazil(){
        setPosition((pos)=>({...pos, zoom:4,  coordinates: [-47.8825, -15.7942], name:"Brazil"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Brasilia")))
    }
    function zoomIndia(){
        setPosition((pos)=>({...pos, zoom:2, coordinates: [77.2, 28.6],name:"India"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="New Delhi")))
    }
    function zoomChina(){
        setPosition((pos)=>({...pos, zoom:2, coordinates: [116.383333, 39.9166666666666], name:"China"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Beijing")))
    }
    function zoomFrance(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [2.333333, 48.8666666666666], name:"France"}));
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Paris")))
    }
    function zoomGermany(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [13.4, 52.51667], name:"Germany"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Berlin")))
    }
    function zoomNetherland(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [4.916667, 52.35], name:"Netherlands"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Amsterdam")))
    }
    function zoomKorea(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [126.9833, 37.55], name:"South Korea"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Seoul")))
    }
    function zoomJapan(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [139.75, 35.6833], name:"Japan"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Tokyo")))
    }
    function zoomTaiwan(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [121.5167, 25.03333], name:"Taiwan"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Taipei")))
    }
    function zoomVietnam(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [105.85, 21.03333], name:"Vietnam"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="Hanoi")))
    }
    function zoomUK(){
        setPosition((pos)=>({...pos, zoom:4, coordinates: [-0.083333, 51.5], name:"United Kingdom"}))
        setMapMarkers(markers)
        setMapMarkers((markers)=>(markers.filter((city)=>city.name==="London")))
    }

    return (
      
        <div data-tip="" className={'flex justify-center w-[3400px] h-[1800px]'}>
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="default-sidebar" className=" z-40 w-[400px] h-screen transition-transform -translate-x-full sm:translate-x-0 rounded-lg" aria-label="Sidebar">
   <div className="h-[1800px] px-3 py-4 overflow-y-auto container dark:bg-gray-800 text-lg font-bold text-center">
      <ul className="space-y-2 ">
         <li>
            <div onClick={zoomOut} className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <AiOutlineGlobal className="w-6 h-6"></AiOutlineGlobal>
               {/* <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg> */}
               <span className="ml-3 text-xl font-bold flex-1">World Risk weather</span>
            </div>
         </li>
       {!stockList ?  availableIndex?.map((index)=> <li key={index.ticker}>
            <div onClick={index.onClick? Object.values(index?.onClick)[0] : ""} className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Image width="28px" height="28px" src={`/img/country/${index.countryCode}.svg`} alt={`${index.countryCode}`}></Image>

               {/* <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg> */}
               <span className="flex-1 ml-3">{index.country}</span>
               <span className="flex-1 ml-3">{index.tailriskchg}</span>
               <Image width="28px" height="28px" src={`/img/${index.weather}.svg`} alt={`${index.weather}`}></Image>
            </div>
         </li>)
     
        : stockList.map((stock)=>(
         <li key={stock.ticker} >
         <div onClick={()=>{setMapMarkers((prev)=>[{...prev[0],assetName:stock.name, ticker:stock.ticker, weather:stock.weather, risk:stock.tailriskchg}])}} className="cursor-pointer flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
            <Image width="28px" height="28px" src={`/img/${stock.ticker}.png`} alt={`${stock.coinIcon}`}></Image>
            <span className="flex-1 ml-3 whitespace-nowrap">{stock.name}</span>
            <span className="flex-1 ml-3 whitespace-nowrap">{stock.tailriskchg}</span>
            <Image width="28px" height="28px" src={`/img/${stock.weather}.svg`} alt={`${stock.weather}`}></Image>
         </div>
      </li>
        ))}
      </ul>
   </div>
</aside>
<div className={`tab-content map-container-line  overflow-auto w-full h-full bg-[#AFD5F0]`}>

        <ComposableMap className={`w-full h-full m-auto`} projectionConfig={{}} projection={"geoMercator"}  >
            <ZoomableGroup center={position.coordinates} zoom={position.zoom}        onMoveEnd={handleMoveEnd}
          filterZoomEvent={handleFilter}>
    <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const country=geo.properties.name
            return(
            <Geography
              key={geo.rsmKey}
              geography={geo}
            fill={country==position.name ? "#1E3F66": "#FFFFFF"}
              stroke="#AFD5F0"
              style={{
               default: {
                 outline: "none",
               },
               hover: {
                 outline: "none",
               },
               pressed: {
                 outline: "none",
               },
             }}

            />)
})
        }
      </Geographies>

      {mapMarkers.map(({ name, coordinates,country,onClick, assetName,countryCode, ticker,markerOffset,risk,weather }) => (

        (<Marker key={coordinates} coordinates={coordinates}  >
         {mapMarkers.length>=2  
         ? <svg viewBox="130 0 800 800" >
            <foreignObject x="0" y="0"  width="150" height="80">
              <div onClick={onClick? Object.values(onClick)[0] : ""} className={`cursor-pointer w-full border items-center bg-white border-gray-100 p-3 rounded-lg flex text-[5px] opacity-80 justify-center`}>
              <Image  width="20px" height="25px" src={`/img/country/${countryCode}.svg`} alt={`${countryCode}`}></Image>
               <p className={`ml-5 text-[5px]`}>{name}</p>
               <div className={`ml-5`}>
              <Image  width="20px" height="20px" src={`/img/${weather}.svg`} alt={`${weather}`}></Image>
              </div>
               </div>          
            </foreignObject>
         </svg>
         : 
         <svg viewBox="450 -0 2800 2800">
         <foreignObject  width="250" height="500">
          <div className={`container-gray flex flex-col link`} onClick={()=>{router.push({pathname:`/detail/`, query:{asset:ticker}})}}>
        <div className={`icon-img flex flex-1 justify-center`}>
          <Image width="120px" height="120px" src={`/img/${weather}.svg`} alt={`${weather}`}></Image>
        </div>
        <div className={`flex basis-24 items-center justify-between bg-white p-5 rounded-b-lg`}>
          <div className={`flex items-center`}>
            <div className={`w-12 h-12 bg-gray-100 rounded-full `}>
              <Image width="48px" height="48px" src={`/img/${ticker}.png`} alt={`${ticker}`}></Image>
            </div>
            <div className={`ml-3`}>
              {name.length<13 ? <h4 className={`text-card max-[1280px]:text-card`}>{assetName}</h4>
              :  <p className={`text-card max-[1280px]:text-card  max-[1835px]:text-sm`}>{assetName}</p>}
              <p className={`text-7`}>{ticker}</p>
            </div>
          </div>
          <div>
            <p className={(risk > 0 ? `text-green max-[1280px]:text-8 ` : `text-red max-[1280px]:text-9 `) }>{risk}%</p>
          </div>
        </div>
    </div>
     
        </foreignObject>
        </svg>
         }
          <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1} />
           
            {/* <Vercel/> */}
            {/* <rect width="100" height="100" className={"bg-white opacity-10"}> <text>{risk}</text></rect> */}
            {/* {weather=="rainy" ? <Rainy1></Rainy1> : ''}
              {weather=="freezy" ? <Freezy1></Freezy1> : ''}
              {weather=="thunderstorm" ? <ThunderStorm1></ThunderStorm1> : ''}
              {weather=="mostly_cloud" ? <MostlyCloud1></MostlyCloud1> : ''}
              {weather=="partly_cloud" ? <PartlyCloud1></PartlyCloud1> : ''}
              {weather=="snowstorm" ? <SnowStorm1></SnowStorm1> : ''}
              {weather=="dry" ? <Dry1></Dry1> : ''}
              {weather=="drought" ? <Dry1></Dry1> : ''}
              {weather=="heavy_snow" ? <HeavySnow1></HeavySnow1> : ''}
              {weather=="heavy_rain" ? <HeavyRain1></HeavyRain1> : ''}
              {weather=="smoke" ? <Smoke1></Smoke1> : ''}
              {weather=="sunny" ? <Sunny1></Sunny1> : ''}
              {weather=="shower" ? <Shower1></Shower1> : ''}
              {weather=="windy" ? <Windy1></Windy1> : ''}
              {weather=="humid" ? <Humid1></Humid1> : ''}
              {weather=="snowy" ? <Snowy1></Snowy1> : ''}
              {weather=="volcano" ? <Volcano1></Volcano1> : ''} */}
        </Marker>)
        
      ))}
      </ZoomableGroup>
        </ComposableMap>
    
        </div>
        {/* {isMounted && content && 
        <ReactTooltip effect="float" place="right" borderColor="green" background="white" type="light">
         <div className={`w-64 my-2 text-6 z-40`}>
            <ul>
          <li className={`flex items-center`}>
            <div className={`basis-32 p-1`}>
          <p className={`w-32 whitespace-nowrap`}>City: {content.name}</p>
          <p className={`w-32 whitespace-nowrap`}>Index: {content.ticker}</p>
          <p className={`w-32 whitespace-nowrap`}>Risk change: {content.risk}</p>
          {console.log(content)}
          <Image width="48px" height="48px" src={`/img/${content.weather}.svg`} alt={`${content}`}></Image>

          </div>
          </li>
          </ul>
          </div>
         <div className={`w-64 my-2 text-6`}>

         </div>
         </ReactTooltip>} */}
        </div>
    )
}

export default RiskMap