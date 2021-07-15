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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-1">
            <img
              src="http://openweathermap.org/img/wn/02d@2x.png"
              id="days"
              width="70"
            />
            80°
            <div class="min">40°</div>
            ${day}
          </div>
          `;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=1a1c85ee290054195972d7e505026c70`;
  axios.get(`${apiUrl}`).then(showTemperature);
  if (input.value) {
    cityInput.innerHTML = `${value}`;
  } else {
    alert("Please type a city in the search bar below 😊");
  }
}

// Temperature Conversion //

function convertC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempInput = document.querySelector(".tNumber");
  tempInput.innerHTML = Math.round(celsiusTemperature);
}
function convertF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let tempInput = document.querySelector(".tNumber");
  tempInput.innerHTML = Math.round(fahrenheitTemperature);
}

// Get weather API data //

function showTemperature(response) {
  console.log(response.data);
  let cityName = document.querySelector(".title");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".tNumber");
  let description = document.querySelector(".weatherD");
  let windSpeed = document.querySelector(".wind");
  let humidity = document.querySelector(".pre");
  let iconElement = document.querySelector("#icon");

  displayForecast();
  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = `${response.data.name}`;
  temperatureElement.innerHTML = `${temperature}`;
  description.innerHTML = `${response.data.weather[0].description}!`;
  windSpeed.innerHTML = `Wind: ${response.data.wind.speed}m/s`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  "https://api.openweathermap.org/data/2.5/weather?q=Philadelphia&units=metric&appid=1a1c85ee290054195972d7e505026c70";
axios(`${currentUrl}`).then(showTemperature);
