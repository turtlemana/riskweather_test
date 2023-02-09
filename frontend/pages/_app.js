import '../styles/globals.css'
import {useState,useEffect} from 'react';
import {SessionProvider} from 'next-auth/react'
import {SWRConfig} from 'swr'
import fetcher from '../public/utils/fetchUserInfo';
import Header from '../components/layouts/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps}) {
  // const {allAssets} = pageProps 
  // const {mainCard}= pageProps
  // console.log(allAssets)

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  } 

  if (typeof window === 'undefined') {
    return <></>;
  } else {

  return (
    

    <SessionProvider session={pageProps.session}> 
  
  <Component {...pageProps} />
  <ToastContainer position={"top-center"}/>

   </SessionProvider>


  )
  

}}
// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   let pageProps = {}
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }


//   const [res,res2] = await Promise.all([
//     fetch(`http://localhost:8000/api/Crypto5min`),
//     fetch(`http://localhost:8000/api/AllAssets`),


// ]);


// const [mainCard,allAssets]=await Promise.all([
//     res.json(),
//     res2.json(),

// ]);




//   pageProps = { ...pageProps,mainCard,allAssets }

//   return { pageProps }
// }

// MyApp.getInitialProps () {

//   const [res,res2] = await Promise.all([
//       fetch(`http://localhost:8000/api/Crypto5min`),
//       fetch(`http://localhost:8000/api/AllAssets`),


//   ]);


//   const [mainCard,allAssets]=await Promise.all([
//       res.json(),
//       res2.json(),

//   ]);

  


//   return { props: { mainCard,allAssets} };
// }


export default MyApp

