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

  const feelingsInput = document.querySelector("#feelings").value;
  let dateSubmitted = new Date();

  /**Helper functions */

  const getWeather = async () => {
    const zipInput = document.getElementById("zip").value;
    const res = await fetch(`${URL}${zipInput},us&appid=${API_KEY}`);
    console.log(res);

    try {
      const convertResponse = await res.json();
   
      const icon = convertResponse.weather[0].icon;
        const date = dateSubmitted;
        const name = convertResponse.name;
        const feelings = feelingsInput;
        const tempMain = Math.floor(convertResponse.main.temp - 273);
        const longitude = convertResponse.coord.lon;
        const latitude = convertResponse.coord.lat;
        console.log("Response json =>", convertResponse);
          postData("/sent", {
      icon,
      date,
      name,
      feelings,
      tempMain,
      longitude,
      latitude,
    });
    updateHTML();
      return convertResponse;
    } catch (err) {
      console.log("Error =>", err);
    }
  };

  triggerButton.addEventListener("click", getWeather);

  // try {
  //  
  //   console.log("Data Returned =>", data);
  
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

  async post data to server
  const postData = async (url = "", data = {}) => {
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

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
