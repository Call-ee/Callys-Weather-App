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
let AmOrPm = hours >= 12 ? "pm" : "am";
hours = hours % 12 || 12;
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.querySelector(".time");
currentTime.innerHTML = `${month} ${date}, ${day} | Time: ${hours}:${minutes} ${AmOrPm}`;

// full week forecast //
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2 fs-5"  style="font-family: var(--main-font);color: white">
            <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              id="days"
              width="70"
            />
            <div> ${formatDay(forecastDay.dt)} </div>
            <div> 
            ${Math.round(forecastDay.temp.max)}° </div>
            <div class="min fs-6">${Math.round(forecastDay.temp.min)}°</div>
            
          </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Search Engine //

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city");
  let cityInput = document.querySelector(".title");
  let value = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=imperial&appid=1a1c85ee290054195972d7e505026c70`;
  axios.get(`${apiUrl}`).then(showTemperature);
  if (input.value) {
    cityInput.innerHTML = `${value}`;
  } else {
    alert("Please type a city in the search bar below 😊");
  }
}

// Temperature Conversion //

function convertF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempInput = document.querySelector(".tNumber");
  tempInput.innerHTML = Math.round(celsiusTemperature);
}
function convertC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let fahrenheitTemperature = ((celsiusTemperature - 32) * 5) / 9;
  let tempInput = document.querySelector(".tNumber");
  tempInput.innerHTML = Math.round(fahrenheitTemperature);
}

// Get weather API data //
function getForecast(coordinates) {
  let apiKey = "1a1c85ee290054195972d7e505026c70";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityName = document.querySelector(".title");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".tNumber");
  let description = document.querySelector(".weatherD");
  let windSpeed = document.querySelector(".wind");
  let humidity = document.querySelector(".pre");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = `${response.data.name}`;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = `${response.data.weather[0].description}!`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}m/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showPosition(position) {
  let apiKey = "1a1c85ee290054195972d7e505026c70";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertC);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertF);

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let currentUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=imperial&appid=1a1c85ee290054195972d7e505026c70";
axios(`${currentUrl}`).then(showTemperature);
