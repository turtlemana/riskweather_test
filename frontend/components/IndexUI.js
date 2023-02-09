import React from 'react';

const IndexUI=(props)=>{

  return (
    <div className={`w-44 m-auto`}>
      <div className={`w-full h-44 flex flex-col items-center justify-center bg-blue-50 rounded-full text-center`}>
        <h4 className={`text-5`}>{props.name}</h4>
        <p className={`text-5xl font-bold text-gray-600`}>{props.num}</p>
      </div>
    </div>
  )

}

export default IndexUI;