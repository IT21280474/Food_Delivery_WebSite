const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config();
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/auth-app');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello jwt");
});

app.use("/customers", require("./routes/customerRoutes"))

const PORT =  process.env.PORT || 8000;
app.listen(PORT);