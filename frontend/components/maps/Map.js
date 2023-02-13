import React,{useState,useEffect,useMemo} from "react";
import Image from "next/image";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
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
    {markerOffset: 25, name: "Brasilia", country:"Brazil", coordinates: [-47.8825, -15.7942],ticker:"^BVSP" },
    {markerOffset: 25, name: "New Delhi", country:"India", coordinates: [77.2, 28.6], ticker:"^BSESN" },
    {markerOffset: 25, name: "Beijing", country:"China",coordinates: [116.383333, 39.9166666666666],ticker:"399001.SZ" },
    {markerOffset: 25, name: "Paris", country:"France",coordinates: [2.333333, 48.8666666666666],ticker:"^FCHI" },
    {markerOffset: 25, name: "Washington", country:"United States",coordinates: [-77, 38.8833], ticker:"^IXIC" },
    {markerOffset: 25, name: "Hanoi", country:"Vietnam",coordinates: [105.85, 21.03333] },
    {markerOffset: 25, name: "Seoul", country:"Korea",coordinates: [126.9833, 37.55], ticker:"^KS11"},
    {markerOffset: 25, name: "Tokyo", country:"Japan",coordinates: [139.75, 35.6833],ticker:"^N225" },
    {markerOffset: 25, name: "Berlin", country:"Germany",coordinates: [13.4, 52.51667],ticker:"^GDAXI" },
    {markerOffset: 25, name: "Amsterdam", country:"Netherland",coordinates: [4.916667, 52.35] },
    {markerOffset: 25, name: "Taipei", country:"Taiwan",coordinates: [121.5167, 25.03333] },
    {markerOffset: 25, name: "London", country:"United Kingdom",coordinates: [-0.083333, 51.5],ticker:"^FTSE" },
]

const RiskMap=({allAssets})=>{
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
            filteredIndexData[i].onClick={zoomIndia}
         }
         else if(filteredIndexData[i].ticker=="^BVSP"){
            filteredIndexData[i].country="Brazil"
            filteredIndexData[i].onClick={zoomBrazil}
         }
         else if(filteredIndexData[i].ticker=="^FCHI"){
            filteredIndexData[i].country="France"
            filteredIndexData[i].onClick={zoomFrance}
         }
         else if(filteredIndexData[i].ticker=="^FTSE"){
            filteredIndexData[i].country="United Kingdom"
            filteredIndexData[i].onClick={zoomUK}
         }
         else if(filteredIndexData[i].ticker=="^GDAXI"){
            filteredIndexData[i].country="Germany"
            filteredIndexData[i].onClick={zoomGermany}
         }
         else if(filteredIndexData[i].ticker=="399001.SZ"){
            filteredIndexData[i].country="China"
            filteredIndexData[i].onClick={zoomChina}
         }
         else if(filteredIndexData[i].ticker=="^IXIC"){
            filteredIndexData[i].country="United States"
            filteredIndexData[i].onClick={zoomUS}
         }
         else if(filteredIndexData[i].ticker=="^KS11"){
            filteredIndexData[i].country="Korea"
            filteredIndexData[i].onClick={zoomKorea}
         }
         else if(filteredIndexData[i].ticker=="^N225"){
            filteredIndexData[i].country="Japan"
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
          markers[i].risk=(filteredIndexData[j].tailriskchg)
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
      
        <div data-tip="" className={'flex justify-center w-[2400px] h-[1800px]'}>
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
            <div onClick={zoomOut} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="ml-3 text-xl font-bold flex-1">World Risk weather</span>
            </div>
         </li>
       {!stockList ?  availableIndex?.map((index)=> <li key={index.ticker}>
            <div onClick={index.onClick? Object.values(index?.onClick)[0] : ""} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               
               <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               <span className="flex-1 ml-3">{index.country}</span>
               <span className="flex-1 ml-3">{index.tailriskchg}</span>
               <Image width="28px" height="28px" src={`/img/${index.weather}.svg`} alt={`${index.weather}`}></Image>
            </div>
         </li>)
      //  <div>
      //    <li>
      //       <div onClick={zoomUS} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
      //          <span className="flex-1 ml-3">United States</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomJapan} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">Japan</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomKorea} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">South Korea</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomChina} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">China</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomBrazil} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">Brazil</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomGermany} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">Germany</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomFrance} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">France</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomNetherland} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">Netherland</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomIndia} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">India</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomTaiwan} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">Taiwan</span>
      //       </div>
      //    </li>
      //    <li>
      //       <div onClick={zoomVietnam} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      //          <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd"></path></svg>
      //          <span className="flex-1 ml-3 whitespace-nowrap">Vietnam</span>
      //       </div>
      //    </li>
      // </div>
        : stockList.map((stock)=>(
         <li key={stock.ticker} >
         <div  className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
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
            <ZoomableGroup center={position.coordinates} zoom={position.zoom}>
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

      {mapMarkers.map(({ name, coordinates,country, ticker,markerOffset,risk,weather }) => (

        (<Marker key={coordinates} coordinates={coordinates} onMouseOver={()=>setContent({name:name, risk:risk, ticker:ticker, weather:weather})} onMouseLeave={()=>{setContent("")}} >
         
          <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1} />
            <text className={` text-xs opacity-80`}>{risk}</text>
            {/* <Vercel/> */}
            {/* <rect width="100" height="100" className={"bg-white opacity-10"}> <text>{risk}</text></rect> */}
            {weather=="rainy" ? <Rainy1></Rainy1> : ''}
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
              {weather=="volcano" ? <Volcano1></Volcano1> : ''}
        </Marker>)
        
      ))}
      </ZoomableGroup>
        </ComposableMap>
    
        </div>
        {isMounted && content && 
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

         {/* {filteredIndexData.map((card)=><WeatherCard key={card.ticker} name={card.name} weather={card.weather} ticker={card.ticker} coinIcon={card.ticker} figure={card.tailriskchg}></WeatherCard>)} */}
         </div>
         </ReactTooltip>}
        </div>
    )
}

export default RiskMap