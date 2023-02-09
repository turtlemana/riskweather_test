import React from 'react';
import Image from 'next/image';

const IndexCard=(props)=>{


  return (
    <div className={`h-40 flex flex-col items-center justify-center rounded-lg text-center bg-no-repeat bg-right-bottom bg-contain bg-20 shadow-lg shadow-gray-200 ` 
    + (props.color ? `${props.color} ` : ``) 
    + (props.icon ? `${props.icon}` : ``)}>
      <h4 className={`text-5 mb-2`}>{props.name}</h4>
      <p className={`text-4xl font-bold text-gray-600`}>{props.num}</p>
    </div>
  )

}

export default IndexCard;