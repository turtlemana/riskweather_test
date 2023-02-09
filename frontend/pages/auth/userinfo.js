/* eslint-disable react/no-unescaped-entities */
import React,{useRef,useState,useMemo, useEffect} from 'react';
import Script from 'next/script';
import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';
import Dropdown from '../../components/layouts/Dropdown';
import Button from '../../components/Button';
import Image from 'next/image';
import FormButton from '../../components/FormButton';
import 'react-phone-number-input/style.css'
import PhoneInput,{parsePhoneNumber,formatPhoneNumber,formatPhoneNumberIntl} from 'react-phone-number-input'
import useWindowDimensions from '../../public/useWindowDimensions';
import Table from '../../components/Table';
import SelectTable from '../../components/SelectTable';
import SelectTableContent from '../../components/SelectTableContent';
import useSWR from 'swr'
import fetcher from '../../public/utils/fetchUserInfo';
import {BirthdayPicker} from "react-birthday-picker"
import Loading from '../../components/Loading';
import { Alert } from 'flowbite-react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import {Controller,useForm} from 'react-hook-form';
import { toast } from 'react-toastify';





const UserInfo=({allAssets})=>{

    const {data:userInfo, error,isValidating ,mutate}=useSWR("/api/auth/getUser",fetcher)
    console.log(userInfo)
    // const accessLevel=userInfo?.accessLevel
    // if(!accessLevel){router.push("/auth/userinfo")}
    const {
        handleSubmit,
        register,
        formState: { errors },
      } = useForm();

    const [birthday,setBirthday]=useState(new Date)
    const handleBirthday=birthday=>{if(birthday){setBirthday(birthday)}}
    console.log(birthday)

    const sortedCrypto=useMemo(()=>allAssets.filter((asset)=>asset.cat=="Crypto"),[allAssets])
    const sortedIndex=useMemo(()=>allAssets.filter((asset)=>asset.cat=="Index"),[allAssets])
    const sortedStock=useMemo(()=>allAssets.filter((asset)=>asset.cat=="Stock"),[allAssets])

    // Contact Form submitting method 
    const nameInputRef=useRef()

   
    const phoneInputRef=useRef()
    const companyInputRef=useRef()
    const genderSelectRef=useRef()

    const [country,setCountry]=useState()

    const checked=useMemo(()=>{
        const checkedAssets={}
        for (let i=0; i<userInfo?.interestedAssets?.length; i++){
            checkedAssets[userInfo?.interestedAssets[i]]=true
        }
        return checkedAssets
    },[userInfo])
    console.log(checked)
    const [assetChecked,setAssetChecked]=useState(checked);

    useEffect(()=>{
        mutate()
        setAssetChecked(checked)
        
        nameInputRef.current.value=userInfo?.name ? userInfo?.name : ""
        
        const phoneNumber=formatPhoneNumberIntl(userInfo?.mobile)
        // phoneInputRef.current.value=userInfo?.mobile ? userInfo?.mobile : ""
       setCountry(phoneNumber)
        genderSelectRef.current.value=userInfo?.sex ? userInfo?.sex : "Sex"
        companyInputRef.current.value=userInfo?.company ? userInfo?.company : ""
        // mutate("api/auth/getUser")
    },[userInfo])

    const handleCheck=event=>{
        console.log(event.target.checked)

        if(Object.values(assetChecked).filter(v=>v==true).length>=10 && event.target.checked )return
       
       
        setAssetChecked({...assetChecked,[event.target.name]:event.target.checked})

    
    }
    console.log(assetChecked)
    console.log(userInfo?.interestedAssets)

    
    const selectOptions=[{key:"Male",label:"Male"},{key:'Female',label:'Female'}, {key:'Other',label:'Other'}]


    const submitHandler=async(e)=>{
        e.preventDefault();
        // const jsonInfo=await fetch(`http://localhost:3000/api/auth/getUser`).then((res)=>res.json())
        // const userInformation=await JSON.parse(jsonInfo.user)
     

   
        const enteredName=nameInputRef.current.value;
        const enteredPhone=phoneInputRef.current.value;
        const enteredCompany=companyInputRef.current.value;
      
        const selectedGender=genderSelectRef.current.value;

        const selectedCountry=parsePhoneNumber(country).country
        const formatedNumber=formatPhoneNumberIntl(country)
        // let contactDate=new Date()
        // let dateFormat = contactDate.getFullYear() +
        // '-' + ( (contactDate.getMonth()+1) < 9 ? "0" + (contactDate.getMonth()+1) : (contactDate.getMonth()+1) )+
        // '-' + ( (contactDate.getDate()) < 9 ? "0" + (contactDate.getDate()) : (contactDate.getDate()) )+
        // ' ' + ( (contactDate.getHours()) < 9 ? "0" + (contactDate.getHours()) : (contactDate.getHours()) )+
        // ':' + ( (contactDate.getMinutes()) < 9 ? "0" + (contactDate.getMinutes()) : (contactDate.getMinutes()) )+
        // ':' + ( (contactDate.getSeconds()) < 9 ? "0" + (contactDate.getSeconds()) : (contactDate.getSeconds()) )
        const preferredAssets=[]
        for(const[key,value] of Object.entries(assetChecked)){
            if(value==false){
                delete assetChecked[key]
            } else {
                preferredAssets.push(key)
            }
        }
        
     
        let userBirth = birthday.getFullYear() +
		'-' + ( (birthday.getMonth()+1) < 9 ? "0" + (birthday.getMonth()+1) : (birthday.getMonth()+1) )+
		'-' + ( (birthday.getDate()) < 9 ? "0" + (birthday.getDate()) : (birthday.getDate()) );
        
        const portFolio=userInfo?.portFolio
        if(portFolio){
            for (const [key,value] of Object.entries(userInfo?.portFolio)){
                if(!preferredAssets.includes(key)){
                    delete portFolio[key]
                }
            }
        }
        // const portFolio=preferredAssets.reduce((acc,curr)=>(acc[curr]=0,acc),{})
        const enteredInput={
            ...userInfo,
            name:enteredName,
            country:selectedCountry,
            mobile:formatedNumber,
            birth:userBirth,
            company:enteredCompany,
            interestedAssets:preferredAssets,
            portFolio:portFolio,

            sex:selectedGender,

        }
        enteredInput.accessLevel=2


        if(enteredInput.interestedAssets.length==0){
            return toast.error("You must choose at least 1 asset")
        }
    

        const data=await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({enteredInput})
        }).then((res)=>{if(res.ok){toast.success("Your Information has added");window.location.replace(`http://localhost:3000/auth/profile`);}else{toast.error("Fetch Error")}})
    //    nameInputRef.current.value=""
    //    phoneInputRef.current.value=""
    //    companyInputRef.current.value=""
    //    genderSelectRef.current.value=""

    //    return [data.enteredInput]

    }
    // if(isValidating) {return <Loading/>}
    return (
        <div className={`min-h-screen`}>
          
        <Header/>
            <div className={`my-40 max-[1024px]:my-16`}>
                {/* Contact page description & Image */}
                <div className={`wrap flex flex-col gap-8 max-[1280px]:wrap3`}>
                <h1 className={`text-2 font-bold text-center`}>INFORMATION</h1>

                    {/* Contact Form */}
                    <div className={`container-line lg:ml-10 flex-1`}>
                        <form onSubmit={submitHandler} className={`form-label`}>
                            <div className={`grid grid-cols-1 gap-5 mb-5 w-full`}>
                                <input id="name" {...register('name',{required:"Please enter name"})}className={`form-input`} type="text" required placeholder="Name" ref={nameInputRef}></input>
                                <PhoneInput id="phone"  defaultCountry={`${userInfo?.country ? userInfo?.country : "KR" }`} className={`form-input `} type="text" required placeholder="Phone number" value={country} onChange={setCountry} ref={phoneInputRef}></PhoneInput>
                            </div>
                            <div className={`grid grid-cols-1  gap-5 mb-5 w-full`}>
                            {/* <div className="relative">
  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
  </div>
  <input datepicker datepicker-orientation="bottom right" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date"/>
</div> */}
                                <DatePicker maxDate={new Date()} peekNextMonth showMonthDropdown showYearDropdown dropdownMode='select'   yearItemNumber={9}  className={'form-input w-full'} selected={userInfo?.birth ? new Date(userInfo?.birth)  : birthday } placeholderText={"Birth date"} onChange={handleBirthday}></DatePicker>
                            <Dropdown className={`w-full`} ref={genderSelectRef} options={selectOptions} placeholder="Sex"></Dropdown>
                                <input id="company" className={`form-input w-full`} type="text" required placeholder="Company" ref={companyInputRef}></input>

                            </div>
                            <div className="m-5">
                            <Table>
                                <h1 className="font-bold text-gray-700 uppercase">Crypto</h1>
                                <SelectTable>
                                {sortedCrypto.map((asset)=><div key={asset.ticker}>
                                    <SelectTableContent  onChange={handleCheck} checked={assetChecked[asset.name]||""}  name={asset.name} ticker={asset.ticker} index={asset.cat}></SelectTableContent>
                                </div>)}
                                </SelectTable>
                            </Table>
                            <Table>    
                            
                                <h1 className="font-bold text-gray-700 uppercase">Index</h1>
                                <SelectTable>
                                
                                {sortedIndex.slice(0,9).map((asset)=><div key={asset.ticker}>
                                    <SelectTableContent   onChange={handleCheck} checked={assetChecked[asset.name]||""} name={asset.name} ticker={asset.ticker} index={asset.cat}></SelectTableContent>
                                </div>)}
                                </SelectTable>
                                <SelectTable>
                                {sortedIndex.slice(10).map((asset)=><div key={asset.ticker}>
                                    <SelectTableContent   onChange={handleCheck} checked={assetChecked[asset.name]||""} name={asset.name} ticker={asset.ticker} index={asset.cat}></SelectTableContent>
                                </div>)}
                                </SelectTable>
                            </Table>
                            <Table>
                                <h1 className="font-bold text-gray-700 uppercase">Stock</h1>
                                <SelectTable>
                                {sortedStock.slice(0,9).map((asset)=><div key={asset.ticker}>
                                    <SelectTableContent   onChange={handleCheck} checked={assetChecked[asset.name]||""} name={asset.name} ticker={asset.ticker} index={asset.cat}></SelectTableContent>
                                </div>)}
                                </SelectTable>
                                <SelectTable>
                                {sortedStock.slice(10).map((asset)=><div key={asset.ticker}>
                                    <SelectTableContent   onChange={handleCheck} checked={assetChecked[asset.name]||""} name={asset.name} ticker={asset.ticker} index={asset.cat}></SelectTableContent>
                                </div>)}
                                </SelectTable>
                            </Table>
                            </div>


                            <div className={`flex justify-center`}>
                                <FormButton name="Send" size={`w-1/2`}></FormButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer></Footer>

        </div>
        
     
    )
}

export default UserInfo;

export async function getServerSideProps(context){

    // const res = await axios.get(`http://localhost:8000`)
//     const [res,res2] = await Promise.all( [fetch(`http://localhost:8000/api/AllAssets`),
// fetch("http://localhost:3000/api/auth/getUser")])
//     // const data=JSON.stringify(res)
//     const allAssets= await res.json()
//     const userInfo=await res2.json()

    const res=await fetch(`http://localhost:8000/api/AllAssets`)
    const allAssets=await res.json()

    const session = await unstable_getServerSession(context.req, context.res,authOptions)

    if (!session) {
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      }
    }
  
    
  
  
    return { props: { allAssets } }
  }
  
