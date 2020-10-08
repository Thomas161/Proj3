document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded and parsed", event.timeStamp);

  /**Global Variables */
  const URL = "http://api.openweathermap.org/data/2.5/weather?APPID=";
  const API_KEY = "1a425e11bb04696c4f6f6ab481b9e74d";
  const triggerButton = document.querySelector("#generate");
  let dateEntry = document.getElementById("date");
  let temp = document.getElementById("temp");
  let name = document.getElementById("namePlace");
  // let entries = document.getElementById("entryHolder");
  let icon = document.getElementById("icon");
  let dateSubmitted = new Date();

  /**Helper functions */

  triggerButton.addEventListener("click", getWeather);

  async function getWeather() {
    const zipInput = document.getElementById("zip").value;
    const feelingsInput = document.querySelector("#feelings").value;
    getDataFromUrl(URL, API_KEY, zipInput)
      .then((data) => {
        console.log("Data Returned =>", data);
        postData("http://localhost:8080/sent", {
          date: dateSubmitted,
          temp: data.main.temp,
          feel: feelingsInput,
          name: data.name,
          icon: data.weather[0].icon,
          lat: data.coord.lat,
          lat: data.coord.lon,
        });
      })
      .then(updateHTML);
    setTimeout(() => {
      console.log("Updated UI");
      document.querySelector(".card").style.display = "none";
      document.querySelector("#entryHolder").style.visibility = "visible";
    }, 2000);
  }

  const getDataFromUrl = async (url, apiKey, zip) => {
    const res = await fetch(`${url}${apiKey}&q=${zip}`);
    try {
      const data = await res.json();
      console.log("Data retrieved", data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };

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
      // name.innerHTML = retrievedData.name;
      temp.innerHTML = Math.round(retrievedData.temp - 273);
      let tempIcon = retrievedData.icon;
      icon.innerHTML = `<img src="http://openweathermap.org/img/w/${tempIcon}.png"; alt="image_weather"/>`;
    } catch (err) {
      console.log("Errors found", err);
    }
  };
});
