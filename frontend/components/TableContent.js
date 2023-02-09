/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useWindowDimensions from '../public/useWindowDimensions';
import MiniCharts from './chart/MiniCharts';

const TableContent=(props)=>{
  
  const router=useRouter();


  return (
    <div onClick={()=>{router.push({pathname:`/detail`, query:{asset:props.ticker}})}}>
      <a className={`bg-white border-b hover:bg-gray-50 flex items-center px-4 py-2  max-[1024px]:gap-6`}>
          <div scope="row" className={`font-medium text-gray-900 whitespace-nowrap basis-1/6 max-[1024px]:basis-1/6 `}>
            <div className={`flex items-center`}>
              <div className={`w-8 h-8 bg-gray-100 rounded-full max-[1024px]:w-6 max-[1024px]:h-6`}>
                  <Image width="48px" height="48px" src={`/img/${props.ticker}.png`} alt={`${props.coinIcon}`}></Image>
              </div>
              <div className={`ml-2`}>
                  {props.name.length<12 ? <h4 className={`text-6  mb-0 max-[1280px]:text-[12px]`}>{props.name}</h4>
                  :  <h4 className={`text-6  text-xs mb-0 max-[1280px]:text-[10px]`}>{props.name}</h4>}
                  <p className={`text-7  max-[1280px]:text-[11px]`}>{props.index}</p>
              </div>
            </div>
          </div>
          <div className={`text-center flex-1 `}>
            <div className={`h-8 w-8  m-auto`}>
                <Image width="28px" height="28px" src={`/img/${props.weather}.svg`} alt={`${props.weather}`}></Image>
            </div>
          </div>
          <div className={`text-center flex-1 `}>
            <p className={`text-6 m-0 max-[1280px]:text-[13px]`}>{props.tailRisk}</p>
          </div>
          <div className={`text-center flex-1`}>
            <div className={`w-5 h-5 m-auto`}>
              <MiniCharts chartData={props.chartData}></MiniCharts>
            </div>
          </div>
          <div className={`text-center flex-1 `}>
            <p className={(props.figure > 0 ? `text-green` : `text-red`) + ` text-6 m-0 max-[1280px]:text-[13px]`}>{props.figure}%</p>
          </div>
          <div className={`text-center flex-1 `}>
            {(props.name!="Samsung"&&props.name!="SoftBank"&&props.name!="ASML Holding") && <p className={`text-6 m-0 max-[1280px]:text-[13px]`}>{props.index!="Index" ? "＄"  : ""}{props.price}</p>}
            {props.name=="Samsung" && <p className={`text-6 m-0 max-[1280px]:text-[13px]`}>￦{props.price}</p>}
            {props.name=="ASML Holding" && <p className={`text-6 m-0 max-[1280px]:text-[13px]`}>￡{props.price}</p>}
            {props.name=="SoftBank" && <p className={`text-6 m-0 max-[1280px]:text-[13px]`}>￥{props.price}</p>}
          </div>
          <div className={`text-center flex-1`}>
            <p className={(props.figure2 > 0 ? `text-green` : `text-red`) + ` text-6 m-0 max-[1280px]:text-[13px]`}>{props.figure2}%</p>
          </div>
      </a>
      </div>
  )

}

export default TableContent;