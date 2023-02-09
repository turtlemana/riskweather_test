/* eslint-disable react/no-unescaped-entities */
import React,{useRef,useState} from 'react';
import Footer from '../components/layouts/Footer';
import Dropdown from '../components/layouts/Dropdown';
import Button from '../components/Button';
import Image from 'next/image';
import Header from '../components/layouts/Header';
import FormButton from '../components/FormButton';
import 'react-phone-number-input/style.css'
import PhoneInput,{parsePhoneNumbear,formatPhoneNumber,formatPhoneNumberIntl} from 'react-phone-number-input'
import useWindowDimensions from '../public/useWindowDimensions';
import {toast} from 'react-toastify'

const Contact=()=>{


    // Contact Form submitting method 
    const nameInputRef=useRef()
    const emailInputRef=useRef()
    const phoneInputRef=useRef()
    const companyInputRef=useRef()
    const jobInputRef=useRef()
    const productSelectRef=useRef()
    const inquiryInputRef=useRef()
    const [country,setCountry]=useState()
     
    const inputId=0;
    const selectOptions=[{key:"Risk weather",label:"Risk weather"},{key:'Risk weather - Portfolio management service',label:'Risk weather - Portfolio management service'}, {key:'AML Dashboard',label:"AML Dashboard"}, {key:'Other',label:'Other'}]



    const submitHandler=(e)=>{
        e.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredEmail=emailInputRef.current.value;
        const enteredPhone=phoneInputRef.current.value;
        const enteredCompany=companyInputRef.current.value;
        const enteredJob=jobInputRef.current.value;
        const selectedProduct=productSelectRef.current.value;
        const enteredInquiry=inquiryInputRef.current.value;
        const selectedCountry=parsePhoneNumber(country).country
        const formatedNumber=formatPhoneNumberIntl(country)
        let contactDate=new Date()
        let dateFormat = contactDate.getFullYear() +
        '-' + ( (contactDate.getMonth()+1) < 9 ? "0" + (contactDate.getMonth()+1) : (contactDate.getMonth()+1) )+
        '-' + ( (contactDate.getDate()) < 9 ? "0" + (contactDate.getDate()) : (contactDate.getDate()) )+
        ' ' + ( (contactDate.getHours()) < 9 ? "0" + (contactDate.getHours()) : (contactDate.getHours()) )+
        ':' + ( (contactDate.getMinutes()) < 9 ? "0" + (contactDate.getMinutes()) : (contactDate.getMinutes()) )+
        ':' + ( (contactDate.getSeconds()) < 9 ? "0" + (contactDate.getSeconds()) : (contactDate.getSeconds()) )
        
        



        const enteredInput={
            datetime:dateFormat,
            name:enteredName,
            email:enteredEmail,
            country:selectedCountry,
            mobile:formatedNumber,
            company:enteredCompany,
            jobtitle:enteredJob,
            product:selectedProduct,
            inquiry:enteredInquiry
        }

        fetch("https://riskweather.org/api/Contact/",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(enteredInput)
        }).then((res)=>{if(res.ok){toast.success("Your contact has sent successfully")}else{toast.error("You've already sent a contact. Please check your name")}})
       nameInputRef.current.value=""
       emailInputRef.current.value=""
       phoneInputRef.current.value=""
       companyInputRef.current.value=""
       jobInputRef.current.value=""
       productSelectRef.current.value=""
       inquiryInputRef.current.value=""

    }
    return (
        <div className={`min-h-screen`}>
             <Header/>
   
            <div className={`my-40 max-[1024px]:my-16`}>
                {/* Contact page description & Image */}
                <div className={`wrap flex lg:flex-row flex-col gap-8 max-[1280px]:wrap3`}>
                    <div className={`min-[1024px]:basis-96 flex flex-col items-center 2xl:items-start`}>
                        <h1 className={`text-2 font-bold`}>CONTACT US</h1>
                        <p className={` min-[1024px]:mr-10 text-5 mb-0 2xl:`}>Can't find what you're looking for?</p>
                        {/* <p className={`text-5 mb-0 2xl:mb-2`}>Get in Touch</p> */}
                        <p className={`min-[1024px]:ml-6 ml-2 text-6 font-light mb-10 max-[1023px]:mb-5`}>Complete the form and an Account Manager Will be in touch soon.</p>
                        {useWindowDimensions().width>=1024 && <Image width="340px" height="250px" src="/img/icon_contacts_mail.png" alt=""></Image>}
                    </div>

                    {/* Contact Form */}
                    <div className={`container-line lg:ml-10 flex-1`}>
                        <form onSubmit={submitHandler} className={`form-label`}>
                            <div className={`grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5 w-full`}>
                                <input className={`form-input`} type="text" required placeholder="Name" ref={nameInputRef}></input>
                                <PhoneInput defaultCountry="KR" className={`form-input`} type="text" required placeholder="Phone number" value={country} onChange={setCountry} ref={phoneInputRef}></PhoneInput>
                            </div>
                            <div className={`mb-5`}>
                                <input className={`form-input w-full`} type="email" required placeholder="Email address" ref={emailInputRef}></input>
                            </div>
                            {/* <div className={`mb-5`} >
                                <input className={`form-input w-full`} type="text" required placeholder="Phone number" ref={phoneInputRef}></input>
                            </div> */}
                            <div className={`mb-5`}>
                                <input className={`form-input w-full`} type="text" required placeholder="Company" ref={companyInputRef}></input>
                            </div>
                            <div className={`mb-5`}>
                                <input className={`form-input w-full`} type="text" required placeholder="Job title" ref={jobInputRef}></input>
                            </div >
                            <div className={`mb-5`}>
                                <Dropdown className={`w-full`} ref={productSelectRef} options={selectOptions} placeholder="Product"></Dropdown>
                            </div>
                            <div className={`mb-5`}>
                                <textarea maxLength={200} className={`form-input w-full h-full`} ref={inquiryInputRef} placeholder="Your Inquiry" rows='5'>
                                </textarea>
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

export default Contact;
