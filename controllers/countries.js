const countries = require("../countryList");

/////////////////ALL COUNTRIES///////////////////////

const getCountries = (req, res) => {
  let allCountries = countries;
  console.log(allCountries);

  const { sort, visited } = req.query;
  let html = "";

  if (sort === "true") allCountries.sort((a, b) => (a.name > b.name ? 1 : -1));

  if (visited === "true") {
    const visitedCountries = allCountries.filter((el) => el.visited === true);
    allCountries = visitedCountries;
  }

  for (let i = 0; i < allCountries.length; i++) {
    html += `<li><b>${allCountries[i].name}</b> - ${allCountries[i].alpha2Code} - ${allCountries[i].alpha3Code}</li>`;
  }

  res.send(`<h1>My travel wishlist</h1><ol>${html}</ol>`);
};

/////////////////CREATE COUNTRY///////////////////////

const createCountry = (req, res) => {
  const { name, alpha2Code, alpha3Code } = req.body;

  const countryExists = countries.find(
    (el) =>
      el.name === name ||
      el.alpha2Code === alpha2Code ||
      el.alpha3Code === alpha3Code
  );

  if (countryExists) {
    return res.send("Country already exists.");
  }

  const newCountry = {
    id: countries.length + 1,
    name,
    alpha2Code,
    alpha3Code,
  };

  countries.push(newCountry);
  res.send(newCountry);
};

/////////////////GET SINGLE COUNTRY///////////////////////

const getSingleCountry = (req, res) => {
  const { code } = req.params;
  const country = countries.find(
    (el) =>
      el.alpha2Code === code.toUpperCase() ||
      el.alpha3Code === code.toUpperCase()
  );
  if (!country) return res.send("Country not found.");
  res.send(country);
};

/////////////////UPDATE COUNTRY///////////////////////

const updateCountry = (req, res) => {
  const { code } = req.params;
  const { name, alpha2Code, alpha3Code } = req.body;
  const country = countries.find(
    (el) =>
      el.alpha2Code === code.toUpperCase() ||
      el.alpha3Code === code.toUpperCase()
  );
  if (!country) return res.send("Country not found.");
  country.name = name;
  country.alpha2Code = alpha2Code;
  country.alpha3Code = alpha3Code;
  res.send(country);
};

/////////////////DELETE COUNTRY///////////////////////

const deleteCountry = (req, res) => {
  const { code } = req.params;
  const country = countries.find(
    (el) =>
      el.alpha2Code === code.toUpperCase() ||
      el.alpha3Code === code.toUpperCase()
  );
  if (!country) return res.send("Country not found.");
  const index = countries.indexOf(country);
  //1. to delete:
  //   countries.splice(index, 1);
  //res.send("Country deleted.");
  //2. change visted to true:
  country.visited = true;
  console.log(countries);
  res.send("Country visited.");
};

module.exports = {
  getCountries,
  createCountry,
  getSingleCountry,
  updateCountry,
  deleteCountry,
};
