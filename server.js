const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./website/config");
const app = express();
const PORT = 8080;
let projectData = {};

// console.log("API Key in .env =>", config.API_KEY);
// console.log("ROOT URL in .env =>", config.ROOT_URL);

/**Serve up front end */
app.use(express.static("website"));

/**MiddleWare */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
console.log(server);

app.get("/retrieve", (req, res) => {
  res.send(projectData);
});
app.post("/sent", (req, res) => {
  // let data = req.body;
  projectData = {
    temp: req.body.temp,
    icon: req.body.icon,
    name: req.body.namePlace,
    feel: req.body.feelings,
    long: req.body.long,
    lat: req.body.lat,
    conditions: req.body.conditions,
    date: req.body.date,
  };

  res.status(200).send(JSON.parse(JSON.stringify(projectData)));
});
