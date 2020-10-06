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
  let icon = document.getElementById("icon");
  let celcius, date, tempIcon;
  // console.log("Fetch API", config); //empty object
  // console.log("Fetch API", API_KEY);
  // console.log("Fetch URL", URL);

  /** */

  /**Helper functions */

  async function getWeather() {
    const zipInput = document.getElementById("zip");
    const z = zipInput.value;
    fetch(`${URL}${API_KEY}&q=${z}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Data Returned =>", data);

        postData("http://localhost:8080/sent", {
          date,
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          feel: feelings,
          name: data.name,
        });
      })
      .catch((err) => console.log(err));
  }
  getWeather();

  //async post data to server
  async function postData(url = "", data = {}) {
    const res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newDataIncoming = await res.json();
      console.log("New Data recieved from API", newDataIncoming);
      return newDataIncoming;
    } catch (err) {
      console.log("Errors found", err);
    }
  }

  //update client/html

  const updateHTML = async () => {
    const res = await fetch("http://localhost:8080/retrieve");
    try {
      const retrievedData = await res.json();
      date = new Date();
      dateId.innerHTML = date.getUTCDate();
      celcius = temp.innerHTML = Math.round(data.main.temp - 273) + "&#176;";
      console.log("Degrees Celcius", celcius);
      content.innerHTML = data.name;
      tempIcon = data["weather"][0]["icon"];
      console.log(tempIcon); //01n
      icon.innerHTML = `<img src="http://openweathermap.org/img/w/${tempIcon}.png"; alt="image_weather"/>`;
      entries.style.visibility = "visible";
    } catch (err) {
      console.log("Errors found", err);
    }
  };
  triggerButton.addEventListener("click", getWeather);
});
