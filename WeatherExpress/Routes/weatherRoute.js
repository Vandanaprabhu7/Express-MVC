const express = require("express");
const router = express.Router();
const weatherHandler = require("../Handlers/weatherHandler");

router.route("/").get(weatherHandler.showAllDetails);
router.route("/rain").get(weatherHandler.showRainDetails);
router.route("/addDetails").post(weatherHandler.addCityTemp);
router
  .route("/changeRainDetails/:name")
  .patch(weatherHandler.changeRainDetails);
router.route("/showDetailsByCity/:name").get(weatherHandler.showDetailsByName);
module.exports = router;
