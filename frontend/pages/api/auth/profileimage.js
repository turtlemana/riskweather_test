// import Redis  from 'ioredis'
import formidable from 'formidable'
import fs from "fs/promises"
import path from 'path'
import { authOptions } from './[...nextauth]'
import { unstable_getServerSession } from "next-auth/next"
import redis from '../../../db/redis'

export const config={
    api:{
        bodyParser:false
    }
}

const readFile=async(req,session,saveLocally)=>{
    // const redis = new Redis(process.env.REDIS_URL); 

    const options={}
    if (saveLocally){
        options.uploadDir=path.join(process.cwd(),`public/images/${session?.user?.email}`)
        options.filename=(name,ext,path,form)=>{
            return Date.now().toString()+"_"+path.originalFilename;
        }
    }
    options.maxFileSize = 4000 * 1024 * 1024;

    
    const userJson=await redis.hGet("users",session?.user?.email)
    const userInfo=await JSON.parse(userJson)
 
    console.log("userIn",userInfo)

    const fileData = await new Promise((resolve, reject) => {
        const form = formidable(options)
     
        form.parse(req, (err, fields, files) => {
            console.log(files)
          if (err) return reject(err)
          return resolve(files)
        })
      })
      console.log(fileData.profileImage.newFilename)
      userInfo.profileImage=`/images/${session?.user?.email}/${fileData.profileImage.newFilename}`

    await redis.hSet("users",session?.user?.email,JSON.stringify(userInfo))
   
    //   await redis.disconnect()

}


const handler= async(req, res) =>{
    
    await redis.connect()
    const session = await unstable_getServerSession(req, res, authOptions)

    if(req.method!=="POST"){res.status(405).json({body:"Method not Allowed"}); return;}
 
    try{
    await fs.rmdir(path.join(process.cwd() + "/public", "/images",`/${session?.user?.email}`),{recursive:true,force:true})
    await fs.mkdir(path.join(process.cwd() + "/public", "/images",`/${session?.user?.email}`))
    } catch(error){
        await fs.mkdir(path.join(process.cwd() + "/public", "/images",`/${session?.user?.email}`))
    }
    await readFile(req,session,true);
    res.json({done:"ok"})
    
    await redis.disconnect()
   


}

export default handler;
