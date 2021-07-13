// Time and Day //
let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDayAndMonth = document.querySelector(".day");
currentDayAndMonth.innerHTML = `${month} ${date}, ${day}`;

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${hours}:${minutes}`;

// Search Engine //

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let cityInput = document.querySelector(".title");
  let value = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=1a1c85ee290054195972d7e505026c70`;
  axios.get(`${apiUrl}`).then(showTemperature);
  if (input.value) {
    cityInput.innerHTML = `${value}`;
  } else {
    alert("Please type a city in the search bar below 😊");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function convertC(event) {
  event.preventDefault();
  let tempInput = document.querySelector(".tNumber");
  tempInput.innerHTML = 17;
}
function convertF(event) {
  event.preventDefault();
  let tempInput = document.querySelector(".tNumber");
  tempInput.innerHTML = 79;
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertC);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertF);

function showTemperature(response) {
  let cityName = document.querySelector(".title");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".tNumber");
  let description = document.querySelector(".weatherD");
  let windSpeed = document.querySelector(".wind");
  let humidity = document.querySelector(".pre");
  cityName.innerHTML = `${response.data.name}`;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = `${response.data.weather[0].description}!`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function showPosition(position) {
  let apiKey = "1a1c85ee290054195972d7e505026c70";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
