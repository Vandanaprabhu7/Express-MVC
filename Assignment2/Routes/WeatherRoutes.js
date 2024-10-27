const express = require("express");
const weatherController = require("../Controller/weatherController");
const router = express.Router();

router
  .route("/")
  .get(weatherController.showAllDetails)
  .post(weatherController.addNewCityTempDetails);

router.route("/rain").get(weatherController.showRainDetails);

router.route("/changeRain").patch(weatherController.changeRainDetails);

router.route("/removeAgra").delete(weatherController.removeDetails);

router.route("/:name").get(weatherController.showDetailOfCity);

module.exports = router;
