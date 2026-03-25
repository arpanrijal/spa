import db from '../db.predicted_price.js'
const predicted_price_data_upload = async (predicted_price,stock,current_price,date)=>{
    try {
        await db.execute(`insert into ${stock} (date, predicted_price, current_price) values (?, ?, ?)`, [date, predicted_price, current_price])
        return {message: `${stock} stock data added sucessfully`, status: true}
    } catch (error) {
        console.error(`Error while updating ${stock} stock info in DB`, error)
        return {message: `Error while updating ${stock} stock info in DB`, status:false, error: error}
    }
}
export {predicted_price_data_upload}