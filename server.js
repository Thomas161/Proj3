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
  res.status(200).send(JSON.parse(JSON.stringify(projectData)));
});
app.post("/sent", (req, res) => {
  // let data = req.body;
  console.log("Request", req);
  projectData = {
    temp: req.body.tempMain,
    icon: req.body.icon,
    name: req.body.name,
    feel: req.body.feelings,
    long: req.body.longitude,
    lat: req.body.latitude,
    conditions: req.body.conditions,
    date: req.body.date,
  };

  res.status(200).send(JSON.parse(JSON.stringify(projectData)));
});
