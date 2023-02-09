/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MiniCharts from './chart/MiniCharts';

const MiniTable=(props)=>{
    const router=useRouter();
   
  return (
    <div className={`overflow-x-auto relative sm:rounded-lg`} onClick={()=>{router.push({pathname:`/detail`, query:{asset:props.ticker}})}}>
        <div className={`w-full text-sm text-left text-gray-500`}>
            <a className={`bg-white hover:bg-gray-50 flex items-center py-1 pl-3`}>
                <div scope="row" className={`basis-1/2`}>
                    <div className={`flex items-center`}>
                        <div className={`w-8 h-8 bg-gray-100 rounded-full `}>
                            <Image width="48px" height="48px" src={`/img/${props.coinIcon}.png`} alt={`${props.coinIcon}`}></Image>
                        </div>      
                        <div className={`ml-3`}>
                            <h4 className={`text-6 mb-0`}>{props.name}</h4>
                            <p className={`text-7`}>{props.ticker}</p>
                        </div>
                    </div>
                </div>
                <div className={`flex justify-center flex-1`}>
                    <div className={`w-6 h-6`}>
                        <MiniCharts chartData={props.chartData}></MiniCharts>
                    </div>
                </div>
                <div className={`flex justify-center flex-1`}>
                    <p className={(props.figure > 0 ? `text-green` : `text-red`) + ` text-6 m-0`}>{props.figure}%</p>
                </div>
                <div className={`flex justify-center flex-1`}>
                    <div className={``}>
                        <Image width="28px" height="28px" src={`/img/${props.weather}.svg`} alt={`${props.weather}`}></Image>
                    </div>
                </div>
            </a>
        </div>
    </div>
  )

}

export default MiniTable;