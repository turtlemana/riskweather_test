import React,{useEffect} from 'react'
import {getProviders,signIn} from 'next-auth/react'
import Image from 'next/image'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
// import { unstable_getServerSession } from 'next-auth/next';
// import { authOptions } from '../api/auth/[...nextauth]';

import useSWR from 'swr'
import fetcher from '../../public/utils/fetchUserInfo';
import { useRouter } from 'next/router'; 
import { useSession } from 'next-auth/react'
import {toast} from 'react-toastify'




const SignIn=({providers})=> {
    const router=useRouter()
   const session=useSession();
   console.log(session)
    
    // console.log(providers)
    // // const {data:session} = useSession();
    // console.log(session)
   
//     const {data:userInfo, error,isValidating ,mutate}=useSWR("/api/auth/getUser",fetcher)
//    console.log(userInfo)
//     useEffect(()=>{
//         const accessLevel=userInfo?.accessLevel
//         if(!accessLevel){router.push("/auth/signin")}
//         else if(accessLevel==1){router.push("/auth/userinfo")}
//         else if(accessLevel==2){router.push("/auth/profile")}
//     },[userInfo])

    // useEffect(()=>{
    //     if(session?.user?.accessLevel==""||session?.user?.accessLevel==1){
    //         window.location.replace(`http://localhost:3000/auth/userinfo`);
    //     } else if(session?.user?.accessLevel==2) {
    //         window.location.replace("http://localhost:3000")
    //     }

    // },[session])

    // const addUserToUpstash=async()=>{
    //     const id=uuid();
    //     const user={id,email:session.user?.email, original_name:session.user?.name, original_image:session.user?.image,created_at:Date.now(), accessLevel:1}
    //     console.log(user)
    //     const data = await fetch('/api/auth/addUser',{
    //         method:"POST",
    //         headers:{
    //             "content-type":"application/json"
    //         },
    //         body:JSON.stringify({user})
    //     }).then(res=>res.json())

        

    //     return [data.user]
    // }
    // if(session)return "/auth/profile"
    
  return (
    
    <div className="min-h-screen justify-center items-center align-middle content-center">
     <Header/> 
     
    <div className="flex flex-col  justify-center items-center content-center my-40 max-[1024px]:my-16">
        <div>
            <Image src="/img/coin_character.png" alt="logo" width={500} height={500} className="  mb-5"/>
        </div>
        <div className="flex flex-col justify-center mt-5">
        {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>signIn('google')}>Sign in with Google</button> */}
        {Object.values(providers).map((provider)=>(<div className={"mb-1"} key={provider.name}>
            <button className="bg-white hover:bg-slate-200 text-black border-2 font-normal py-2 px-4 rounded w-[350px]" onClick={()=>{signIn(provider.id,{callbackUrl:"http://localhost:3000/auth/profile"})}}>Sign in with {provider.name}</button>
        </div>))}
    </div>
        
    </div>
    <Footer/>
    </div>
  )
}

export default SignIn


export async function getServerSideProps(context) {
    const providers = await getProviders()
    
    // const session = await unstable_getServerSession(context.req, context.res,authOptions)
    // const res= await fetch(`http://localhost:3000/api/auth/getUser`)
    // const user=await res.json()
    // console.log(user)

    // if (user) {
    //   return {
    //     redirect: {
    //       destination: '/auth/signin',
    //       permanent: false,
    //     },
    //   }
    // }
  
    
  

    return {
      props: {providers},
    }
  }