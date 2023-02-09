import redis from "../../db/redis"

const handler=async(req,res)=>{
    // const redisClient=Redis.createClient(6379,"http://localhost:3000")
    await redis.connect()
    await redis.hSet("person","name","minho")
    await redis.disconnect()

    res.send({message:"seeded successfully"})
}


export default handler