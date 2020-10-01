const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./website/config");
const app = express();
const PORT = 8080;
let projectData = {};

console.log("API Key in .env =>", config.API_KEY);
console.log("ROOT URL in .env =>", config.ROOT_URL);

/**Serve up front end */
app.use(express.static("website"));

/**MiddleWare */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
/** */

app.get("/retrieve", (req, res) => {
  res.send(projectData);
});
app.post("/sent", (req, res) => {
  projectData = {
    icon: req.body.icon,
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings,
  };
  res.send("Post sent");
});

const server = app.listen(PORT, () =>
  console.log(`server listening on ${PORT}`)
);
console.log(server);
