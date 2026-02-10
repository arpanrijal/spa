import db from '../db.js'
const predicted_price_upload = async ()=>{
    try {
        await db.execute(`UPDATE predicted_price SET stockname = ? predict_price= ? where email= ?`,[spa_token,email])
    } catch (error) {
        console.error("Error while updating token in DB", error)
        return {message: 'Error while updating token in DB', error: error}
    }
}
export{predicted_price_upload}