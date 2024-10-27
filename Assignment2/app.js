const express = require("express");
const weatherRouter = require("./Routes/WeatherRoutes");
const app = express();

app.use(express.json());
app.use("/api/v1/weather", weatherRouter);
module.exports = app;
