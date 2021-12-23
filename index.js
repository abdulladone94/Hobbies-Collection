require("dotenv").config();
const express = require("express");
var mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const md5 = require("md5");
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

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = md5(req.body.password);

  db.query(
    "INSERT INTO login (username, email, password) VALUES (?,?,?)",
    [username, email, password],
    (err, result) => {
      console.log(err);
    }
  );
  res.send();
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  db.query(
    "SELECT * FROM login WHERE username = ? and password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.status(400).send();
      }
    }
  );
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM login", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

// db.query("DELETE FROM login", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server up & running on port ${PORT}`);
});
