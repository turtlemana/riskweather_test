import React,{forwardRef} from 'react'
import Image from 'next/image'
import fetcher from '../public/utils/fetchUserInfo'
import useSWR from 'swr'

function SelectTableContent(props,ref) {
    const {data:userInfo, error, isValidating,mutate}=useSWR("/api/auth/getUser",fetcher)

   const checkedAssets= (userInfo?.interestedAssets)
//    console.log(props.checked[0])
//    console.log(checkedAssets[0])
  return (
//     <div><input type="checkbox" id="logoCheckbox" />
//           <label htmlFor="logoCheckbox">
//         <Image width="48px" height="48px" src={`/img/${props.ticker}.png`} alt={`${props.ticker}`}/>
//         </label>
//  </div>
// {isValidating ? }
    <div className="`font-medium text-gray-900 whitespace-nowrap basis-1/6 max-[1024px]:basis-1/6 ml-8">
    <input value={props.value} name={props.name}  checked={props.checked}  onChange={props.onChange}  type="checkbox" id={props.ticker} scope="row"  className="hidden peer" />
        <label htmlFor={props.ticker} className={`inline-flex p-1 w-full items-center  rounded-full  peer-checked:bg-gray-300  cursor-pointer`}>
            <div className="flex flex-col items-center">
            <Image width="48px" height="48px" src={`/img/${props.ticker}.png`} alt={`${props.ticker}`}></Image>
            <div className={`ml-2`}>
            <h4 className={`text-6  mb-0 max-[1280px]:text-[12px]`}>{props.name}</h4>
          {/* {props.name.length<12 ? <h4 className={`text-6  mb-0 max-[1280px]:text-[12px]`}>{props.name}</h4>
          :  <h4 className={`text-6  text-xs mb-0 max-[1280px]:text-[10px]`}>{props.name}</h4>} */}
      </div>
      </div>
        </label>
    {/* <div className={`flex items-center`}> */}
      {/* <div className={`w-8 h-8 bg-gray-100 rounded-full max-[1024px]:w-6 max-[1024px]:h-6`}>
          <Image width="48px" height="48px" src={`/img/${props.ticker}.png`} alt={`${props.ticker}`}></Image>
      </div> */}
      {/* <div className={`ml-2`}>
          {props.name.length<12 ? <h4 className={`text-6  mb-0 max-[1280px]:text-[12px]`}>{props.name}</h4>
          :  <h4 className={`text-6  text-xs mb-0 max-[1280px]:text-[10px]`}>{props.name}</h4>}
      </div> */}
    {/* </div> */}
  
  </div>
  )
}

export default forwardRef(SelectTableContent)
