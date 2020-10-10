document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded and parsed", event.timeStamp);

  /**Global Variables */
  const URL = "http://api.openweathermap.org/data/2.5/weather?APPID=";
  const API_KEY = "1a425e11bb04696c4f6f6ab481b9e74d";
  const triggerButton = document.querySelector("#generate");
  let dateEntry = document.getElementById("date");
  let temp = document.getElementById("temp");
  let name = document.getElementById("namePlace");
  let conditions = document.getElementById("conditions");
  let lat = document.getElementById("lat");
  let long = document.getElementById("long");
  let icon = document.getElementById("icon");
  const zipInput = document.getElementById("zip").value;
  const feelingsInput = document.querySelector("#feelings").value;
  let dateSubmitted = new Date();

  /**Helper functions */

  triggerButton.addEventListener("click", getWeather);

  let urlAPIKeyZIP = `${URL}${API_KEY}&q=${zipInput}`;

  async function getWeather(url) {
    let res = await fetch(url);
    let weatherInformation = res.json();
    return weatherInformation;
  }
  getWeather(urlAPIKeyZIP)
    .then((data) => {
      if (data.cod === "200") {
        const icon = data.weather[0].icon;
        const date = dateSubmitted;
        const name = data.name;
        const feelings = feelingsInput;
        const tempMain = Math.floor(data.main.temp - 273);
        const longitude = data.coord.lon;
        const latitude = data.coord.lat;
        console.log("Data Returned =>", data);
        postData("http://localhost:8080/sent", {
          icon,
          date,
          name,
          feelings,
          tempMain,
          longitude,
          latitude,
        });
        updateHTML();
      } else {
        console.log("Bad data Entry, invalid");
        return;
      }
    })

    .then(
      setTimeout(() => {
        console.log("Updated UI");
        document.querySelector(".card").style.display = "none";
        document.querySelector("#entryHolder").style.visibility = "visible";
      }, 2000)
    );

  //async post data to server
  const postData = async (url = "", data = {}) => {
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log("response sent from post", res);
      return res.json();
    });
  };

  //update client/html

  const updateHTML = async () => {
    const res = await fetch("http://localhost:8080/retrieve");
    console.log("response", res.status); //200 status
    try {
      const retrievedData = await res.json();
      console.log("Comes back =>", retrievedData); //temp
      dateEntry.innerHTML = retrievedData.date;
      name.innerHTML = retrievedData.name;
      temp.innerHTML = Math.round(retrievedData.temp - 273);
      conditions.innerHTML = retrievedData.conditions;
      lat.innerHTML = retrievedData.lat;
      long.innerHTML = retrievedData.lon;
      let tempIcon = retrievedData.icon;
      icon.innerHTML = `<img src="http://openweathermap.org/img/w/${tempIcon}.png"; alt="image_weather"/>`;
    } catch (err) {
      console.log("Errors found", err);
    }
  };
});
