const keys = require("./keys");

// Express Application setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db/config")

const app = express();
app.use(cors());
app.use(bodyParser.json());

var corsOptions = {
  origin: [''],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use('/', cors(corsOptions), function (req, res, next) {
  console.log({msg: 'This is CORS-enabled'})
  next();
})

db.authenticate().then(()=>{console.log("Postgres connected")}).catch((err)=>{console.log("postgre err=>"+err)})

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Total-Count, X-Requested-With, Content-Type, Accept, authorization");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.listen(5000, err => {
  console.log("Listening");
});

app.use('/users', require('./routes/users.routes'))


// // Postgres client setup
// const { Pool } = require("pg");
// const pgClient = new Pool({
//   user: keys.pgUser,
//   host: keys.pgHost,
//   database: keys.pgDatabase,
//   password: keys.pgPassword,
//   port: keys.pgPort
// });

// pgClient.on("connect", client => {
//   client
//     .query("CREATE TABLE IF NOT EXISTS users (username VARCHAR(30) PRIMARY KEY, age INT,score INT,password VARCHAR(30))")
//     .catch(err => console.log("PG ERROR", err));
// });

// //Express route definitions
// app.get("/", (req, res) => {
//   res.send("Hi");
// });

// // get the values
// app.get("/values/all", async (req, res) => {
//   const values = await pgClient.query("SELECT * FROM values");

//   res.send(values);
// });

// // now the post -> insert value
// app.post("/values", async (req, res) => {
//   console.log("i am called")


//   if (!req.body.value) res.send({ working: false });

//   // pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]);

//   res.send({ working: true });
// });


module.exports = app
