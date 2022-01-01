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

  db.query("SELECT * FROM login WHERE email = ?", [email], (err, result) => {
    if (result.length < 1) {
      db.query(
        "INSERT INTO login (username, email, password) VALUES (?,?,?)",
        [username, email, password],
        (err, result) => {
          console.log(err);
        }
      );
      res.send();
    } else {
      res.status(409).send({
        success: false,
        message: "email already exists.",
        err: err,
      });
      console.log("email already exists.");
    }
  });
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
        res.status(401).send({
          success: false,
          message: "First name and Password doesn't match.",
          err: err,
        });
        console.log("First name and Password doesn't match.");
      }
    }
  );
});

app.get("/", (req, res) => {
  db.query("SELECT * FROM login", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/", (req, res) => {
  const hobby1 = req.body.hobby1;
  const hobby2 = req.body.hobby2;
  const hobby3 = req.body.hobby3;
  const hobby4 = req.body.hobby4;
  const hobby5 = req.body.hobby5;

  db.query(
    "INSERT INTO hobbies (hobby1, hobby2, hobby3, hobby4, hobby5) VALUES (?,?,?,?,?)",
    [hobby1, hobby2, hobby3, hobby4, hobby5],
    (err, result) => {
      console.log(err);
    }
  );
  res.send();
});

app.get("/hobby", (req, res) => {
  db.query("SELECT * FROM hobbies", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server up & running on port ${PORT}`);
});
