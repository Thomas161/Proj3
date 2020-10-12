document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded and parsed", event.timeStamp);

  /**Global Variables */
  const URL = "http://api.openweathermap.org/data/2.5/weather?zip=";
  const API_KEY = "1a425e11bb04696c4f6f6ab481b9e74d";
  const triggerButton = document.querySelector("#generate");
  let dateEntry = document.getElementById("date");
  let temp = document.getElementById("temp");
  let name = document.getElementById("namePlace");
  let conditions = document.getElementById("conditions");
  let lat = document.getElementById("lat");
  let long = document.getElementById("long");
  let icon = document.getElementById("icon");
  let dateSubmitted = new Date().toLocaleDateString();

  /**Helper functions */

  triggerButton.addEventListener("click", getWeather);

  async function getWeather() {
    const zipInput = document.getElementById("zip").value;
    const feelingsInput = document.querySelector("#feelings").value;
    // const res = await fetch(`${URL}${zipInput},us&appid=${API_KEY}`);
    // console.log(res);

    getFullURL(URL, zipInput, API_KEY)
      .then((convertResponse) => {
        console.log(convertResponse);
        if (String(convertResponse.cod) === "404") {
          alert("Please enter valid zip code");
        } else {
          // console.log(convertResponse);
          const icon = convertResponse.weather[0].icon;
          const date = dateSubmitted;
          const name = convertResponse.name;
          console.log(name);
          const feelings = feelingsInput;
          const tempMain = parseFloat(convertResponse.main.temp);
          console.log("Temp in Celcius", tempMain);
          const longitude = convertResponse.coord.lon;
          const latitude = convertResponse.coord.lat;
          const conditions = convertResponse.weather[0].description;
          console.log("Response json =>", convertResponse);

          postData("/sent", {
            icon,
            date,
            name,
            feelings,
            tempMain,
            longitude,
            latitude,
            conditions,
          });
        }
      })
      .then(updateHTML);
    setTimeout(() => {
      document.querySelector(".card").style.display = "none";
      document.querySelector("#entryHolder").style.visibility = "visible";
    }, 2500);
  }

  const getFullURL = async (url, zip, key) => {
    let res = await fetch(`${url}${zip},us&appid=${key}`);
    try {
      const newIncomingData = await res.json();
      console.log(newIncomingData);
      return newIncomingData;
    } catch (err) {
      console.log(err);
    }
  };

  // async post data to server
  const postData = async (url = "", data = {}) => {
    let res = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const newIncomingData = await res.json();
      console.log("Incoming data =>", newIncomingData);
      return newIncomingData;
    } catch (err) {
      console.log(err);
    }
  };

  //update client/html

  const updateHTML = async () => {
    const res = await fetch("/retrieve");
    console.log("response", res.status); //200 status
    try {
      const retrievedData = await res.json();
      console.log("Comes back =>", retrievedData);
      dateEntry.innerHTML = retrievedData.date;
      name.innerHTML = retrievedData.name;
      temp.innerHTML = Math.round(retrievedData.temp - 273) + "&deg;";
      conditions.innerHTML = retrievedData.conditions;
      lat.innerHTML = retrievedData.lat;
      long.innerHTML = retrievedData.long;
      let tempIcon = retrievedData.icon;
      icon.innerHTML = `<img src="http://openweathermap.org/img/w/${tempIcon}.png"; alt="image_weather"/>`;
    } catch (err) {
      console.log("Errors found", err);
    }
  };

  document.getElementById("arrow").addEventListener("click", function (evt) {
    console.log("Event fired", evt.target);
    document.querySelector("#entryHolder").style.visibility = "hidden";
    document.querySelector(".card").style.display = "block";
  });
});
