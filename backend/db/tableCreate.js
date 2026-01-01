import db from "./db.js"


const createTable = async () => {
      try {
        await db.execute(`CREATE TABLE IF NOT EXISTS users (
            id int auto_increment primary key,
            email varchar(50) unique not null,
            password varchar(500) not null,
            username varchar(500) not null unique,
            created_at timestamp default current_timestamp,
            updated_at timestamp null default null on update current_timestamp
        )`)
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error.message);
    } finally {
        await db.end();
    }
}
createTable();