document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded and parsed", event.timeStamp);
  /**Global Variables */

  const URL = "http://api.openweathermap.org/data/2.5/weather?APPID=";
  const API_KEY = "1a425e11bb04696c4f6f6ab481b9e74d";
  const triggerButton = document.querySelector("#generate");
  let dateId = document.getElementById("date");
  let temp = document.getElementById("temp");
  let content = document.getElementById("content");
  let entries = document.getElementById("entryHolder");
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
        let date = new Date();
        dateId.innerHTML = date.getUTCDate();
        console.log((temp.innerHTML = data.main.temp - 273));
        content.innerHTML = data.name;
        entries.style.visibility = "visible";
      })
      .catch((err) => console.log(err));
  }
  getWeather();
  triggerButton.addEventListener("click", getWeather);

  /**Add click event and event listener to button  */
  //   let clickResponse = () => {
  //     const zipInput = document.getElementById("zip");

  //     console.log(zipInput.value);
  //   };
  //   clickResponse();
});
