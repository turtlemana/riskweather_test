/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const TableHeader=(props)=>{


  
  return (

    <ul className={`flex items-center overflow-auto  text-xs font-bold text-gray-700 uppercase bg-gray-100 px-4 py-4 rounded-t-lg gap-4 max-[1024px]:gap-12 max-[1024px]:text-[10px] `}>
      <li className={`basis-2/5 max-[1024px]:basis-2/5`}>Assets</li>
      <li className={`text-center flex-1 ml-9`}>Weather</li>
      <li className={`text-center flex-1`}>Tail risk</li>
      <li className={`text-center flex-1`}>Risk chart</li>
      <li className={`text-center flex-1`}>Risk change</li>
      <li className={`text-center flex-1`}>Price</li>
      <li className={`text-center flex-1`}>Price change</li>
    </ul>
  )

}

export default TableHeader;