const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

console.log("PORT in .env =>", process.env.PORT);
console.log("API Key in .env =>", process.env.API_KEY);
console.log("ROOT URL in .env =>", process.env.ROOT_URL);

/**Serve up front end */
app.use(express.static("website"));

/**MiddleWare */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
/** */

//enable cors for 1 endpoint
app.get("/", cors(), (req, res) => {
  res.send("Test Endpoint");
});

const server = app.listen(PORT, () =>
  console.log(`server listening on ${PORT}`)
);
console.log(server);
