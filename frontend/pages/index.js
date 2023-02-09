import {useRef} from 'react';
import axios from 'axios';
import Header from '../components/layouts/Header';

import Footer from '../components/layouts/Footer';

import WeatherCard from '../components/WeatherCard';
import IndexCard from '../components/IndexCard';
import IndexUI from '../components/IndexUI';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import Image from 'next/image';
import Link from 'next/link';
import FormButton from '../components/FormButton';
import useWindowDimensions from '../public/useWindowDimensions';
import { useSession } from 'next-auth/react';
import {getToken} from 'next-auth/jwt'




export default function Home({homeCard,allAssets}) {
  // console.log(yfInfo.quoteSummary.result[0].assetProfile)
  // console.log(yfStats.quoteSummary.result[0].defaultKeyStatistics)

  // console.log(btcInfo)

  
  console.log(allAssets)
  // Sending Email 
  const emailInputRef=useRef()

  const submitHandler=(e)=>{
    let contactDate=new Date()
    let dateFormat = contactDate.getFullYear() +
    '-' + ( (contactDate.getMonth()+1) < 9 ? "0" + (contactDate.getMonth()+1) : (contactDate.getMonth()+1) )+
    '-' + ( (contactDate.getDate()) < 9 ? "0" + (contactDate.getDate()) : (contactDate.getDate()) )+
    ' ' + ( (contactDate.getHours()) < 9 ? "0" + (contactDate.getHours()) : (contactDate.getHours()) )+
    ':' + ( (contactDate.getMinutes()) < 9 ? "0" + (contactDate.getMinutes()) : (contactDate.getMinutes()) )+
    ':' + ( (contactDate.getSeconds()) < 9 ? "0" + (contactDate.getSeconds()) : (contactDate.getSeconds()) )
    
    
    e.preventDefault();
    const enteredEmail=emailInputRef.current.value;

    const enteredInput={
      datetime:dateFormat,
      email:enteredEmail
    }
    fetch("https://riskweather.org/api/OnlyEmail/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(enteredInput)
  }).then((res)=>{if(res.ok){alert("Your Email has sent successfully")}else{alert("Server Error: Fail to Send")}})

  emailInputRef.current.value=""
  }

 

  return (
    <div className={`min-h-screen`}>
      <Header/>
      <div className={`h-600 max-[767px]:h-500 mb-16`}>
        <div className={`main_banner flex bg-[url('/img/banner_main.png')] bg-no-repeat bg-center bg-contain w-full h-full`}>
          <div className={`wrap max-[450px]:wrap3 max-[450px]:mb-16`}>
            <h1 className={`text-1`}>Check out the weather,</h1>
            <h1 className={`text-1 mb-10`}>before you go out to<br />crypto economy</h1>
            <Button name="Request a demo" link={'/contact'}></Button>
          </div>
        </div>
      </div>

      {/* Card list */}
      <div className={`wrap mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
        <div className={`title text-center mb-6`}>
          <h2 className={`text-4 font-medium`}>RISK WEATHER</h2>
          <p className={`text-6 font-light`}>Check out the weather, before you go out to crypto economy.</p>
        </div>
        <div className={`card-list`}>
          <ul className={`grid 2xl:grid-cols-3 gap-5 xl:grid-cols-3 grid-cols-1 `}>
          {homeCard.map((card)=>(<li key={card.ticker}><WeatherCard key={card.ticker} name={card.name} weather={card.weather} ticker={card.ticker} coinIcon={card.ticker} figure={card.tailriskchg}></WeatherCard></li>))}
    
          </ul>
        </div>
      </div>

      {/* Map Image */}
      <div className={`h-500 mb-16`}>
        <div className={`main_banner flex bg-[url('/img/img_map.png')] bg-no-repeat bg-center bg-cover  h-full`}>
          <div className={`wrap max-[450px]:wrap3 max-[450px]:mb-16`}>
            <h2 className={`text-2 mb-4`}>Explore world Risk weather</h2>
            <p className={`text-6 font-light mb-10`}>Find out upcoming risk of your crypto assets<br />
              Save your money with Risk weathercrypto economy</p>
              <Button name="Explore" link={'/explore'}></Button>
          </div>
        </div>
      </div>
      
      {/* AML Index */}
      <div className={`wrap mb-16 max-[450px]:wrap3 max-[450px]:mb-16`}>
        <div className={`title text-center`}>
          <p className={`text-5 mb-8`}>Risk weather monitoring 63 assets in Real-time.</p>
        </div>
        <div className={`list mb-20`}>
          <ul className={`grid lg:grid-cols-3 gap-5`}>
              <li><IndexUI name="Cryptocurrecy" num="9"></IndexUI></li>
              <li><IndexUI name="Index" num="13"></IndexUI></li>
              <li><IndexUI name="Stock" num="20"></IndexUI></li>
          </ul>
        </div>
        <div className={`title text-center mb-8`}>
          <h2 className={`text-4 font-medium`}>AML</h2>
          <p className={`text-6 font-light mb-8`}>Anti money laundering (AML) refers to the web of laws, regulations, and procedures aimed at uncovering efforts to disguise illicit funds as legitimate income. Money laundering seeks to conceal crimes ranging from small-time tax evasion and drug trafficking to public corruption and the financing of groups designated as terrorist organizations.
1

AML legislation was a response to the growth of the financial industry, the lifting of international capital controls and the growing ease of conducting complex chains of financial transactions.

A high-level United Nations panel has estimated annual money laundering flows at $1.6 trillion, accounting for 2.7% of global GDP in 2020</p>
        </div>
        <div className={`list mb-10`}>
          <ul className={`grid lg:grid-cols-2 gap-5 mb-6`}>
              <li><IndexCard name="Today's Watch list" num="3,182,412" color="bg-purple-100" icon="bg-search"></IndexCard></li>
              <li><IndexCard name="Today's Sanction List" num="438,717" color="bg-red-100" icon="bg-list"></IndexCard></li>
          </ul>
          <div className={`mb-4 text-center`}>
              <Button name="View More" color="btn-primary-line" link={"/explore"}></Button>
          </div>
        </div>
      </div>

      {/* Band Banner */}
      <div className={`h-72 mb-16`}>
        <div className={`main_banner flex bg-[url('/img/banner_band.png')] bg-no-repeat bg-center h-full`}>
          <div className={`grid wrap max-[450px]:wrap3 lg:grid-cols-2 items-center justify-items-center`}>
          {useWindowDimensions().width<1024 &&
            <div className={`mb-3`}>
              <Link href="https://www.acams.org/en" passHref>
                <a>
              <Image className={`link`} width="300px" height="100px" src="/img/logo_acams.png" alt="acams"></Image>
              </a>
              </Link>
            </div>}
            <div>
              <h2 className={`text-2 text-white mb-8 max-[450px]:text-2 max-[450px]:text-white`}>
                Don&rsquo;t risk your business.<br />
                Meet AML Dashboard.
              </h2>
              <div className={`max-[1023px]:pl-20`}>
              <Button name="Contact Us" link={"/contact"} color="btn-white" textSize="text-xs" size='btn-md'></Button>
              </div>
            </div>
            {useWindowDimensions().width>=1024 &&
            <div>
              <Link href="https://www.acams.org/en" passHref>
                <a>
              <Image className={`link`} width="300px" height="100px" src="/img/logo_acams.png" alt="acams"></Image>
              </a>
              </Link>
            </div>}
          </div>
        </div>
      </div>

      {/* Feature */}
      <div className={`mb-16 wrap max-[450px]:wrap3 max-[450px]:mb-16 `}>

          <div>
            <h2 className={`text-2 mb-4`}>Digital assets portfolio risk management service</h2>
            <p className={`text-6 font-light mb-10`}>Digital assets portfolio risk management service will be release soon.<br />
              Monitor your portfolio&rsquo;s risk and manage digital assets with our solution.</p>

          </div>
          <div>
          <div className={`grid lg:grid-cols-2`}>
            <div className={`list mb-10`}>
              <h4 className={`text-5 font-medium mb-3`}>Feature</h4>
              <ul>
                <li className={`mb-2`}>
                  <p className={`text-6 font-light`}>
                    <span className={`list-bullet`}></span>
                    Risk assessment and asset allocation
                  </p>
                </li>
                <li className={`mb-2`}>
                  <p className={`text-6 font-light`}>
                    <span className={`list-bullet`}></span>
                    Early warning system
                  </p>
                </li>
                <li className={`mb-2`}>
                  <p className={`text-6 font-light`}>
                    <span className={`list-bullet`}></span>
                    Recommend risk hedge method
                  </p>
                </li>
              </ul>
            </div>
            <div >
              <h4 className={` text-5 font-medium mb-3`}>Register your e-mail</h4>
              <div className={`container`}>
                <form onSubmit={submitHandler} >
                {/* <FormInput label="Your Email" type="email" placeholder="name@riskweather.com" ref={emailInputRef}>
                  <FormButton type="submit" name="Send"></FormButton>
                </FormInput> */}
                <label htmlFor="helper-text" className={`form-label`}>Your Email</label>
                <div className={`min-[450px]:flex items-center`}>
                  <input  type="email"  required  id="helper-text"
                    className={`w-full form-input  min-[450px]:flex-1 min-[450px]:mx-2 max-[450px]:mb-1`} placeholder="name@riskweather.com" ref={emailInputRef} />
                    {/* <FormButton type="submit" name="Send" ></FormButton> */}

                  <button  className={ `btn-md max-[450px]:btn-sm btn-primary max-[450px]:w-full` } type="submit" name="Send">
                  {useWindowDimensions().width<540  ? <p>Send &gt;</p> : <p>Send &gt;</p>}
                </button>
                  

                </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}

export async function getServerSideProps(){

  // const res = await axios.get(`http://localhost:8000`)
  // const res = await fetch(`http://localhost:8000/api/CryptoTop3`)
  const [res,res2,res3,res4]=await Promise.all([fetch(`http://localhost:8000/api/CryptoTop3`),
  fetch(`https://query1.finance.yahoo.com/v11/finance/quoteSummary/aapl?modules=assetProfile`),
  fetch(`https://query1.finance.yahoo.com/v11/finance/quoteSummary/aapl?modules=defaultKeyStatistics`),
  fetch("http://localhost:3000/api/allAssets")
])
  // const res2= await yahooFinance.search("AAPL")

  // const data=JSON.stringify(res)
  const [homeCard,yfInfo,yfStats,allAssets]= await Promise.all([res.json(),res2.json(),res3.json(),res4.json()]) 
  
  

  


  return { props: { homeCard , yfInfo,yfStats,allAssets} }
}

