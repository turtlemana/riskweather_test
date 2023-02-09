import React,{useRef,useState,useEffect,useReducer} from 'react'
import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'
import axios from "axios";
import useSWR from 'swr';
import fetcher from '../public/utils/fetchUserInfo';
import Image from 'next/image';



const ProfileImage=({profileImg})=>{
  const {data:userInfo, error, mutate}=useSWR("/api/auth/getUser",fetcher)
  const imageInput = useRef(null);
  console.log(userInfo?.profileImage)
  const [selectedImage,setSelectedImage]=useState("")
  const [selectedFile,setSelectedFile]=useState("")
  const imageButtonClick = e => {
      e.preventDefault();
      imageInput.current.click();
    };
//     useEffect(() => {
//       document.dispatchEvent(new Event("visibilitychange"))
//       setValue(userInfo?.profileImage)
//       handleForceUpdate()
//     }, [selectedImage,selectedFile,userInfo]);

//     const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

// function handleForceUpdate() {
//     forceUpdate();
// }

  const imageChange=async({target})=>{
    if(target.files[0]  && target.files[0].type.substr(0,5)==="image"){
      const file=target.files[0]
      
      setSelectedImage(URL.createObjectURL(file))
      setSelectedFile(file)
      console.log(file)
      console.log(URL.createObjectURL(file))
      console.log(selectedImage)
      try{
        // if(!selectedFile) return
        const formData= new FormData();
        formData.append("profileImage",file)

      console.log(formData)
      const { data } = await axios.post("/api/auth/profileimage", formData);
      // setValue(userInfo?.profileImage)
      mutate()
      console.log(data);
    
      //   const data= await fetch(`http://localhost:3000/api/auth/profileimage`,{
      //     method:"POST",
      //     body:formData
      // })

      } catch (error){console.log(error.response?.data)}
      // try{
      //   if(!selectedFile) return
      //   // const formData= new FormData();
      //   // formData.append("profileImage",selectedFile)
      //   const enteredInput={
      //     ...userInfo,
      //     profileImage:selectedImage
    
      // }
      // console.log(enteredInput)
      //   const data= await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
      //     method:"POST",
      //     headers:{"content-type":"application/json"},
      //     body:JSON.stringify({enteredInput})
      // })
      // console.log(data)
      // } catch (error){console.log(error.response?.data)}
    } 
  }

  const handleUpload=async()=>{
    try{
      if(!selectedFile) return
      // const formData= new FormData();
      // formData.append("profileImage",selectedFile)
      const enteredInput={
        ...userInfo,
        profileImage:selectedImage
  
    }
    console.log(enteredInput)
      const data= await fetch(`http://localhost:3000/api/auth/addUserInfo`,{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({enteredInput})
    })
    console.log(data)
    } catch (error){console.log(error.response?.data)}
  }
    return (
        <div>
          {/* <div className={`bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`}>
            <div className={`flex items-center`}>
              <IoMdSnow />
              <div className={`flex-1 flex items-center jusatify-end`}>
                <AiOutlineHeart />
                2.3K
              </div>
            </div>
          </div> */}
         
          <div>
            <img onClick={imageButtonClick} alt='Profile Image' referrerPolicy="no-referrer" className={`w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem] cursor-pointer`} src={userInfo?.profileImage ? userInfo?.profileImage  : userInfo?.profileImage }/>
            {/* "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" */}
            <input type="file"
          accept='image/*' 
             ref={imageInput}
             style={{ display: "none" }}
             onChange={imageChange} />
          </div>
       
        </div>
      )
}

export default ProfileImage