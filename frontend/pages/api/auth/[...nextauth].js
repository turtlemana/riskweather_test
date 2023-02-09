import NextAuth from "next-auth"
// import Redis  from "ioredis"
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google"
import KakaoProvider from 'next-auth/providers/kakao'
import FacebookProvider from 'next-auth/providers/facebook'
import NaverProvider from 'next-auth/providers/naver'
import {v4 as uuid} from 'uuid';
import redis from "../../../db/redis"



// import redis from "../../../redis";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // CredentialsProvider({
    //   name:"Credentials",
    //   credentials:{
    //     name:{label: "name", type: "text", placeholder: "jsmith" },
    //     email:{label: "email", type: "email", placeholder: "example@riskweather.org" },
    //     password:{ label: "password", type: "password"},
    //   },
    //   async authorize(credentials,req){
    //     return credentials
    //   }
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:'/auth/signin',
    error:'/auth/signin'
  },
  session:{
    strategy:'jwt'
  },

  callbacks:{

    // async jwt({token,account,user,profile,isNewUser}){
    //   // const redis=createRedisInstance();
    //   console.log("token",user)
    //   console.log("tokenprofile",profile)
    //     // console.log("token", token)
    //     // console.log("account", account)
    //     // console.log("profile",profile)
    //     // console.log("isNewUser",isNewUser)
    //     // if(!user?.email){
    //     //   user.email=`example@${user.name}.com`
    //     // }
        
    //     const userInfo=await redis.hget("users",user?.email)

    //     const parsedLevel=await JSON.parse(userInfo)?.accessLevel
    //     console.log("level",parsedLevel)
    //     console.log("jwtaccount",account)
        
        
    //     if(account){
    //         token.accessToken = account.access_token
    //         token.accessLevel=parsedLevel 
    //         console.log("token",token)
          
          
        

    //     }
    //     // await redis.quit()
    //     return token
    // },
    // async session({ session, token, user }) {
    //   console.log("tokenuser",user)
    //   console.log("sessiontoken",token)
    //     // Send properties to the client, like an access_token from a provider.
    //     session.user.accessLevel=token?.accessLevel
    //     if(!session.user?.email){}
    //     session.accessToken = token?.accessToken
        
    //     return session
        
    //   },

    async signIn({user,account,profile,credentials}){
      // const redis = new Redis(process.env.REDIS_URL); 

      redis.connect()
      // const redis=createRedisInstance();
      console.log("user",user)
      console.log ("account",account)
      console.log('profile', profile)

        

        const isUserExist=await redis.HEXISTS("users",user?.email)
        // await redis.quit()
          
        
        const id=uuid();
        console.log(isUserExist)

        if(!isUserExist){
          

          const newUser={id,email:user?.email, platform_type:account?.provider, name:user?.name, profileImage:user?.image,created_at:Date.now(),accessLevel:1}
      
          console.log(newUser)
      
          const data = await fetch('http://localhost:3000/api/auth/addUser',{
              method:"POST",
              headers:{
                  "content-type":"application/json"
              },
              body:JSON.stringify({newUser})
          }).then(res=>res.json())
  
          console.log("success?")

  
          return [data.newUser] 

        }  else if (isUserExist){
          const userInfo=await redis.hGet("users",user?.email)
          await redis.disconnect()
          const parsedInfo=await JSON.parse(userInfo)
          const userPlatform=parsedInfo.platform_type
     
          // await redis.quit()
          if(userPlatform !== account?.provider){
            // alert(`Your email has logged in from `)
            return false
        
          } else {
            return true
          }

          // const userInfo=await redis.hget("users",user?.email)

          // const parsedLevel=await JSON.parse(userInfo)?.accessLevel
          // console.log(parsedLevel)
          // // const res= await fetch('http://localhost:3000/api/auth/getUser')
          // // const data=res.json()

          // console.log("exists")
          // console.log(parsedLevel)
          // if (parsedLevel===1){return true}
          // if (parsedLevel===2){return true}
     
      }

    },

    // async redirect({url,baseUrl,user}){
    //   const userInfo=await redis.hget("users",user?.email)
    //   const parsedInfo=JSON.parse(userInfo)
    //   console.log("redirect user",user)

    //   if (!parsedInfo){
    //     return Promise.resolve('http://localhost:3000/auth/signin')
    //   }
      
    //   else if(parsedInfo.accessLevel==1){
    //     return Promise.resolve('http://localhost:3000/auth/userinfo')
    //   } else if (parsedInfo.accessLevel==2){
    //     return Promise.resolve("http://localhost:3000")
    //   } 
    // }
  }



}
export default NextAuth(authOptions)