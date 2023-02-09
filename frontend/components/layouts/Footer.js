import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import juroLogo from '../../public/img/logo_juro.png'
import facebookLogo from '../../public/img/social.png'

const Footer=()=>{

    const {asPath}=useRouter()
    const [curPath,setCurPath]=useState();

    useEffect(()=>{setCurPath(asPath)},[asPath])
    
    return (
        <footer className={`flex items-center bg-gray-300 h-72 sticky top-[100vh]`}>
            <div className={`flex flex-col lg:flex-row lg:items-end justify-between ` + ((curPath === "/" || curPath === "/contact" ) ? `wrap` : `wrap2`)}>
                <div className={`flex flex-col lg:flex-row items-start mb-5`}>
                    <div className={`mr-5 mb-5 cursor-pointer`}>
                        <a href={'/'}><Image width="250px" height="25px" src={juroLogo} alt="logo"/></a>
                    </div>
                    <ul>
                        <li><p className={`text-6 font-light mb-1`}><span className={`font-medium mr-3`}>Phone</span>070-4603-2370</p></li>
                        <li><p className={`text-6 font-light mb-1`}><span className={`font-medium mr-3`}>Fax</span>02-722-2370</p></li>
                        <li><p className={`text-6 font-light mb-1`}><span className={`font-medium mr-3`}>Email</span>info@juroinstruments.com</p></li>
                        <li><p className={`text-6 font-light mb-1`}><span className={`font-medium mr-3`}>Web</span>http://www.juroinstruments.com</p></li>
                    </ul>
                </div>
                <div className={`flex_align`}>
                    <a href="https://ko-kr.facebook.com/juroinstruments/">
                        <h2 className={``}><Image src={facebookLogo} alt=""/></h2>
                    </a>
                </div>
            </div>

        </footer>
    )
}

export default Footer;