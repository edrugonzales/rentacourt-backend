const Pool = require("pg").Pool;
require("dotenv").config();
const connectionString = process.env.PG_URI;
let pool;
if (process.env.APP_ENV === "production") {
  pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: "devteam",
    host: "localhost",
    database: "payroll",
    password: "miguel23",
    port: 5432,
  });
}

module.exports = pool;
