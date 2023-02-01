const express = require("express");
const router = express.Router();
//controller importieren
const {
  getCountries,
  createCountry,
  getSingleCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/countries");

router.route("/countries").get(getCountries).post(createCountry);

router
  .route("/countries/:code")
  .get(getSingleCountry)
  .put(updateCountry)
  .delete(deleteCountry);

module.exports = router;
