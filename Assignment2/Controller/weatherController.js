const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "../models/Weather.json");

const readWeatherData = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeWeatherData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

exports.showAllDetails = (req, res) => {
  const Weather = readWeatherData();
  res.status(200).json({
    status: "success",
    data: Weather,
  });
};

exports.showRainDetails = (req, res) => {
  const Weather = readWeatherData();
  const rainCities = Weather.filter((city) => city.rain);
  res.status(200).json({
    status: "success",
    data: rainCities,
  });
};

exports.addNewCityTempDetails = (req, res) => {
  const Weather = readWeatherData();
  const newCity = req.body;
  Weather.push(newCity);
  writeWeatherData(Weather);
  res.status(201).json({
    status: "success",
    data: newCity,
  });
};

exports.changeRainDetails = (req, res) => {
  const Weather = readWeatherData();
  const city = Weather.find((city) => city.name.toLowerCase() === "delhi");
  if (city) {
    city.rain = false;
    writeWeatherData(Weather);
    res.status(200).json({
      status: "success",
      data: city,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "City not found",
    });
  }
};

exports.removeDetails = (req, res) => {
  const Weather = readWeatherData();
  const cityIndex = Weather.findIndex(
    (city) => city.name.toLowerCase() === "agra"
  );
  if (cityIndex !== -1) {
    Weather.splice(cityIndex, 1);
    writeWeatherData(Weather);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "City not found",
    });
  }
};

exports.showDetailOfCity = (req, res) => {
  const Weather = readWeatherData();
  const city = Weather.find(
    (city) => city.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (city) {
    res.status(200).json({
      status: "success",
      data: city,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "City not found",
    });
  }
};
