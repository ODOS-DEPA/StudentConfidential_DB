import mysql from 'mysql2/promise';

const sql = mysql.createPool({
  host: 'odos2-mysql.czavqmfbxgsa.ap-southeast-1.rds.amazonaws.com',
  user: 'adminOdos',
  password: 'Odos-depa1234_db',
  database: 'odos',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default sql;