// display day,time,date
let now = new Date();
let date = now.getDate();
let month = now.getMonth();
let dayNo = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[dayNo];
let hour = now.getHours();
let min = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (min < 10) {
  min = `0${min}`;
}

let timeDisplay = document.querySelector(".current-time");
timeDisplay.innerHTML = `${hour}:${min}<br>${day}<br>${date}/${month}`;

//display temperature
function displayCityWeather(response) {
  let degreeCel = Math.round(response.data.main.temp);
  let location = response.data.name;
  let city = document.querySelector(".city");
  temp.innerHTML = degreeCel;
  city.innerHTML = `${location}`;
}

//change city name
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enterCity");
  //let city = document.querySelector(".city");
  //city.innerHTML = `${cityInput.value}`;

  // search weather
  let apiKey = "425bf19afa457ff7744c7e8ae8705a71";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCityWeather);
}

let citySearchBar = document.querySelector(".d-flex");
citySearchBar.addEventListener("submit", searchCity);

//change degree unit
function changeToCel(event) {
  event.preventDefault();
  temp.innerHTML = "26";
}

function changeToFah(event) {
  event.preventDefault();
  let tempFah = 26 * (9 / 5) + 32;
  tempFah = Math.round(tempFah);
  temp.innerHTML = `${tempFah}`;
}

let temp = document.querySelector(".temp-no");
let celsius = document.querySelector(".cel");
let fahren = document.querySelector(".fah");

celsius.addEventListener("click", changeToCel);

fahren.addEventListener("click", changeToFah);

//display current city name andtemperature
function displayWeather(response) {
  let location = response.data.name;
  let degreeCel = Math.round(response.data.main.temp);
  let city = document.querySelector(".city");
  city.innerHTML = `${location}`;
  temp.innerHTML = degreeCel;
}
//get current location
function getLocation() {
  function handlePosition(position) {
    let currentLatitude = position.coords.latitude;
    let currentLongitude = position.coords.longitude;
    let apiKey = "425bf19afa457ff7744c7e8ae8705a71";
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=metric`;
    axios.get(url).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocation = document.querySelector(".location");

currentLocation.addEventListener("click", getLocation);
