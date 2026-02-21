import {Each_Price_Table_Creation} from '../db/EachPricePredictTable.js'

const predicted_Price = async (req,res)=>{
    const {predicted_price,stock}= req.body
    const responses = await Each_Price_Table_Creation(stock)
    if(responses.status){
        return res.status(200).json({
        status: responses.status,
        message: responses.message
    })
    }
    return res.status(500).json({
        status: responses.status,
        message: responses.message
    })
}

export {predicted_Price}