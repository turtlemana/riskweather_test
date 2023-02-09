import redis from "../../../db/redis";

export default async function handler(req, res) {
    // const redis = new Redis(process.env.REDIS_URL); 
    // const redis=createRedisInstance();
    await redis.connect()
    if(req.method!=="POST"){res.status(405).json({body:"Method not Allowed"}); return;}
    if(!req.body) return res.status(404).json({error:"Don't have login data"})

    const {enteredInput}=req.body;
    console.log(enteredInput)

    await redis.hSet("users",enteredInput.email,JSON.stringify(enteredInput))
    await redis.disconnect()


    res.status(200).json({ enteredInput:enteredInput  })

}

