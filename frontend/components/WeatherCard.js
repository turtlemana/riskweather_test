import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const WeatherCard=(props)=>{
  const router=useRouter();

  return (
    
    <div className={`container-gray flex flex-col link`} onClick={()=>{router.push({pathname:`/detail/`, query:{asset:props.ticker}})}}>
        <div className={`icon-img flex flex-1 justify-center`}>
          <Image width="120px" height="120px" src={`/img/${props.weather}.svg`} alt={`${props.weather}`}></Image>
        </div>
        <div className={`flex basis-24 items-center justify-between bg-white p-5 rounded-b-lg`}>
          <div className={`flex items-center`}>
            <div className={`w-12 h-12 bg-gray-100 rounded-full `}>
              <Image width="48px" height="48px" src={`/img/${props.coinIcon}.png`} alt={`${props.coinIcon}`}></Image>
            </div>
            <div className={`ml-3`}>
              {props.name.length<13 ? <h4 className={`text-card max-[1280px]:text-card`}>{props.name}</h4>
              :  <p className={`text-card max-[1280px]:text-card  max-[1835px]:text-sm`}>{props.name}</p>}
              <p className={`text-7`}>{props.ticker}</p>
            </div>
          </div>
          <div>
            <p className={(props.figure > 0 ? `text-green max-[1280px]:text-8 ` : `text-red max-[1280px]:text-9 `) }>{props.figure}%</p>
          </div>
        </div>
    </div>
  )

}

export default WeatherCard;