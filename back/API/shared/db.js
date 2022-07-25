import pkg from 'pg';
const { Pool } = pkg;

const db = new Pool({
    user:       process.env.DB_USER,
    password:   process.env.DB_PASS,
    host:       process.env.DB_IP,
    port:       process.env.DB_PORT,
    database:   process.env.DB_NAME
});

export default db;