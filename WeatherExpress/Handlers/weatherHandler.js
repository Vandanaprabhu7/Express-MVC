const fs = require("fs");
const weather = JSON.parse(
  fs.readFileSync(`${__dirname}/../Data/weatherData.json`)
);

exports.showAllDetails = (req, res) => {
  res.status(200).json({
    status: "Success",
    results: weather.length,
    data: { WeatherDetails: weather },
  });
};

exports.showRainDetails = (req, res) => {
  const rainDetails = weather.map((name) => ({
    city: name.name,
    rain: name.rain,
  }));
  res.status(200).json({
    status: "Success",
    data: rainDetails,
  });
};

exports.addCityTemp = (req, res) => {
  const newWeather = { ...req.body };
  weather.push(newWeather);
  fs.writeFile(
    `${__dirname}/../Data/weatherData.json`,
    JSON.stringify(weather),
    (err) => {
      if (err) {
        res.status(500).json({
          status: "Fail",
          message: err,
        });
      } else {
        res.status(201).json({
          status: "Successfully added new data!",
          newData: newWeather,
        });
      }
    }
  );
};

exports.changeRainDetails = (req, res) => {
  const city = weather.find((city) => city.name === req.params.name);
  if (!city) {
    res.status(500).json({
      status: "Fail",
      message: "Invalid city name",
    });
  } else {
    city.rain = 0;
    fs.writeFile(
      `${__dirname}/../Data/weatherData.json`,
      JSON.stringify(weather),
      (err) => {
        if (err) {
          res.status(400).json({
            status: "Fail",
            message: "Error while writing to the file!",
          });
        } else {
          res.status(200).json({
            status: "Success",
            message: "Updated successfully!",
          });
        }
      }
    );
  }
};

exports.showDetailsByName = (req, res) => {
  const city = weather.find((city) => city.name === req.params.name);
  if (!city) {
    res.status(500).json({
      status: "Fail",
      message: "Invalid city name",
    });
  } else {
    res.status(200).json({
      status: "Success",
      data: city,
    });
  }
};
