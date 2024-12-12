require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/db");
const userRoutes = require('./routes/index.route');
const cookieparser = require('cookie-parser');


db();

app.use(express.json());
app.use(cors());
app.use(cookieparser());


app.use('/api/v1', userRoutes);

module.exports=app;
