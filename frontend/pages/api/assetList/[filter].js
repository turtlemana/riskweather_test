
import executeQuery from "../../../db/mysql";

const handler=async(req,res)=>{
    const {limit}=req.query
    const {page}=req.query
    const {filter}=req.query
    console.log(filter)
    const cat=filter.split("-")[0]
    const weather=filter.split("-")[1]

    
   
    try{
        const result=await executeQuery({
            query:`SELECT Date as date, Cat as cat, Ticker as ticker, TailRisk as tailrisk, TailRiskChg as tailriskchg, Price as price, PriceChg as pricechg, Name as name, Weather as weather
            FROM riskweather.Risk_Day 
            WHERE Date = (SELECT MAX(Date) FROM Risk_Day rd)  ${cat=="All" ? "": `AND Cat = "${cat}"` }  ${!weather ? "": `AND Weather = "${weather}"` }
            LIMIT ${limit*(page-1)}, ${limit};`,
            // content:[req.body.content]
        })
        console.log(result)
        res.status(200).json([...result])
    } catch(err){
        console.log(err)
        res.status(401).json({ message: "Can't find data" });
    }
}

export default handler;