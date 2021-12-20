require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 3003;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("home page hellow  mfdn ");
});

app.listen(PORT, () => {
  console.log(`Server up & running on port ${PORT}`);
});
