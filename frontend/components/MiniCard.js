import React,{forwardRef,useEffect,useState} from 'react'
import Image from 'next/image'
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'

function MiniCard({asset,onChange,onClick,assetClick,assetSelect,setDisabled},ref) {

  const [inputNum, setInputNum]=useState(ref?.current?.value)
  const inputChangeHandler=(e)=>{
    onChange
    setInputNum(e.target.value)
  }

  return (
    <div  className={`w-full  text-6 hover:bg-gray-100 rounded-md p-1 border-2 cursor-pointer`}  onClick={setDisabled ? ()=>{return}: assetClick}>
    <ul>
    <li className={`${setDisabled ? `bg-gray-300` : `bg-white`}   hover:bg-gray-50 flex items-center justify-between px-4 py-2 gap-3 max-[1024px]:gap-6 `}>
    <div className={`w-6 h-6 mr-1 bg-gray-100 rounded-full max-[1024px]:w-6 max-[1024px]:h-6`}>

                  <Image width="28px" height="28px" src={`/img/${asset.ticker}.png`} alt={`${asset.name}`}></Image>
              </div>
      <div className={`basis-32 p-1`}>
    <p className={` whitespace-nowrap`}>{asset.name}</p>
    </div>
    {asset.tailriskchg>0 ? 
          (<p className="text-green flex-1 flex-center p-1">+{asset.tailriskchg}%</p>)
          :(<p className="text-red flex-1 flex-center p-1">{asset.tailriskchg}%</p>)}
    {asset.pricechg>0 ? 
          (<p className="text-green flex-1 flex-center p-1">+{asset.pricechg}%</p>)
          :(<p className="text-red flex-1 flex-center p-1">{asset.pricechg}%</p>)}
   {assetSelect ? <p className="flex-1 flex-center p-1">{ref?.current?.value ? (asset.price * parseInt(ref.current.value)).toFixed(4) : asset.price.toFixed(4)}</p> :
    <p className="flex-1 flex-center p-1">{asset.price.toFixed(4)}</p>}
          {assetSelect ?
          <div className={``}>
         {/* <div className={`flex-center h-10 scale-75 p-1`}>
         <Image width="28px" height="28px" src={`/img/${asset.weather}.svg`} alt={`${asset.weather}`}></Image>
          </div> */}
          
          <div className={'flex flex-center'}> 
          <input type="number" step="any"  required  min={1} className={'form-input w-20 mr-3 '} ref={ref} onChange={inputChangeHandler} name={asset.name}/>
          <AiOutlinePlusSquare onClick={onClick}className={`text-black font-bold text-xl`}/>
          </div></div> :         <div className={`flex-1 flex-center h-10 scale-75 p-1`}>
        
         <Image width="28px" height="28px" src={`/img/${asset.weather}.svg`} alt={`${asset.weather}`}></Image>
          </div>}
    </li>
    </ul>
  </div>
  )
}

export default forwardRef(MiniCard);
