
import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
export const User = createContext();

const user=async()=>{
    const res=await fetch(`http://localhost:3000/api/auth/getUser`)
    // if(res.ok===false){const error= new Error("An error occurred while fetching the data")
    // error.info=await res.json()
    // error.status=res.status
    // throw error }

    const data=await res.json()
    // console.log("userInfo",JSON.parse(userInfo.user))
    const userInfo=data.user
    return userInfo
}

const initialState={
    user:Cookies.get('user') ? JSON.parse(Cookies.get('user')) : 
    {
        id:String,
        email:String,
        name:String,
        platform_type:String,
        accessLevel:Number, 
        created_at:Number,
        assetportfolio:{},
        interestedAssets:[],
        profileImage:String, 
        birth:String,
        company:String, 
        country:String

    }
}

function reducer(state,action){
    switch(action.type) {
        case "LOGIN_SUCCESS" : {
        

        }
    }
}