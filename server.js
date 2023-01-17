const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.json({message: "API Listening"});
});



app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });