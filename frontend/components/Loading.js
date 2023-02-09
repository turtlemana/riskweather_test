/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import Header from './layouts/Header';
import Footer from './layouts/Footer';

const Loading=(props)=>{

  return (
    <div className="min-h-screen">
      <Header/>
    <div className={`text-center m-5`}>
        <div className={`loading`}></div>
    </div>
    <Footer/>
    </div>
  )

}

export default Loading;