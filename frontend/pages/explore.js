import React,{useEffect,useState,useMemo} from 'react'
import Header from '../components/layouts/Header';

import Footer from '../components/layouts/Footer';

import WorldMap from '../components/maps/WorldMap'
import SearchBar from '../components/SearchBar';

import Loading from '../components/Loading';
import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import TableContent from '../components/TableContent';
import MiniTable from '../components/MiniTable';
import useInterval from '../public/useInterval';

import Router, { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)

const Explore=({mainCard,allAssets,cryptoExchange,miniData,prefetchData})=>{
    // console.log(coinInfo)
    // console.log(coinBaseData)
    // Search bar Data
    const [limit,setLimit]=useState(20)
    const [page,setPage]=useState(1)



const {data:assetList,error,isValidating,mutate}=useSWR(`/api/assetList?limit=${limit}&page=${page}`,fetcher,{fallbackData:prefetchData})
console.log(assetList)
    const mainData=useMemo(()=>{    
        const totalData=JSON.parse(JSON.stringify(allAssets
            ))
        const filteredData=totalData.filter((asset)=>asset.name!='Bitcoin'&& asset.name!='Ethereum'&& asset.name!='Cardano'&& asset.name!='Ripple' && asset.name!='BNB'&& asset.name!='Litecoin'&& asset.name!='Dash'&& asset.name!='Bitcoin cash')
    const mainData=mainCard.concat(filteredData)
return mainData},[mainCard,allAssets])


    // Fetching data for each 5 minutes (coin data)
    const [crypto5minData,setCrypto5minData]=useState(mainCard);
    const [exploreData,setExploreData]=useState(mainData)

    useInterval(async ()=>{
        const result=await axios.get(`https://riskweather.org/api/Crypto5min`)
        const res=[...allAssets].filter((asset)=>asset.name!='Bitcoin'&& asset.name!='Ethereum'&& asset.name!='Cardano'&& asset.name!='Ripple' && asset.name!='BNB'&& asset.name!='Litecoin'&& asset.name!='Dash'&& asset.name!='Bitcoin cash')
        const exploreRes=result.data.concat(res)
        setCrypto5minData(result.data)
        setExploreData(exploreRes)

    
    },310000
    )
    

    
    //  Table dropdown menu handler
    const selectArr = [
        { value: "ALL", name: "All assets" },
        { value: "Crypto", name: "Crypto" },
        { value: "Index", name: "Index" },
        { value: "Stock", name: "Stock" },

    ]

    const selectArr2 = [
        
        { value: "High", name: "High Volatility" },
        { value: "Low", name: "Low Volatility" },
    ]
    
    const [assetSelect,setAssetSelect]=useState("All")
    const [riskSelect,setRiskSelect]=useState("")
    const assetSortHandler=(e)=>{
        setAssetSelect(e.target.value)
        setRiskSelect("")
    }
    const riskSortHandler=(e)=>{
        setRiskSelect(e.target.value)
    }


    const miniChartData=useMemo(()=>{
        // const totalData=[]
        // if(!isValidating){
        // totalData=JSON.parse(JSON.stringify(assetList
        //     ))
        // console.log(totalData)}
        const totalData=JSON.parse(JSON.stringify(allAssets))
        const ctData=JSON.parse(JSON.stringify(miniData))
        console.log(totalData)
        console.log(ctData)
        for (let i=0; i<totalData.length; i++){
            totalData[i].chartData=[];
            for (let j=0; j<ctData.length; j++){
              if (totalData[i].ticker == ctData[j].ticker){
                totalData[i].chartData.push(ctData[j])
      
              }
            }
            if(totalData[i].chartData[0].y > totalData[i].chartData[6].y){
                totalData[i].chartData[0].color="#DC2828"
            } else if(totalData[i].chartData[0].y < totalData[i].chartData[6].y){
                totalData[i].chartData[0].color="#36D399"
            }
        }

        return totalData

    },[allAssets,miniData])

    console.log(miniChartData)


    // Merging mini chart data with asset data
    // const chartData=useMemo(()=>{
    //     const totalData=JSON.parse(JSON.stringify(allAssets))
    //     const ctData=JSON.parse(JSON.stringify(miniData))    
    //     for (let i=0; i<totalData.length; i++){
    //         totalData[i].chartData=[{"id":"Risk","color":"hsl(43,100%,50%)","data":[]}];
    //         let k=0;
    //         for (let j=0; j<ctData.length; j++){
    //           if (totalData[i].ticker == ctData[j].ticker){
    //             totalData[i].chartData[0].data.push(ctData[j])
    //             delete totalData[i].chartData[0].data[k].ticker
    //             k++;
    //           }
    //         }
    //         if(totalData[i].chartData[0].data[0].y > totalData[i].chartData[0].data[6].y){
    //             totalData[i].chartData[0].color="hsl(0,72%,51%)"
    //         } else if(totalData[i].chartData[0].data[0].y < totalData[i].chartData[0].data[6].y){
    //             totalData[i].chartData[0].color="hsl(158,64%,52%)"
    //         }
    //       }
    //       return totalData
    // },[allAssets,miniData])
    // console.log(chartData)


    const [tableAssets,setTableAssets]=useState(miniChartData)
    console.log(tableAssets)

    
    useEffect(()=>{
        if(assetSelect=='ALL'){
            const tableDt=miniChartData.filter((asset)=>asset.cat=="Crypto"||asset.cat=="Index"||asset.cat=="Stock")
            setTableAssets(tableDt)

        }
        if(assetSelect=="Crypto"){
            const tableDt=miniChartData.filter((asset)=>asset.cat=="Crypto")
            setTableAssets(tableDt)
        }
        if(assetSelect=="Index"){
            const tableDt=miniChartData.filter((asset)=>asset.cat=="Index")
            setTableAssets(tableDt)
        }
        if(assetSelect=="Stock"){
            const tableDt=miniChartData.filter((asset)=>asset.cat=="Stock")
            setTableAssets(tableDt)
        }
    },[miniChartData,assetSelect])

    useEffect(()=>{
        
        if(riskSelect=='High'){
            const tableDt=[...tableAssets].sort(function(a,b){return a.tailrisk-b.tailrisk}).reverse()

            setTableAssets(tableDt)


        }
        if(riskSelect=="Low"){
            const tableDt=[...tableAssets].sort(function(a,b){return a.tailrisk-b.tailrisk})

            setTableAssets(tableDt)

        }

    },[miniChartData,riskSelect])

    // Merging chart data with 5 miniute coin data
    const coinChartData=useMemo(()=>{
        const totalData=JSON.parse(JSON.stringify(crypto5minData))
        const ctData=JSON.parse(JSON.stringify(miniData))
        console.log(totalData)
        console.log(ctData)
        for (let i=0; i<totalData.length; i++){
            totalData[i].chartData=[];
            for (let j=0; j<ctData.length; j++){
              if (totalData[i].ticker == ctData[j].ticker){
                totalData[i].chartData.push(ctData[j])
      
              }
            }
            if(totalData[i].chartData[0].y > totalData[i].chartData[6].y){
                totalData[i].chartData[0].color="#DC2828"
            } else if(totalData[i].chartData[0].y < totalData[i].chartData[6].y){
                totalData[i].chartData[0].color="#36D399"
            }
        }

        return totalData

    },[crypto5minData,miniData])
    // const coinChartDatas=useMemo(()=>{
    //     const volChartData=JSON.parse(JSON.stringify(crypto5minData))
    //     const ctData=JSON.parse(JSON.stringify(miniData))
    //     for (let i=0; i<volChartData.length; i++){
    //         volChartData[i].chartData=[{"id":"Risk","color":"hsl(43,70%,50%)","data":[]}];
    //         let k=0;
    //         for (let j=0; j<ctData.length; j++){
    //           if (volChartData[i].ticker == ctData[j].ticker){
    //             volChartData[i].chartData[0].data.push(ctData[j])
    //             delete volChartData[i].chartData[0].data[k].ticker
    //             k++;
    //           }
    //         }
    //         if(volChartData[i].chartData[0].data[0].y > volChartData[i].chartData[0].data[6].y){
    //             volChartData[i].chartData[0].color="hsl(0,72%,51%)"
    //         } else if(volChartData[i].chartData[0].data[0].y < volChartData[i].chartData[0].data[6].y){
    //             volChartData[i].chartData[0].color="hsl(158,64%,52%)"
    //         }
    //       }
    //       return volChartData



    // },[miniData,crypto5minData])
   





    // Filtering mini table data
    const highVolCoin=useMemo(()=>{
        const defaultCoin=coinChartData.sort(function(a,b){return a.tailrisk-b.tailrisk})
              return defaultCoin.reverse().slice(0,3)
            },[coinChartData])
    const lowVolCoin=useMemo(()=>{
        const defaultCoin=coinChartData.sort(function(a,b){return a.tailrisk-b.tailrisk})
              return defaultCoin.slice(0,3)
            },[coinChartData])
    const majorIndex=useMemo(()=>{
        const defaultIndex=miniChartData.filter((idx) =>
              idx.name=="NASDAQ"|| idx.name=="FTSE 100" || idx.name=="SSE Index")
              defaultIndex.splice(3,0,defaultIndex[0])
              defaultIndex.splice(0,1)
              return defaultIndex
            },[miniChartData])
    const majorStock=useMemo(()=>{
        const defaultStock=miniChartData.filter((stock) =>
              stock.name=="Tesla"|| stock.name=="Apple" || stock.name=="Google")
              defaultStock.splice(3,0,defaultStock[0])
              defaultStock.splice(0,1)
              return defaultStock
            },[miniChartData])
  


    return (
        <div className={`min-h-screen`}>
   
        <Header/>
    
        {assetList?.map((asset)=>asset.name)}
        <button disabled={page==1} onClick={()=>{setPage((prev)=>prev-1)}}>Prev</button>
        <button onClick={()=>{setPage((prev)=>prev+1);mutate()}}>Next</button>
                       {/* Explore Search bar */}
            <div className={`wrap2 mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
                <div className={`h-44 flex items-end justify-center`}>
                    <div className={`text-2 font-bold text-center`}>EXPLORE</div>
                </div>
                <SearchBar mainCard={exploreData}></SearchBar>
            </div>


            {/* Risk World Map */}
            <div className={`wrap2  mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
                <div className={`text-4 font-medium text-center mb-4`}>WORLD RISK WEATHER</div>
                <WorldMap allAssets={allAssets} cryptoExchange={cryptoExchange}></WorldMap>
            </div>


            {/* Assets */}
            <div className={`wrap2 mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
                <div className={`text-4 font-medium mb-4`}>ASSETS RISK WEATHER</div>
                <div className={`flex flex-row gap-5 `}>
                    <div className={`flex-1 overflow-x-auto `}>
                        <div className={`container  max-w-full `}>
                            <div className={`flex items-center mb-4 max-[410px]:text-7`}>
                                <label htmlFor="countries" className="form-label mb-0 ">Assets</label>
                                <select id="countries" className="form-input h-8 mr-2 "  value={assetSelect} onChange={assetSortHandler}>
                                    {selectArr.map((option)=> (<option key={option.value} value={option.value}>{option.name}</option>))}
                                </select>
                                <select id="countries" className="form-input h-8 " value={riskSelect} onChange={riskSortHandler}>
                                    <option value="" disabled className={`display-none`}>Sort by</option>
                                    {selectArr2.map((option)=> (<option key={option.value} value={option.value}>{option.name}</option>))}
                                </select>
                            </div>
                            <div>
                                {/* Main Table */}

                                
                                {/* <div className={`max-[768px]:overflow-x-scroll overflow-y-scroll slim-scroll h-1200`}> */}
      
                                    
                                
                                    <Table>
                                    <TableHeader></TableHeader>
                                    
                                    <div className={`max-[768px]:overflow-x-scroll overflow-y-scroll slim-scroll  ` + (tableAssets.length>=17 ? 'h-1200' : "")}>
                               
                                        {tableAssets.map((list)=> (<div key={list.ticker}>
                                            <TableContent  coinIcon={list.coinIcon} name={list.name} ticker={list.ticker} index={list.cat} weather={list.weather} 
                                                tailRisk={list.tailrisk.toFixed(4)} chartData={list.chartData} figure={list.tailriskchg} figure2={list.pricechg} price={list.price.toFixed(2)}>
                                            </TableContent>
                                        </div>))}
                                    </div>
                                    </Table>
                                    {!tableAssets && <Loading></Loading>}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    {/* Mini Table (Side) */}
                    <div className={`flex flex-col basis-96 gap-5 h-1200 hidden 2xl:block`}>
                        <div className={`sticky top-0`}>
                            <div className={`container mb-5`}>
                                <div className={`flex items-center justify-between mb-2`}>
                                    <h2 className={`text-6 font-medium`}>HIGH VOLATILITY COIN</h2>
                                    <p className={`text-7`}>{highVolCoin[0].obsdatetime.slice(0,10) + " " + highVolCoin[0].obsdatetime.slice(12,19)}</p>
                                </div>
                                {highVolCoin.map((list)=> (<div key={list.ticker}>
                                    <MiniTable coinIcon={list.ticker} name={list.name} ticker={list.ticker} chartData={list.chartData} weather={list.weather} graph={list.graph} figure={list.tailriskchg}></MiniTable>
                                </div>))}
                            </div>
                            <div className={`container mb-5`}>
                                <div className={`flex items-center justify-between mb-2`}>
                                    <h2 className={`text-6 font-medium`}>LOW VOLATILITY COIN</h2>
                                    <p className={`text-7`}>{lowVolCoin[0].obsdatetime.slice(0,10) + " " +highVolCoin[0].obsdatetime.slice(12,19)}</p>
                                </div>
                                {lowVolCoin.map((list)=> (<div key={list.ticker}>
                                    <MiniTable coinIcon={list.ticker} name={list.name} ticker={list.ticker} chartData={list.chartData} weather={list.weather} graph={list.graph} figure={list.tailriskchg}></MiniTable>
                                </div>))}
                            </div>
                            <div className={`container mb-5`}>
                                <div className={`flex items-center justify-between mb-2`}>
                                    <h2 className={`text-6 font-medium`}>MAJOR INDEX</h2>
                                    <p className={`text-7`}>{majorIndex[0].date}</p>
                                </div>
                                {majorIndex.map((list)=> (<div key={list.ticker}>
                                    <MiniTable coinIcon={list.ticker} name={list.name} ticker={list.ticker}  chartData={list.chartData} weather={list.weather}  graph={list.graph} figure={list.tailriskchg}></MiniTable>
                                </div>))}
                            </div>
                            <div className={`container`}>
                                <div className={`flex items-center justify-between mb-2`}>
                                    <h2 className={`text-6 font-medium`}>MAJOR STOCK</h2>
                                    <p className={`text-7`}>{majorStock[0].date}</p>
                                </div>
                                {majorStock.map((list)=> (<div key={list.ticker}>
                                    <MiniTable coinIcon={list.ticker} name={list.name} ticker={list.ticker} chartData={list.chartData} weather={list.weather} graph={list.graph} figure={list.tailriskchg}></MiniTable>
                                </div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         {/* Footer */}
        <Footer></Footer>

        </div>
    )
}


export default Explore;

export async function getServerSideProps() {

    // const res = await axios.get(`http://localhost:8000`)
    const [res,res2,res3,res4,res5] = await Promise.all([
        fetch(`http://localhost:8000/api/Crypto5min`),
        fetch(`http://localhost:3000/api/allAssets`),
        fetch(`http://localhost:8000/api/Exchange`),
        fetch(`http://localhost:8000/api/MiniChart`),
        fetch(`http://localhost:3000/api/asset?limit=20&page=1`),

        // fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/new', {
        //     headers: {
        //       'X-CMC_PRO_API_KEY': process.env.NEXT_PUBLIC_CMC_PRO_API_KEY,
        //     },})
        // fetch('https://api.exchange.coinbase.com/products/BTC-USD/candles')
    ]);
    // const data=JSON.stringify(res)

    const [mainCard,allAssets,cryptoExchange,miniData,prefetchData]=await Promise.all([
        res.json(),
        res2.json(),
        res3.json(),
        res4.json(),
        res5.json()

        
    ]);

    
  
    
  
  
    return { props: { mainCard,allAssets,cryptoExchange,miniData,prefetchData } };
  }
  
