/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useWindowDimensions from '../public/useWindowDimensions';

const SelectTable=(props)=>{
  
  const router=useRouter();


  return (
    <div>
      <div className={`bg-white border-b  flex items-center px-4 py-2  max-[1024px]:gap-6 justify-start`}>

        {props.children}


    
      </div>
      </div>
  )

}

export default SelectTable;