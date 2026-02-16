import { allStockInfo } from "../db/query/stockinfoQuery.js"
const stockinfo = async (req, res) => {
    let stockinfodata = await allStockInfo()
    console.log("stock info from route tab:", stockinfodata);
    
    res.status(200).json({status:true,message:stockinfodata})
}

export { stockinfo }