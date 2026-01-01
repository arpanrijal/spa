import db from '../db.js'
const setToken = async ({spa_token,email}) => {
    try {
        await db.execute(`UPDATE users SET token = ? where email= ?`,[spa_token,email])
        // console.log("Token added to db")
        return {message: 'Token added to DB', success: true}
    } catch (error) {
        console.error("Error while updating token in DB", error)
        return {message: 'Error while updating token in DB', error: error}
    }
}
const delToken = async ({_id})=>{
    try {
        db.execute(`UPDATE users SET token = NULL where id=? AND token IS NOT NULL`,[_id])
        return {success: true, message:'Sucessfull dbt'}
    } catch (error) {
        return {success: false, message: 'Error occur in DB', error: error}
    }
}
export {setToken, delToken}