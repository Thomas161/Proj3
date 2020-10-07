document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded and parsed", event.timeStamp);

  /**Global Variables */
  const URL = "http://api.openweathermap.org/data/2.5/weather?APPID=";
  const API_KEY = "1a425e11bb04696c4f6f6ab481b9e74d";
  const triggerButton = document.querySelector("#generate");
  let dateEntry = document.getElementById("date");
  let temp = document.getElementById("temp");
  let content = document.getElementById("content");
  let entries = document.getElementById("entryHolder");
  let icon = document.getElementById("icon");
  let feelings = document.getElementById("feelings");

  let tempIcon;
  let dateSubmitted = {};

  /**Helper functions */

  triggerButton.addEventListener("click", getWeather);

  async function getWeather() {
    const zipInput = document.getElementById("zip").value;

    getDataFromUrl(URL, API_KEY, zipInput)
      .then((data) => {
        console.log("Data Returned =>", data);

        postData("http://localhost:8080/sent", {
          dateSubmitted,
          temp: data.main.temp,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          feel: feelings,
          name: data.name,
        });
      })
      .then(updateHTML);
    setTimeout(() => {
      console.log("Updated UI");
      document.querySelector(".card").style.display = "none";
    }, 2000);
  }

  const getDataFromUrl = async (url, apiKey, zip) => {
    const res = await fetch(`${url}${apiKey}&q=${zip}`);
    try {
      const dataRetrieved = await res.json();
      console.log("Data retrieved", dataRetrieved);
      return dataRetrieved;
    } catch (err) {
      console.log("Error", err);
    }
  };

  //async post data to server
  const postData = async (url = "", data = {}) => {
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
  };

  //update client/html

  const updateHTML = async () => {
    const res = await fetch("http://localhost:8080/retrieve");
    console.log("response", res);
    try {
      const retrievedData = await res.json();
      console.log("Comes back =>", retrievedData); //temp
      dateSubmitted = {
        day: new Date().getDay(),
        month: new Date().getMonth(),
        year: new Date().getYear(),
        time: new Date().getTime(),
      };
      const { day, month, year, time } = dateSubmitted;
      dateEntry.innerHTML = `${day}/${month}/${year}/${time}`;
      let celcius = Math.round(retrievedData - 273) + "&#176;";
      temp.innerHTML = celcius;
      console.log("Degrees Celcius", celcius);
      content.innerHTML = retrievedData.name;
      tempIcon = retrievedData["weather"][0]["icon"];
      // console.log(tempIcon); //01n
      icon.innerHTML = `<img src="http://openweathermap.org/img/w/${tempIcon}.png"; alt="image_weather"/>`;
      entries.style.visibility = "visible";
      console.log("Retrieved data", retrievedData);
    } catch (err) {
      console.log("Errors found", err);
    }
  };
});
