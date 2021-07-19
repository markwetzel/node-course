const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "..", "public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", { title: "Weather App", name: "Mark Wetzel" });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/help", (req, res) => {
  res.render("help", {
    content: "This is the help doc",
  });
});

app.get("/weather", (req, res) => {
  res.send("Weather Forecast");
});

app.listen(3000, () => {
  console.log("listening");
});
