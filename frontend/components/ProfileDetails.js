import React,{useMemo} from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { MdRefresh } from 'react-icons/md'
import { RiShareBoxLine } from 'react-icons/ri'
import { FiMoreVertical } from 'react-icons/fi'
import { GiShare } from 'react-icons/gi'
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { HiDotsVertical } from 'react-icons/hi'
import Image from 'next/image'
import useSWR from 'swr'
import fetcher from '../public/utils/fetchUserInfo'

// const style = {
//   wrapper: `flex`,
//   infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
//   accent: `text-[#2081e2]`,
//   userText:`font-extrabold`,
//   userName: `text-3xl font-extrabold`,
//   otherInfo: `flex`,
//   ownedBy: `text-[#8a939b] mr-4`,
//   likes: `flex items-center text-[#8a939b]`,
//   likeIcon: `mr-1`,
//   actionButtonsContainer: `w-44`,
//   actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
//   actionButton: `my-2`,
//   divider: `border-r-2`,
//   ethLogo: `h-6 mr-2`
  
// }

const ProfileDetails=()=>{
  const {data:userInfo, error, mutate}=useSWR("/api/auth/getUser",fetcher)

    const joinedDate=useMemo(()=>{
        if(!userInfo) return
        if(userInfo){
        const createdDate=new Date(userInfo?.created_at)?.toISOString().slice(0,10)
            return createdDate
    }
        

    },[userInfo])
    console.log(joinedDate)
    const userCountry=new String(userInfo?.country?.toLowerCase())
    console.log(userCountry=="undefined")
    return <div className={`flex`}>
    <div className={`h-36 flex flex-col flex-1 justify-between mb-6`}>
      {/* <div className={style.accent}>Profile</div> */}
      
      <div className={`text-3xl font-extrabold text-black mb-6`}>{userInfo?.name}</div>
      <ul>
      
      <li className={`flex mb-3`}>
      <span className={`font-bold text-lg`}>Country : </span><Image width="48px" height="32px" src={userCountry=="undefined" ? `/img/country/no_flag.svg`: `/img/country/${userCountry}.svg` } alt="flag"/><span className={`font-bold`}>{userCountry.toUpperCase()}</span>
      </li>
      <li className={`flex mb-3`}>
        {/* <div className={style.ownedBy}> */}
        {/* <img src="https://static.opensea.io/general/ETH.svg" className={`h-6 mr-2`}></img> */}
          
          <span className={`font-extrabold text-black text-lg`}>Joined : {joinedDate}</span>
        </li>
        <li className={`flex`}>
        <span className={`font-extrabold text-black `}></span>
          <span className={`text-lg font-extrabold text-black`}>Tier : Advanced</span>
        {/* <img src="https://static.opensea.io/general/ETH.svg" className={`h-6 mr-2`}></img> */}
        {/* <span className={`font-extrabold text-black`}>Phone Number: {userInfo?.mobile}</span> */}
        </li>
        <li className={`flex items-center text-[#8a939b]`}>
        {/* <span className={`font-extrabold`}>Email: {userInfo?.email}</span> */}
          {/* <AiFillHeart className={style.likeIcon} /> 2.3K favorites */}
        </li>
        </ul>

      {/* </div> */}
    </div>
    
    <div className={`text-center  font-bold text-xl container-line shadow-md`}>
      <p className={`mb-3`}>Risk Preference</p>
      
      <div className={`flex justify-center items-center w-[250px] text-center h-[250px] container-line bg-yellow-200 rounded-xl `}>
        <p className={"font-bold text-lg inline-block align-middle"}>Moderate</p>
      </div>
      {/* <div className={`flex container justify-between text-[1.4rem] border-2 rounded-lg`}>
        <div className={`my-2 ml-2`}>
          <MdRefresh />
        </div>
        <div className={`border-r-2`} />
        <div className={`my-2`}>
          <AiOutlineInstagram />
        </div>
        <div className={`border-r-2`} />
        <div className={`my-2`}>
          <AiOutlineTwitter />
        </div>
        <div className={`border-r-2`} />
        <div className={`my-2 mr-2`}>
          <FiMoreVertical />
        </div>
      </div> */}
    </div>

  </div>

}

export default ProfileDetails