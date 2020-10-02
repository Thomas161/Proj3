/**Global Variables */
// const config = require("./config.js");
// const fetch = require("node-fetch");
const URL = "http://api.openweathermap.org/data/2.5/weather?APPID=";
const API_KEY = "1a425e11bb04696c4f6f6ab481b9e74d";
const triggerButton = document.querySelector("#generate");
// console.log("Fetch API", config); //empty object
// console.log("Fetch API", API_KEY);
// console.log("Fetch URL", URL);

/** */

/**Helper functions */

/**Sample function that tests API key works */
async function getWeather() {
  const zipInput = document.getElementById("zip");
  const z = zipInput.value;
  fetch(`${URL}${API_KEY}&q=${z}`)
    .then((res) => res.json())
    .then((data) => {
      console.log("Name of city =>", data.name);
      let con = document.getElementById("content");
      con.innerHTML = data.name;
    })
    .catch((err) => console.log(err));
}
getWeather();
triggerButton.addEventListener("click", getWeather);
/**Add click event and event listener to button  */

let clickResponse = () => {
  const zipInput = document.getElementById("zip");

  console.log(zipInput.value);
};
clickResponse();
