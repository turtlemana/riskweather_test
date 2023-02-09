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
import useSWRInfinite from 'swr/infinite'


const getKey = (pageIndex, previousPageData) => {
    if (pageIndex === 0) return `/api/assetList?&page=1&limit=20`;
    if (pageIndex + 1 > +previousPageData.pages) return null;
    return `/api/assetList?&page=${pageIndex+1 }&limit=20`;
  };

const fetcher = (url) => axios.get(url).then((res) => res.data)

function PageTable({ mainCard,allAssets,cryptoExchange,miniData,prefetchData }) {
    const [limit,setLimit]=useState(20)
    const [page,setPage]=useState(1)

const {data, setSize, size}=useSWRInfinite(getKey,fetcher)
const assetList=data?[].concat(...data) : [];
const onNextBtn = () => {
    setSize(size + 1);
  };
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
    <Table>
    <TableHeader></TableHeader>
                                    
    <div className={`max-[768px]:overflow-x-scroll overflow-y-scroll slim-scroll  ` }>
                               
    {miniChartData.map((list)=> (<div key={list.ticker}>
    <TableContent  coinIcon={list.coinIcon} name={list.name} ticker={list.ticker} index={list.cat} weather={list.weather} 
                    tailRisk={list.tailrisk.toFixed(4)} chartData={list.chartData} figure={list.tailriskchg} figure2={list.pricechg} price={list.price.toFixed(2)}>
    </TableContent>
    </div>))}
    </div>
    </Table>
    <div className={`flex justify-between`}>
    <button onClick={onNextBtn}>더 보기</button>

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
  