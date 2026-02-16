import db from '../db.predicted_price.js'
const allStockInfo = async () => {
    try {
        const stockname = await db.execute(`SELECT TABLE_NAME 
       FROM INFORMATION_SCHEMA.TABLES 
       WHERE TABLE_SCHEMA = 'predicted_price' 
       AND TABLE_TYPE = 'BASE TABLE'`)
        let stockinfodata = stockname[0].map(async (stock) => {
            let response = await db.execute(`select * from ${stock.TABLE_NAME} order by id desc limit 1;`)
            let stockinfo = await response[0][0]
            return {stockname:stock.TABLE_NAME,...stockinfo}
        })
        let stockdata = await Promise.all(stockinfodata)
        return stockdata
    } catch (error) {
        console.error(`Error while reading all stock info in DB`, error)
        return { message: `Error while reading all stock info in DB`, error: error }
    }
}
export { allStockInfo }