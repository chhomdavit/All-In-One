// const mysql = require("mysql2")
// const util = require("util")

// require('dotenv').config();

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'express_ecom'
//   })

// db.query = util.promisify(db.query).bind(db);

// // connect to the database
// db.connect(function(err){
//   if (err) {
//       console.log("error connecting: " + err.stack);
//       return;
//   };
//   console.log("connected as... " + db.threadId);
// });

// module.exports = db;

module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'node_sequelize_api_db',
  dialect: 'mysql',

  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
}