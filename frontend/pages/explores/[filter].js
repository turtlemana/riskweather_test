import React,{useEffect,useState,useMemo} from 'react'

import Table from '../../components/Table';
import TableHeader from '../../components/TableHeader';
import TableContent from '../../components/TableContent';
import MiniTable from '../../components/MiniTable';
import { FaSearch } from 'react-icons/fa';

import Router, { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'


const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0) return `/api/assetList?&page=1&limit=5`;
    if (pageIndex + 1 > +previousPageData.pages) return null;
    return `/api/assetList?&page=${pageIndex+1 }&limit=5`;
  };

const fetcher = (url) => axios.get(url).then((res) => res.data)

function PageTable({ mainCard,allAssets,cryptoExchange,miniData,prefetchData }) {
    const router=useRouter()
    const [search, setSearch] = useState("");
    const [filterAssets, setFilterAssets]=useState([]);

   const queryAssets=useMemo(()=>{
    const query=router.query.filter
    const cat=query.split("-")[0]
    const weather=query.split("-")[1]
    const queryData=allAssets.filter((asset)=>cat=="All" ? asset.weather==weather : weather ? asset.cat.toLowerCase()==cat.toLowerCase() && asset.weather==weather : asset.cat.toLowerCase()==cat.toLowerCase())
    console.log(queryData)
    return queryData
    },[allAssets,router.query.filter])
    console.log(queryAssets)

    // Searching Method
    useEffect(() => {
        if(search){
        setFilterAssets(
          queryAssets.filter((asset) =>
            asset.name.toLowerCase().includes(search.toLowerCase())
          )
        )};
        
    
      }, [search,queryAssets]);

console.log(router.query.filter)
const {data, setSize, size}=useSWRInfinite((pageIndex, previousPageData) => {
    if (pageIndex === 0) return `/api/assetList/${router.query.filter}?&page=1&limit=5`;
    if (pageIndex + 1 > +previousPageData.pages) return null;
    // if (router.query.filter==="All") return `/api/assetList?&page=${pageIndex+1 }&limit=20`;
    return `/api/assetList/${router.query.filter}?&page=${pageIndex+1 }&limit=5`;
  },fetcher)
const assetList=data?[].concat(...data) : [];
useEffect(()=>{setSize(1)},[])
const onNextBtn = () => {
    setSize(size + 1);
  };
  const totalChartData=useMemo(()=>{
    const totalData=JSON.parse(JSON.stringify(filterAssets))
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

},[filterAssets,miniData])
console.log(totalChartData)

const miniChartData=useMemo(()=>{
    const totalData=JSON.parse(JSON.stringify(assetList))
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

},[assetList,miniData])
  return (
    <div>
        <div className={'flex'}>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/`); }} >All</button>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/crypto`); }}>Crypto</button>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/index`); }}>Index</button>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/stock`); }}>Stock</button>
        </div>
        <div className={'flex'}>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/${router.query.filter.split("-")[0]+"-sunny"}`); }} >Sunny</button>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/${router.query.filter.split("-")[0]+"-partly_cloud"}`); }}>Cloudy</button>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/${router.query.filter.split("-")[0]+"-rainy"}`); }}>Rainy</button>
        <button className="btn-primary" onClick={()=>{router.push(`/explores/${router.query.filter.split("-")[0]+"-snowy"}`); }}>Snowy</button>
        </div>
        <div className={`flex items-center max-w-xl m-auto mb-8 relative`}>
            <input type="text" onChange={(e) => setSearch(e.target.value)} className={`w-full form-input`} placeholder="Search for assets"></input>
            <FaSearch className={`absolute right-5 text-gray-500`}></FaSearch>
        </div>
    <Table>
    <TableHeader></TableHeader>
                                    
    {!search ? <div className={`max-[768px]:overflow-x-scroll overflow-y-scroll slim-scroll  ` }>
                              
    {miniChartData.map((list)=> (<div key={list.ticker}>
    <TableContent  coinIcon={list.coinIcon} name={list.name} ticker={list.ticker} index={list.cat} weather={list.weather} 
                    tailRisk={list.tailrisk.toFixed(4)} chartData={list.chartData} figure={list.tailriskchg} figure2={list.pricechg} price={list.price.toFixed(2)}>
    </TableContent>
    </div>))}
    </div> : (search && filterAssets.length>0 ? <div className={`max-[768px]:overflow-x-scroll overflow-y-scroll slim-scroll  ` }>
                              
                              {totalChartData.map((list)=> (<div key={list.ticker}>
                              <TableContent  coinIcon={list.coinIcon} name={list.name} ticker={list.ticker} index={list.cat} weather={list.weather} 
                                              tailRisk={list.tailrisk.toFixed(4)} chartData={list.chartData} figure={list.tailriskchg} figure2={list.pricechg} price={list.price.toFixed(2)}>
                              </TableContent>
                              </div>))}</div>: <div></div>)}
    </Table>
    <div className={`flex justify-between`}>
    <button onClick={onNextBtn} className={`btn-primary`}>More</button>

    </div>
    </div>
  )
}

export default PageTable


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
  