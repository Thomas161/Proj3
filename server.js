const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;

/**Serve up front end */
app.use(express.static("website"));

/**MiddleWare */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);
/** */

//enable cors for 1 endpoint
app.get("/test", cors(), (req, res) => {
  res.send({ msg: "Test Endpoint" });
});

const server = app.listen(PORT, () =>
  console.log(`server listening on ${PORT}`)
);
console.log(server);
