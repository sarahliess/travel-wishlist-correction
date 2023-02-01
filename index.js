const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
//router importieren
const countriesRouter = require("./routes/countries");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", countriesRouter);

app.get("/", (req, res) => {
  res.send(`<h1>My travel wishlist</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
