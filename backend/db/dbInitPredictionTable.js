import dbPP from "./db.predicted_price.js"
const startServerPP = async ()=>{
    try {
        await dbPP.execute('select 1')
    } catch (error) {
        console.error("Database Prediction Price connection failed:", error);
    }
}
export default startServerPP