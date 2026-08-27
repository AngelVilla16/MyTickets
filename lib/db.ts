import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    ssl: {
        rejectUnauthorized: false,
    },
    waitForConnections: true,
    connectionLimit:10,
    queueLimit:0,
});

//Este helper es para limpiar consultas (querys)
export async function query(sql:string, values?:any[]){
    try{
        const [rows] = await pool.execute(sql, values);
        return rows;
    }
    catch(error:any){
        console.error("Error en la base de datos ", error);
        throw new Error(error.message);
    }
}