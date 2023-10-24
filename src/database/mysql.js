import mysql2 from 'mysql2/promise'

const config = {
    host: 'containers-us-west-42.railway.app',
    user: 'root',
    database: 'railway',
    port: '6588',
    password: '0H5Ni5aKKjJR32SI09lJ',
    enableKeepAlive: true,
}

async function db() {
    const connection = await mysql2.createConnection(config)
    return connection
}

const conn = await db()

export default conn