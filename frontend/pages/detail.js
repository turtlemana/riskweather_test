import React,{useState,useEffect,useMemo,useRef,useCallback} from 'react';
import { useRouter } from 'next/router'; 
import Image from 'next/image';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import Dropdown from '../components/layouts/Dropdown';
import Button from '../components/Button';
import Link from 'next/link';
import DetailChart from '../components/chart/DetailChart';
import WeatherCard from '../components/WeatherCard'
import { FaFileDownload } from "react-icons/fa";
import { CSVDownload,CSVLink } from 'react-csv';
import Papa from 'papaparse'
import assetInfo from '../public/assetInfo'
import useWindowDimensions from '../public/useWindowDimensions';

const Detail=({riskData, coinListing,priceData,assetData,corrData,predictData,allAssetData,jsonData,indexData,coinInfoData})=>{
    const router=useRouter();
    const coinSymbol=router.query.asset.slice(0,3)
    console.log(coinListing)


    console.log(coinInfoData)
    // Chart / Information selector
    const [isActive, setIsActive]=useState('Chart')

    //  Filtering Information data
    const infoData=useMemo(()=>{
        if(assetData[0].cat=="Stock"||assetData[0].cat=="Index"){
        
        const infoArr=assetInfo.filter((asset)=>asset.ticker==router.query.asset)
        return infoArr}
        else {
        const infoArr=[{}]
        infoArr[0].name=coinInfoData.data[coinSymbol][0].name
        infoArr[0].symbol=coinInfoData.data[coinSymbol][0].symbol
        infoArr[0].info=coinInfoData.data[coinSymbol][0].description
        infoArr[0].tags=coinInfoData.data[coinSymbol][0].tags
        infoArr[0].whitePaper=coinInfoData.data[coinSymbol][0].urls.technical_doc[0]

        
            return infoArr
        }


    },[assetData,coinInfoData.data])






    // Consisting Weather Forcast
    // const predictWeather=useMemo(()=>{
    //     const dateWeather=[]
    //     const dateList=[];
    //     const weatherValues=Object.values(predictData[0])
    //     const today=weatherValues[0].split("-")
    //     const todayDate=new Date(today[0],today[1],today[2])
    //     for (let i=0; i<7;i++){
    //         const addDate=new Date(todayDate.getFullYear(),todayDate.getMonth(),(todayDate.getDate()+i))
    //         dateList.push(addDate.getFullYear()+"-"+addDate.getMonth()+"-"+(addDate.getDate()))
    //         dateWeather.push({date:dateList[i],weather:weatherValues[i+2]})
            
    //     }
    //     dateList.push(weatherValues[0])

    //     return dateWeather

    // },[predictData])
    const predictWeather=useMemo(()=>{
        const dateWeather=[]
        const dateList=[];
        const weatherValues=Object.values(predictData[0])
        const today=weatherValues[0].split("-")
        const todayDate=new Date(today[0],today[1]-1,today[2])
        for (let i=0; i<7;i++){
            const addDate=new Date(todayDate.getFullYear(),todayDate.getMonth(),(todayDate.getDate()+i))
            const month=parseInt(addDate.getMonth())+1
            dateList.push(addDate.getFullYear()+"-"+month +"-"+(addDate.getDate()))
            dateWeather.push({date:dateList[i],weather:weatherValues[i+2]})
            
        }
        dateList.push(weatherValues[0])

        return dateWeather

    },[predictData])


    // Consisting Correlated Asset data 
    const idx=0
    const corrCardData=useMemo(()=>{
        const corrList=[];
        const corrValues=Object.values(corrData[0])
        for (let i=1; i<corrValues.length; i++){
            for (let j=0; j<allAssetData.length;j++){
                if (corrValues[i]===allAssetData[j].ticker){
                    corrList.push({...allAssetData[j],key:idx})
                    idx++
                    break
                }
            }

        }
        return corrList


    },[corrData,allAssetData])


    // Carousel
    const corrMain=useMemo(()=>{return corrCardData.slice(0,4)},[corrCardData])

    const [currentSlide, setCurrentSlide] = useState(0);
    const [corrCardSlide,setCorrCardSlide]=useState(corrMain)
    const slideRef = useRef(null);


    const corr1=useMemo(()=>{return corrCardData.slice(0,4)},[corrCardData])
    const corr2=useMemo(()=>{return corrCardData.slice(1,5)},[corrCardData])
    const corr3=useMemo(()=>{return corrCardData.slice(2,6)},[corrCardData])
    const corr4=useMemo(()=>{return corrCardData.slice(3,7)},[corrCardData])
    const corr5=useMemo(()=>{return corrCardData.slice(4,8)},[corrCardData])
    const corr6=useMemo(()=>{return corrCardData.slice(5,9)},[corrCardData])
    const corr7=useMemo(()=>{return corrCardData.slice(6,10)},[corrCardData])
    const corr8=useMemo(()=>{const tmpCorr8=corrCardData.filter((asset)=>asset.key==7||asset.key==8||asset.key==9||asset.key==0)
    tmpCorr8.push(tmpCorr8[0])
    tmpCorr8.shift()
return tmpCorr8},[corrCardData])
    const corr9=useMemo(()=>{const tmpCorr9=corrCardData.filter((asset)=>asset.key==8||asset.key==9||asset.key==0||asset.key==1)
    tmpCorr9.push(tmpCorr9[0],tmpCorr9[1])
    tmpCorr9.shift()
    tmpCorr9.shift()
return tmpCorr9},[corrCardData])
    const corr10=useMemo(()=>{const tmpCorr10=corrCardData.filter((asset)=>asset.key==9||asset.key==0||asset.key==1||asset.key==2)
    tmpCorr10.unshift(tmpCorr10[3])
    tmpCorr10.pop()
return tmpCorr10},[corrCardData])


    useEffect(()=>{

        if(currentSlide==-1){
            setCurrentSlide(9)
        }

        if(currentSlide==0){
            setCorrCardSlide(corr1)
        }
        if(currentSlide==1){
            setCorrCardSlide(corr2)
        }
        if(currentSlide==2){
            setCorrCardSlide(corr3)
        }
        if(currentSlide==3){
            setCorrCardSlide(corr4)
        }
        if(currentSlide==4){
            setCorrCardSlide(corr5)
        }
        if(currentSlide==5){
            setCorrCardSlide(corr6)
        }
        if(currentSlide==6){
            setCorrCardSlide(corr7)
        }
        if(currentSlide==7){
            setCorrCardSlide(corr8)
        }
        if(currentSlide==8){
            setCorrCardSlide(corr9)
        }
        if(currentSlide==9){
            setCorrCardSlide(corr10)
        }
        if(currentSlide==10){
            setCorrCardSlide(corr1)
            setCurrentSlide(0)
        }

    },[currentSlide])

    const NextSlide = () => {

        setCurrentSlide((prev)=>prev + 1);

    };
    const PrevSlide = () => {

        setCurrentSlide((prev)=>prev -1);

    };



    useEffect(()=>{setCorrCardSlide(corrMain); ;setCurrentSlide(0); setIsActive("Chart")},[corrMain])








    //  Detail Chart

    // Composing Risk & Price Chart
    const chartData=useMemo(()=>{
        const newRiskData=riskData.map(data=>{return {date:data.x,risk:data.y}})
        const newPriceData=priceData.map(data=>{return {date:data.x,price:data.y}})
        for (let i=0; i<newRiskData.length; i++){
            for (let j=0; j<newPriceData.length; j++){
                if(newRiskData[i].date==newPriceData[j].date){
                    newRiskData[i].price=newPriceData[j].price
                    break
                }
            }
        }
        if(!newRiskData.at(-1).price){
            for(let i=2; i<8; i++){
                if(newRiskData.at(-i).price){
                    newRiskData.at(-1).price=newRiskData.at(-i).price
                    break
                }
            }
        }
        return newRiskData

    },[riskData,priceData])
    console.log(chartData)




    // Slicing Chart with selected days
    const [chartSlice, setChartSlice]=useState(chartData)
    const tmpData=JSON.parse(JSON.stringify(chartData))


    const options=[{label:"7days", value:"7days"},{label:"15days", value:"15days"},{label:"30days", value:"30days"},{label:"All", value:"All"}]
    const [selected,setSelected]=useState("All")

    const selectChange=(event)=>{

        setSelected(event.target.getAttribute("value"))

     
    }
    const activeChange=(event)=>{

        setIsActive(event.target.getAttribute("value"))

     
    }

    useEffect(()=>{ 
        
    if (selected=="All"){

        setChartSlice(chartData)

        
    }else if (selected=="7d"){
        tmpData=chartData.slice(-7)
        if(!tmpData[0].price){

            for (let i=8; i<13; i++){
                if(chartData.at(-i).price){
            tmpData[0].price=chartData.at(-i).price
        break}
        }

        }
        setChartSlice(tmpData)




    }
    else if (selected=="15d"){
        tmpData=chartData.slice(-15)
        if(!tmpData[0].price){
            for (let i=16; i<21; i++){
                if(chartData.at(-i).price){
            tmpData[0].price=chartData.at(-i).price
        break}
            
        
        }
        }
        setChartSlice(tmpData)



    }
    else if (selected=="30d"){
        tmpData=chartData.slice(-30)
        if(!tmpData[0].price){
            for (let i=31; i<36; i++){
                if(chartData.at(-i).price){
            tmpData[0].price=chartData.at(-i).price
        break}
            
        
        }
        }
        setChartSlice(tmpData)



    }
    else if (selected=="90d"){
        tmpData=chartData.slice(-90)
        if(!tmpData[0].price){
            for (let i=91; i<96; i++){
                if(chartData.at(-i).price){
            tmpData[0].price=chartData.at(-i).price
        break}
            
        
        }
        }
        setChartSlice(tmpData)




    }
    else if (selected=="180d"){
        tmpData=chartData.slice(-180)
        if(!tmpData[0].price){
            for (let i=181; i<186; i++){
                if(chartData.at(-i).price){
            tmpData[0].price=chartData.at(-i).price
        break}
            
        
        }
        }
        setChartSlice(tmpData)



    }
    else if (selected=="365d"){
        tmpData=chartData.slice(-365)
        if(!tmpData[0].price){
            for (let i=366; i<371; i++){
                if(chartData.at(-i).price){
            tmpData[0].price=chartData.at(-i).price
        break}
            
        
        }
        }
        setChartSlice(tmpData)

    }


},[selected,chartData])
console.log(assetData)
    

    return (
        <div className={`min-h-screen`}>
            <Header/>
            <div className={`wrap2 max-[1280px]:wrap4`}>
                 {/* Weather, Index */}
                <div className={`my-16`}>
                    <div className={`flex items-center mb-4`}>
                        <div className={`w-8 h-8 bg-gray-100 rounded-full `}>
                            <Image width="48px" height="48px" src={`/img/${assetData[0].ticker}.png`} alt={`${assetData[0].ticker}`}></Image>
                        </div>      
                        <div className={`ml-3`}>
                            <h4 className={`text-2 mb-0`}>{assetData[0].name}</h4>
                        </div>
                    </div>
                    <div className={`container-line relative`}>
                    <div className={`absolute right-5 max-[540px]:top-2 max-[540px]:right-3`}>
                                <p className={`text-6 font-light`}>{allAssetData[0].date}</p>
                            </div>
                        <div className={`flex justify-between flex-col 2xl:flex-row`}>
                            <div className={`flex p-4 flex-col xl:flex-row`}>
                                
                                <div className={`relative pr-0 justify-center items-center`}>
                                    <button className={`absolute left-0 z-10 justify-center items-center`}>
                                        <Image width="32px" height="32px" onClick={()=>{router.push({pathname:`/learn`})}}  src={`/img/icon_question.png`} alt={`${assetData[0].ticker}`}></Image>
                                    </button>
                                    <div className={`w-full h-full flex justify-center items-center`}>
                                        <Image width="170px" height="170px" src={`/img/${assetData[0].weather}.svg`} alt={`${assetData[0].ticker}`}></Image>
                                    </div>
                                </div>
                                <div className={`flex flex-col justify-between min-[1280px]:ml-10 px-5`}>
                                    <h2 className={` text-4xl font-bold text-gray-600 mb-4 max-[450px]:text-[30px] max-[1279px]:text-center`}>{assetData[0].weather.replace("_"," ").replace(/^[a-z]/, char => char.toUpperCase())}</h2>
                                    <div className={`mb-4`}>
                                        <div className={`flex items-center gap-3 mb-4`}>
                                            <h3 className={`text-gray-500 p-1.5 px-6 bg-gray-100 rounded-full max-[450px]:text-[12px]`}>PRICE</h3>
                                            {(assetData[0].name!="Samsung"&&assetData[0].name!="SoftBank"&&assetData[0].name!="ASML Holding") && <p className={`text-4 max-[450px]:text-[18px]`}>{assetData[0].cat==="Index" ? "" : "＄"}{assetData[0].price.toFixed(2)}</p>}
                                            {(assetData[0].name=="Samsung") && <p className={`text-4 max-[450px]:text-[18px]`}>{"￦"}{assetData[0].price.toFixed(2)}</p>}
                                            {(assetData[0].name=="SoftBank") && <p className={`text-4 max-[450px]:text-[18px]`}>{"￥"}{assetData[0].price.toFixed(2)}</p>}
                                            {(assetData[0].name=="ASML Holding") && <p className={`text-4 max-[450px]:text-[18px]`}>{"￡"}{assetData[0].price.toFixed(2)}</p>}
                                            {assetData[0].pricechg>=0 ? 
                                            <p className={`text-4 text-green max-[450px]:text_base_green`}>{assetData[0].pricechg}%</p>
                                        :  <p className={`text-4 text-red max-[450px]:text_base_red`}>{assetData[0].pricechg}%</p>}
                                        </div>
                                        <div className={`flex items-center gap-3`}>
                                            <h3 className={`text-gray-500 p-1.5 px-6 bg-gray-100 rounded-full max-[450px]:text-[12px]`}>TAIL RISK</h3>
                                            <p className={`text-4 max-[450px]:text-[18px]`}>{assetData[0].tailrisk.toFixed(4)}</p>
                                            {assetData[0].tailriskchg>=0 ? 
                                            <p className={`text-4 text-green max-[450px]:text_base_green`}>{assetData[0].tailriskchg}%</p> :
                                            <p className={`text-4 text-red max-[450px]:text_base_red`}>{assetData[0].tailriskchg}%</p>}
                                        </div>
                                    </div>
                                </div>


                            </div>
               
                            <div className={`flex flex-col justify-end 2xl:items-end`}>
                                <div className={`container-gray w-auto h-auto shadow-none p-4 px-6`}>
                                    <h4 className={`text-6 font-medium mb-2`}>DAILY RISK INDEX</h4>
                                    <ul className={`flex flex-col md:flex-row gap-1 md:gap-10`}>
                                        <li><p className={`text-6 font-light flex justify-between md:justify-start`}><strong className={`mr-3`}>TAIL RISK</strong>{assetData[0].tailrisk.toFixed(4)}</p></li>
                                        <li><p className={`text-6 font-light flex justify-between md:justify-start`}><strong className={`mr-3`}>VAR</strong>{indexData[0].vargauss.toFixed(4)}</p></li>
                                        <li><p className={`text-6 font-light flex justify-between md:justify-start`}><strong className={`mr-3`}>CVAR</strong>{indexData[0].cvarnts.toFixed(4)}</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detail Information */}
                <div className={`text-4 font-medium text-center mb-4`}>DETAILED INFORMATION</div>
                <div className={`tab-header`}>
                    <ul className={`flex gap-3 text-6 `}>
                        <li  onClick={activeChange} value={"Chart"} className={`list-item ` + ((isActive === "Chart") ? `active-list` : ``)}>Chart</li>
                        <li  onClick={activeChange} value={"Information"} className={`list-item ` + ((isActive === "Information") ? `active-list` : ``)}>Information</li>
                    </ul>
                </div>

                {/* Chart & Information */}
                {/* <Dropdown onChange={selectChange}  value={selected} options={options}></Dropdown> */}
                <div className={`tab-content`}>
                    <div className={`flex flex-col 2xl:flex-row gap-5 mb-16`}>
                        <div className={`container-line flex-1 max-[1280px]:chart-container-line`}>
                            {isActive == "Chart" ?
                            (<div>
                                <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 mb-8 `}>
                            
                                    <ul className={`container-gray shadow-none h-auto px-3 py-1 flex gap-0 sm:gap-2 text-7 font-medium text-gray-400 sm:text-gray-400 max-[410px]:text-[10px]`}>
                                        <li onClick={selectChange} value={"7d"}  className={`px-2 link ` + ((selected === "7d") ? `active-list2` : ``)}>7D</li>
                                        <li onClick={selectChange} value={"15d"} className={`px-2 link ` + ((selected === "15d") ? `active-list2` : ``)}>15D</li>
                                        <li onClick={selectChange} value={"30d"} className={`px-2 link ` + ((selected === "30d") ? `active-list2` : ``)}>30D</li>
                                        <li onClick={selectChange} value={"90d"} className={`px-2 link ` + ((selected === "90d") ? `active-list2` : ``)}>90D</li>
                                        <li onClick={selectChange} value={"180d"} className={`px-2 link ` + ((selected === "180d") ? `active-list2` : ``)}>180D</li>
                                        <li onClick={selectChange} value={"365d"} className={`px-2 link ` + ((selected === "365d") ? `active-list2` : ``)}>365D</li>
                                        <li onClick={selectChange} value={"All"} className={`px-2 link ` + ((selected === "All") ? `active-list2` : ``)}>All</li>
                                    </ul>
                                    <button className={`btn-gray btn-sm whitespace-nowrap`} >
                                        <CSVLink data={jsonData} filename={`${assetData[0].name}.csv`}>
                                            <div className={`flex items-center`}>
                                                <FaFileDownload></FaFileDownload>
                                                <p className={`ml-1 max-[410px]:text-[11px]`}>Download CSV</p>
                                            </div>
                                        </CSVLink>
                                    </button>
                                </div>
                                <div>
                                <DetailChart chartData={chartSlice}></DetailChart>
                                </div>
                            </div>)
                            : (assetData[0].name.toUpperCase()===infoData[0]?.name.toUpperCase() || coinSymbol===infoData[0]?.symbol) ? (<div className="flex flex-col md:space-y-10 align-center items-start">
                                <div>
                                <h1 className="text-4 font-medium mb-2 flex-1">{infoData[0]?.name}</h1>
                                {/* <p className="text-3">{infoData[0]?.ticker}</p> */}
                                <p className="text-6 font-light">{infoData[0]?.info}</p>
                                </div>
                                
                                <br></br>
                                <div className="2xl:pt-[200px]">
                                {assetData[0].cat=="Index"||assetData[0].cat=="Stock" ? null : 
                                <p className="">White-Paper{" "}: {" "}
                                {infoData[0]?.whitePaper ? <Link  href={infoData[0]?.whitePaper}><a className="hover:underline cursor-pointer text-blue-500 ">{infoData[0]?.whitePaper}</a></Link>: <span>Not found</span> }
                                </p>
                                }
                                <br></br>
                                {assetData[0].cat=="Index"||assetData[0].cat=="Stock" ? null : <div className="">
                                Tags {" "}: {" "}
                                {infoData[0]?.tags?.map((tag)=>(<div className="inline text-blue-500" key={tag}>{"#"}<span key={tag} className={`cursor-pointer text-blue-500 hover:underline align-bottom`}>{tag}</span>{" "}</div>))}
                                </div>}</div>
                                </div>) :(<ul className={`grid grid-cols-1 justify-items-center items-center content-center  lg:mt-12 lg:pt-5`}>
                <li className={`w-full h-80 flex flex-col items-center justify-center`}>
                  <Image width="240px" height="286px" src={`/img/coin_character.png`} alt={``}></Image>
                  <h2 className={`text-4 mt-4 ml-4`}>Information Not Included</h2>
                  <p className={`text-6 font-light ml-4 text-center text-xs md:text-lg`}>We are going to add an information as soon as possible</p>
                </li>
              </ul>)
                            }

                        </div>
                        
                            
                        {/* Weekly ForeCast */}
                        <div className={`container-line shadow-md basis-60 h-auto flex flex-col justify-between`}>
                            <div>
                                <div className={`flex items-center justify-between`}>
                                    <h2 className={`text-6 font-medium mb-2`}>WEEKLY FORECAST</h2>
                                </div>
                                {predictWeather.map((list,idx)=> (<li className={`flex justify-between p-2 my-1 rounded-lg whitespace-nowrap`} key={idx}>
                                    <div className={`text-6`}>{list.date}</div>
                                    <Image width="32" height="32" src={`/img/${list.weather}.svg`}></Image>
                                </li>))}
                            </div>
                            
                            <div className={`container-gray shadow-none h-auto p-4`}>
                                <p className="text-6 font-light">Long-term forcasting may be less accurate.</p>
                            </div>
                        </div>
                    </div>      
                </div>

                 {/*Correlated Assets  */}
                <div className={`mb-16`}>
                    <div className={`title text-center mb-6`}>
                        <h2 className={`text-4 font-medium`}>CORRELATED ASSETS</h2>
                        <p className={`text-6 font-light`}>Top 10 assets with a high correlation of tail risk.</p>
                    </div>
                    <div className={`carousel relative`}>
                        {useWindowDimensions().width>1280 && <div className={`btn-group`}>
                            <button className={`btn-prev`} onClick={PrevSlide}></button>
                            <button className={`btn-next`} onClick={NextSlide}></button>
                        </div>}
                        <div className={`card-list sliderContainer overflow-auto max-[1279px]:overflow-x-scroll`}>
                            {useWindowDimensions().width>1280 ? (<ul className={`flex w-auto 3xl:w-full gap-5 mb-6`} ref={slideRef}>
                                {corrCardSlide.map((card,idx)=>(<li className={`ml-1 w-72 max-[450px]:w-80  3xl:w-full h-full`} key={idx}>
                                    <WeatherCard key={card.idx} name={card.name} weather={card.weather} ticker={card.ticker} coinIcon={card.ticker} figure={card.tailriskchg}>
                                    </WeatherCard>
                                </li>))}
                            </ul>)
                            : (<ul className={`flex w-auto 3xl:w-full gap-5 mb-6`} ref={slideRef}>
                            {corrCardData.map((card,idx)=>(<li className={`ml-1 w-72 max-[450px]:w-80  3xl:w-full h-full`} key={idx}>
                                <WeatherCard key={card.idx} name={card.name} weather={card.weather} ticker={card.ticker} coinIcon={card.ticker} figure={card.tailriskchg}>
                                </WeatherCard>
                            </li>))}
                        </ul>)}
                        </div>
                    </div>
                    <div className={`mb-4 text-center`}>
                        <Button name="View More" color="btn-primary-line" link={"/explore"}></Button>
                    </div>
                </div>
        
    
            </div>

            {/* Footer */}
            <Footer></Footer>
        </div>)
        
}

export default Detail;


export async function getServerSideProps(context) {
   

    // const res = await axios.get(`http://localhost:8000`)
    const [res,res2,res3,res4,res5,res6,res7,res8,res9,res10] = await Promise.all([
        fetch(`http://localhost:8000/api/DetailRisk/?asset=${context.query.asset}`),
        fetch(`http://localhost:8000/api/DetailPrice/?asset=${context.query.asset}`),
        fetch(`http://localhost:8000/api/Detail/?asset=${context.query.asset}`),
        fetch(`http://localhost:8000/api/DetailCorr/?asset=${context.query.asset}`),
        fetch(`http://localhost:8000/api/DetailForecast/?asset=${context.query.asset}`),
        fetch(`http://localhost:8000/api/AllAssets`),
        fetch(`http://localhost:8000/api/DetailRisk/?asset=${context.query.asset}&format=json`),
        fetch(`http://localhost:8000/api/DetailIndex/?asset=${context.query.asset}&format=json`),
        fetch(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${context.query.asset.slice(0,3)}`, {
            headers: {
              'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC_PRO_API_KEY,
            },}),
        fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200`,{
            headers: {
                'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC_PRO_API_KEY,
              },
        }
        )
   



    ]);
    // const data=JSON.stringify(res)

    const [riskData, priceData,assetData,corrData,predictData,allAssetData,jsonData,indexData,coinInfoData,coinListing]=await Promise.all([
        res.json(),
        res2.json(),
        res3.json(),
        res4.json(),
        res5.json(),
        res6.json(),
        res7.json(),
        res8.json(),
        res9.json(),
        res10.json()
        

    ]);
  
    
  
  
    return { props: {riskData,priceData,assetData,corrData,predictData,allAssetData,jsonData,indexData,coinInfoData,coinListing} };
  }
  
