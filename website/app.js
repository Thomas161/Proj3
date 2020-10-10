document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM loaded and parsed", event.timeStamp);

  /**Global Variables */
  const URL = "https://api.openweathermap.org/data/2.5/weather";
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

  let urlAPIKeyZIP = `${URL}?q=${zipInput}&APPID=${API_KEY}`;
  console.log(urlAPIKeyZIP);

  triggerButton.addEventListener("click", getWeather);

  async function getWeather() {
    let res = await fetch(urlAPIKeyZIP);
    let convertResponse = await res.json();
    console.log("Response json =>", convertResponse);
    return convertResponse;
  }

  // try {
  //   const icon = data.weather[0].icon;
  //   const date = dateSubmitted;
  //   const name = data.name;
  //   const feelings = feelingsInput;
  //   const tempMain = Math.floor(data.main.temp - 273);
  //   const longitude = data.coord.lon;
  //   const latitude = data.coord.lat;
  //   console.log("Data Returned =>", data);
  //   postData("/sent", {
  //     icon,
  //     date,
  //     name,
  //     feelings,
  //     tempMain,
  //     longitude,
  //     latitude,
  //   });
  //   updateHTML();
  // } catch (err) {
  //   console.log("Bad data Entry, invalid", err);
  //   return;
  // }

  // .then(
  //   setTimeout(() => {
  //     console.log("Updated UI");
  //     document.querySelector(".card").style.display = "none";
  //     document.querySelector("#entryHolder").style.visibility = "visible";
  //   }, 2000)
  // );

  // async function getWeather(url) {
  //   const res = await fetch(url);
  //   console.log(res.status);//400
  //   const weatherInformation = await res.json();
  //   return weatherInformation;
  // }

  //async post data to server
  // const postData = async (url = "", data = {}) => {
  //   await fetch(url, {
  //     method: "POST",
  //     credentials: "same-origin",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // };

  //update client/html

  // const updateHTML = async () => {
  //   const res = await fetch("http://localhost:8080/retrieve");
  //   console.log("response", res.status); //200 status
  // try {
  //   const retrievedData = await res.json();
  //   console.log("Comes back =>", retrievedData); //temp
  //   dateEntry.innerHTML = retrievedData.date;
  //   name.innerHTML = retrievedData.name;
  //   temp.innerHTML = Math.round(retrievedData.temp - 273);
  //   conditions.innerHTML = retrievedData.conditions;
  //   lat.innerHTML = retrievedData.latitude;
  //   long.innerHTML = retrievedData.longitude;
  //   let tempIcon = retrievedData.icon;
  //   icon.innerHTML = `<img src="http://openweathermap.org/img/w/${tempIcon}.png"; alt="image_weather"/>`;
  // } catch (err) {
  //   console.log("Errors found", err);
  // }
  // };
});
