import db from './db.js'
const startDbServer = async () => {
    try {
        await db.execute('select 1')
        console.log("Database Initilized successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}
export default startDbServer