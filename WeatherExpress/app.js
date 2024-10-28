const express = require("express");
const app = express();
const weatherRouter = require("./Routes/weatherRoute");

app.use(express.json()); //middleware for handling json i/p in post req
app.use("/api/v1/weather", weatherRouter);
module.exports = app;
