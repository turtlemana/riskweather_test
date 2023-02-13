import React from 'react'
import RiskMap from '../components/maps/Map'

function Map({ mainCard,allAssets,cryptoExchange,miniData,prefetchData }) {
  return (
    <div className={`w-[1800px] h-[1800px]`}>
      <RiskMap allAssets={allAssets}/>
    </div>
  )
}

export default Map

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