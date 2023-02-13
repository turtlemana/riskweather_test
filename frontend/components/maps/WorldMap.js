import React,{useState,useEffect,useCallback,useMemo} from "react"
import { ComposableMap, Geographies, Geography,Annotation,ZoomableGroup,Marker } from "react-simple-maps"


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





// Geo Json data & Map width/ Height
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
const mapWidth = 800;
const mapHeight = 600;


// Assets Location data
const bitcoinLocArr = [
  
  { markerOffset: -30, name: "binance", coordinates: [30.581938,60.424384] },
  { markerOffset: -30, name: "binance", coordinates: [7.475274,9.062737] },
  { markerOffset: -30, name: "binance", coordinates: [-66.886075,10.478687] },
  { markerOffset: -30, name: "ftx", coordinates: [-145.336660,57.622742] },
  { markerOffset: -30, name: "kucoin", coordinates: [93.871714,21.321893] },
  { markerOffset: -30, name: "huobi", coordinates: [160.114303,62.407638] },
  { markerOffset: -30, name: "huobi", coordinates: [105.059583,11.891587] },
  { markerOffset: -30, name: "bitfinex2", coordinates: [0.444480,70.944235] },
  { markerOffset: -30, name: "gateio", coordinates: [95.064608,45.965165] },
  { markerOffset: -30, name: "currencycom", coordinates: [27.54463103299743,75.85235869617698] },
  { markerOffset: -30, name: "currencycom", coordinates: [-25.352196221544147,60.148101959976046] },
  { markerOffset: -30, name: "binanceus", coordinates: [-125.008951,41.334567] },
  { markerOffset: -30, name: "bitstamp", coordinates: [-20.10870224229678263,99.51564758306821] },
  { markerOffset: -30, name: "bitstamp", coordinates: [-110.483558,51.171461] },
  { markerOffset: -30, name: "mexc", coordinates: [100.397467,60.916324] },
  { markerOffset: -30, name: "poloniex", coordinates: [-71.105232,42.390756] },
  { markerOffset: -30, name: "upbit", coordinates: [144.024612,68.532600] },]
const ethLocArr = [
  
  { markerOffset: -30, name: "binance", coordinates: [30.581938,60.424384] },
  { markerOffset: -30, name: "binance", coordinates: [7.475274,9.062737] },
  { markerOffset: -30, name: "binance", coordinates: [-66.886075,10.478687] },
  { markerOffset: -30, name: "ftx", coordinates: [-145.336660,57.622742] },
  { markerOffset: -30, name: "kucoin", coordinates: [93.871714,21.321893] },
  { markerOffset: -30, name: "huobi", coordinates: [160.114303,62.407638] },
  { markerOffset: -30, name: "huobi", coordinates: [105.059583,11.891587] },
  { markerOffset: -30, name: "bitfinex2", coordinates: [0.444480,70.944235] },
  { markerOffset: -30, name: "gateio", coordinates: [95.064608,45.965165] },
  { markerOffset: -30, name: "currencycom", coordinates: [27.54463103299743,75.85235869617698] },
  { markerOffset: -30, name: "currencycom", coordinates: [-25.352196221544147,60.148101959976046] },
  { markerOffset: -30, name: "binanceus", coordinates: [-125.008951,41.334567] },
  { markerOffset: -30, name: "bitstamp", coordinates: [-20.10870224229678263,99.51564758306821] },
  { markerOffset: -30, name: "bitstamp", coordinates: [-110.483558,51.171461] },
  { markerOffset: -30, name: "mexc", coordinates: [100.397467,60.916324] },
  { markerOffset: -30, name: "poloniex", coordinates: [-71.105232,42.390756] },
  { markerOffset: -30, name: "upbit", coordinates: [144.024612,68.532600] },]

const indexLocArr = [
  
  { markerOffset: -30, name: "S&P500", coordinates: [-110.483558,54.171461], ticker:'^GSPC'},
  { markerOffset: -30, name: "NASDAQ", coordinates: [-160.336660,60.622742], ticker:'^IXIC'},
  { markerOffset: -30, name: "RUSSELL2000", coordinates: [-132.277950,54.924603], ticker:'^RUT'},
  { markerOffset: -30, name: "CBOE VIX", coordinates: [-112.634201,47.126258], ticker:'^VIX'},
  { markerOffset: -30, name: "KOSPI", coordinates: [144.024612,71.532600], ticker:'^KS11'},
  { markerOffset: -30, name: "Shenzhen", coordinates: [113.597049,47.879575], ticker:'399001.SZ'},
  { markerOffset: -30, name: "HangSeng", coordinates: [96.409739,37.182173], ticker:'^HSI'},
  { markerOffset: -30, name: "Nikkei225", coordinates: [160.114303,65.407638], ticker:'^N225'},
  { markerOffset: -30, name: "Sensex", coordinates: [70.119975,41.937818], ticker:'^BSESN'},
  { markerOffset: -30, name: "DAX", coordinates: [3.504495,85.524521], ticker:'^GDAXI'},
  { markerOffset: -30, name: "FTSE100", coordinates: [-23.109335,102.356979], ticker:'^FTSE'},
  { markerOffset: -30, name: "CAC40", coordinates: [-30.111443,68.286103], ticker:'^FCHI'},
  { markerOffset: -30, name: "Bovespa", coordinates: [-67.687097,8.594383], ticker:'^BVSP'},
  { markerOffset: -30, name: "Shanghai", coordinates: [ 101.537296,54.209065], ticker:'000001.SS'}]


const stockLocArr=[
{ markerOffset: -30, location: "SANFRANCISCO", coordinates: [-144.336660,47.622742],stocks:[]},
{ markerOffset: -30, location: "NEW YORK", coordinates: [-101.483558,49.171461],stocks:[]},
{ markerOffset: -30, location: "SEATLE", coordinates: [-151.336660,57.622742],stocks:[]},
{ markerOffset: -30, location: "COLUMBIA", coordinates: [-120.634201,50.126258],stocks:[]},
{ markerOffset: -30, location: "NETHERLANDS", coordinates: [-8.406009,69.416870],stocks:[]},
{ markerOffset: -30, location: "KOREA", coordinates: [124.024612,51.532600],stocks:[]},
{ markerOffset: -30, location: "JAPAN", coordinates: [129.114303,46.407638],stocks:[]},
{ markerOffset: -30, location: "CHINA", coordinates: [104.537296,38.209065],stocks:[]},
{ markerOffset: -30, location: "TAIWAN", coordinates: [100.969440,28.812555],stocks:[]}]



export default function MapChart({allAssets,cryptoExchange}) {
  const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip
  const [isActive, setIsActive]=useState('bitcoin')
  const [content,setContent] = useState("");
  const [riskContent, setRiskContent] = useState("");
  const [weatherContent, setWeatherContent] = useState("");
  const [stockContent, setStockContent] = useState([]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });


  // Map zoom in and out, mouse event handler
  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const handleFilter = ({ constructor: { name } }) => {
    return name !== "MouseEvent";
  };


  // Filtering each assets data
  const filteredBitcoinData=useMemo(()=>{return cryptoExchange.filter((coin) =>
    coin.ticker.slice(0,3)=="BTC")},[cryptoExchange])
  const filteredEthereumData=useMemo(()=>{return cryptoExchange.filter((coin) =>
    coin.ticker.slice(0,3)=="ETH")},[cryptoExchange])
  const filteredIndexData=useMemo(()=>{return allAssets.filter((idx) =>
    idx.cat=="Index")},[allAssets])
  const filteredStockData=useMemo(()=>{return allAssets.filter((idx) =>
    idx.cat=="Stock")},[allAssets])

 

  // Consisting each asset map data 
  useEffect(() => {
      setIsMounted(true);
      for (let i=0; i<bitcoinLocArr.length; i++){
        for (let j=0; j<filteredBitcoinData.length; j++){
        if(bitcoinLocArr[i].name == filteredBitcoinData[j].exchange){
          bitcoinLocArr[i].weather=filteredBitcoinData[j].weather
          bitcoinLocArr[i].risk=filteredBitcoinData[j].tailriskchg
        }}
      }
      for (let i=0; i<ethLocArr.length; i++){
        for (let j=0; j<filteredEthereumData.length; j++){
        if(ethLocArr[i].name == filteredEthereumData[j].exchange){
          ethLocArr[i].weather=filteredEthereumData[j].weather
          ethLocArr[i].risk=filteredEthereumData[j].tailriskchg
        }}
      }
      for (let i=0; i<indexLocArr.length; i++){
        for (let j=0; j<filteredIndexData.length; j++){
        if(indexLocArr[i].ticker == filteredIndexData[j].ticker){
          indexLocArr[i].weather=filteredIndexData[j].weather
          indexLocArr[i].risk=(filteredIndexData[j].tailriskchg)
        }}
      }
      for (let i=0; i<stockLocArr.length; i++){
        if (stockLocArr[i].location =="SANFRANCISCO"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="Apple"||stock.name=="Tesla"||stock.name=="Nvidia"||stock.name=="Meta"||stock.name=="Paypal"||stock.name=="Google"||stock.name=="Block"||stock.name=="Marathon Digital")
        }
        if (stockLocArr[i].location =="SEATLE"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="Microsoft"||stock.name=="Amazon")
        }
        if (stockLocArr[i].location =="NEW YORK"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="MicroStrategy"||stock.name=="JPMorgan")
        }
        if (stockLocArr[i].location =="COLUMBIA"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="Bank of America")
        }
        if (stockLocArr[i].location =="NETHERLANDS"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="ASML Holding")
        }
        if (stockLocArr[i].location =="KOREA"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="Samsung")
        }
        if (stockLocArr[i].location =="JAPAN"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="SoftBank")
        }
        if (stockLocArr[i].location =="CHINA"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="Tencent "||stock.name=="Alibaba Group")
        }
        if (stockLocArr[i].location =="TAIWAN"){
          stockLocArr[i].stocks=filteredStockData.filter((stock)=>stock.name=="TSMC")
        }
      }
  }
  ,[filteredBitcoinData,filteredEthereumData,filteredIndexData,filteredStockData]);



// Map asset select button handler
const [locArr,setLocArr]=useState(bitcoinLocArr);
  
const ethLocHandler=()=>{
  setIsActive("")
  setLocArr(ethLocArr)
  setIsActive("ethereum")
}
const bitcoinLocHandler=useCallback(()=>{
  setIsActive("")
  setLocArr(bitcoinLocArr)
  setIsActive("bitcoin")
},[])
const indexLocHandler=useCallback(()=>{
  setIsActive("")
  setLocArr(indexLocArr)
  setIsActive("index")
},[])
const stockLocHandler=useCallback(()=>{
  setIsActive("")
  setLocArr(stockLocArr)
  setIsActive("stock")
},[])


// Tool-tip handler
const hoverHandler=(name,risk)=>{
  setContent(name)
  setRiskContent(risk)
}
const leaveHandler=()=>{
  setContent("")
  setRiskContent("")
}
 

  return (
    <div data-tip="">
      <div className={`tab-header Panel`}>
        {/* Asset Selector button */}
        <ul className={`flex gap-3 text-6 max-[450px]:text-7 max-[450px]:gap-3 overflow-hidden` }>
          <li onClick={bitcoinLocHandler} className={`list-item ` + ((isActive === "bitcoin") ? `active-list` : ``)}>Bitcoin</li>
          <li onClick={ethLocHandler} className={`list-item ` + ((isActive === "ethereum") ? `active-list` : ``)}>Ethereum</li>
          <li onClick={indexLocHandler} className={`list-item ` + ((isActive === "index") ? `active-list` : ``)}>Index</li>
          <li onClick={stockLocHandler} className={`list-item ` + ((isActive === "stock") ? `active-list` : ``)}>Stock</li>
        </ul>
      </div>

      {/* World Map */}
      <div className={`tab-content map-container-line  overflow-auto`}>
        <ComposableMap className={`w-full h-full m-auto`} projectionConfig={{ center:[15,3],scale: 180 }}>
            <ZoomableGroup zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
          filterZoomEvent={handleFilter}
          translateExtent={[[0, 0], [mapWidth, mapHeight]]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {

                return <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" style={{
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
/>
            })
            }
          </Geographies>

          {/* Marker */}
          {locArr!=stockLocArr && locArr.map(({ name, coordinates, markerOffset,weather,risk }) => (
            <Marker key={coordinates} coordinates={coordinates} onMouseOver={()=>{setContent(name); setRiskContent(risk); setWeatherContent(weather)}} onMouseOut={leaveHandler}>
              
              {weather=="rainy" ? <Rainy></Rainy> : ''}
              {weather=="freezy" ? <Freezy></Freezy> : ''}
              {weather=="windy" ? <Windy></Windy> : ''}
              {weather=="thunderstorm" ? <ThunderStorm></ThunderStorm> : ''}
              {weather=="mostly_cloud" ? <MostlyCloud></MostlyCloud> : ''}
              {weather=="partly_cloud" ? <PartlyCloud></PartlyCloud> : ''}
              {weather=="snowstorm" ? <SnowStorm></SnowStorm> : ''}
              {weather=="dry" ? <Dry></Dry> : ''}
              {weather=="drought" ? <Dry></Dry> : ''}
              {weather=="heavy_snow" ? <HeavySnow></HeavySnow> : ''}
              {weather=="heavy_rain" ? <HeavyRain></HeavyRain> : ''}
              {weather=="smoke" ? <Smoke></Smoke> : ''}
              {weather=="sunny" ? <Sunny></Sunny> : ''}
              {weather=="shower" ? <Shower></Shower> : ''}
              {weather=="windy" ? <Windy></Windy> : ''}
              {weather=="humid" ? <Humid></Humid> : ''}
              {weather=="snowy" ? <Snowy></Snowy> : ''}
              {weather=="volcano" ? <Volcano></Volcano> : ''}              
            </Marker>
          ))}
          {locArr==stockLocArr &&
          stockLocArr.map(({location,coordinates,stocks})=>(<Marker key={coordinates} coordinates={coordinates} onMouseOver={()=>{setContent(location); setStockContent(stocks);}} onMouseOut={leaveHandler}>
            <Icon_light></Icon_light>

          </Marker>))
          }


          <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
          </ZoomableGroup>
        </ComposableMap>

      {/* Tooltip */}
      {/* {isMounted && content && locArr!=stockLocArr &&
      <ReactTooltip effect="float" place="right" borderColor="green" background="white" type="light">
        <div className={`w-64 my-2 text-6`}>
          <ul>
          <li className={`flex items-center`}>
            <div className={`basis-32 p-1`}>
          <p className={`w-32 whitespace-nowrap`}>{content}</p>
          </div>
          {riskContent>0 ? 
                (<p className="text-green flex-1 flex-center p-1">+{riskContent}%</p>)
                :(<p className="text-red flex-1 flex-center p-1">{riskContent}%</p>)}
               <div className={`flex-1 flex-center h-10 scale-75 p-1`}>
                  {weatherContent=="rainy" ? <Rainy1></Rainy1> : ''}
                  {weatherContent=="freezy" ? <Freezy1></Freezy1> : ''}
                  {weatherContent=="windy" ? <Windy1></Windy1> : ''}
                  {weatherContent=="thunderstorm" ? <ThunderStorm1></ThunderStorm1> : ''}
                  {weatherContent=="mostly_cloud" ? <MostlyCloud1></MostlyCloud1> : ''}
                  {weatherContent=="partly_cloud" ? <PartlyCloud1></PartlyCloud1> : ''}
                  {weatherContent=="snowstorm" ? <SnowStorm1></SnowStorm1> : ''}
                  {weatherContent=="dry" ? <Dry1></Dry1> : ''}
                  {weatherContent=="drought" ? <Dry1></Dry1> : ''}
                  {weatherContent=="heavy_snow" ? <HeavySnow1></HeavySnow1> : ''}
                  {weatherContent=="heavy_rain" ? <HeavyRain1></HeavyRain1> : ''}
                  {weatherContent=="smoke" ? <Smoke1></Smoke1> : ''}
                  {weatherContent=="sunny" ? <Sunny1></Sunny1> : ''}
                  {weatherContent=="shower" ? <Shower1></Shower1> : ''}
                  {weatherContent=="windy" ? <Windy1></Windy1> : ''}
                  {weatherContent=="humid" ? <Humid1></Humid1> : ''}
                  {weatherContent=="snowy" ? <Snowy1></Snowy1> : ''}
                  {weatherContent=="volcano" ? <Volcano1></Volcano1> : ''}
                </div>
          </li>
          </ul>
        </div>
      </ReactTooltip>}
      {isMounted && content && locArr==stockLocArr &&
      <ReactTooltip effect="float" place="right" borderColor="green" background="white" type="light">
        <div className={`w-64 my-2`}>
          <p className={`text-6 font-medium mb-2`}>{content}</p>
          <ul>
            {stockContent.map((stock)=>(
              <li className={`flex items-center`} key={stock.name}>
                <div className={`basis-32 p-1`}>
                  <p className={`w-32 whitespace-nowrap`}>{stock.name}</p>
                </div>
                {stock.tailriskchg>=0 ? 
                (<p className="text-green flex-1 flex-center p-1">+{stock.tailriskchg.toFixed(2)}%</p>)
                :(<p className="text-red flex-1 flex-center p-1">{stock.tailriskchg.toFixed(2)}%</p>)}
                <div className={`flex-1 flex-center h-10 scale-75 p-1`}>
                  {stock.weather=="rainy" ? <Rainy1></Rainy1> : ''}
                  {stock.weather=="freezy" ? <Freezy1></Freezy1> : ''}
                  {stock.weather=="windy" ? <Windy1></Windy1> : ''}
                  {stock.weather=="thunderstorm" ? <ThunderStorm1></ThunderStorm1> : ''}
                  {stock.weather=="mostly_cloud" ? <MostlyCloud1></MostlyCloud1> : ''}
                  {stock.weather=="partly_cloud" ? <PartlyCloud1></PartlyCloud1> : ''}
                  {stock.weather=="snowstorm" ? <SnowStorm1></SnowStorm1> : ''}
                  {stock.weather=="dry" ? <Dry1></Dry1> : ''}
                  {stock.weather=="drought" ? <Drought1></Drought1> : ''}
                  {stock.weather=="heavy_snow" ? <HeavySnow1></HeavySnow1> : ''}
                  {stock.weather=="heavy_rain" ? <HeavyRain1></HeavyRain1> : ''}
                  {stock.weather=="smoke" ? <Smoke1></Smoke1> : ''}
                  {stock.weather=="sunny" ? <Sunny1></Sunny1> : ''}
                  {stock.weather=="shower" ? <Shower1></Shower1> : ''}
                  {stock.weather=="humid" ? <Humid1></Humid1> : ''}
                  {stock.weather=="snowy" ? <Snowy1></Snowy1> : ''}
                  {stock.weather=="volcano" ? <Volcano1></Volcano1> : ''}
                </div>
            </li>))}
          </ul>
        </div>
      </ReactTooltip>
      
      } */}

      </div>
    </div>
    
  )
}
