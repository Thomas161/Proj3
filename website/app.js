/**Global Variables */
const config = require("./config");
const fetch = require("cross-fetch");
const URL = "http://api.openweathermap.org/data/2.5/forecast";
const API = `APPID${config.API_KEY}`;
console.log(API); //empty object
console.log("Fetch URL", URL);

/** */

/**Helper functions */
(async () => {
  try {
    const res = await fetch(`${URL}?id=524901&${API}`);
    console.log(res);
    if (res.status >= 400) {
      throw new Error("Bad response");
    }
    const retrieved = await res.json();
    console.log(retrieved);
  } catch (err) {
    console.log(err);
  }
})();
