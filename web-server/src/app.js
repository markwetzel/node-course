const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const name = "Mark Wetzel";

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App", name });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name });
});

app.get("/help", (req, res) => {
  res.render("help", {
    content: "This is the help doc",
    title: "Help",
    name,
  });
});

app.get("/weather", (req, res) => {
  const { location } = req.query;
  if (!location) {
    return res.send({
      errorMessage: "You must provided a location",
    });
  }

  geocode(location, (error, data) => {
    if (error) {
      return res.send({ errorMessage: error });
    }

    const { latitude, longitude, location } = data;

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ errorMessage: error });
      }
      const { description, temperature, humidity, feels_like } = data;

      return res.send({
        location,
        description,
        temperature,
        feels_like,
        humidity,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      errorMessage: "No search term provided",
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404!",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404!",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("listening");
});
