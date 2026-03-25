import db from './db.predicted_price.js'
const Each_Price_Table_Creation = async (stockname) => {
    try {
        const rows = await db.execute(`SELECT COUNT(*) AS table_exists FROM information_schema.tables WHERE table_schema = 'predicted_price' AND table_name = ?;`, [stockname])
        if (rows[0][0].table_exists === 0) {
            await db.execute(`CREATE TABLE IF NOT EXISTS ${stockname} (
            id int auto_increment primary key,
            date date,
            predicted_price float,
            current_price varchar(50),
            created_at timestamp default current_timestamp,
            updated_at timestamp null default null on update current_timestamp
        )`)
            return { status: true, message: "Table created Sucessfully" }
        } else {
            return { status: false, message: "Table created failed" }
        }
    } catch (error) {
        console.error('Table check failed:', error)
        throw error
    }
}

export { Each_Price_Table_Creation }