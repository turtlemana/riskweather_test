/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';

const Table=(props)=>{

  return (
    <div className={`overflow-auto max-[960px]:overflow-x-scroll relative sm:rounded-lg`}>
        <div className={`table w-full text-sm text-left text-gray-500`}>
            {props.children}
        </div>
    </div>
  )

}

export default Table;