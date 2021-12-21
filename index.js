require("dotenv").config();
const express = require("express");
var mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 3003;

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "hobbies_collection",
});

app.get("/", (req, res) => {
  res.send("Hello WORLD");
});

app.listen(PORT, () => {
  console.log(`Server up & running on port ${PORT}`);
});
