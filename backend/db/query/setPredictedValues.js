import db from '../db.predicted_price.js'
const predicted_price_upload = async (stockname, presentprice, predictedprice)=>{
    try {
        await db.execute(`Insert into ${stockname} (predicted_price, current_price, confidence_level, stock_decision_status) values (${predictedprice}, ${presentprice}, 80, buy) `)
    } catch (error) {
        console.error(`Error while updating ${stockname} stock info in DB`, error)
        return {message: `Error while updating ${stockname} stock info in DB`, error: error}
    }
}
export{predicted_price_upload}