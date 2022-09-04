//Date Formatting
let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
let hour = now.getHours();
if (hour < 10) hour = "0" + hour;
let day = now.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let weekDay = days[day];

let formattedDate = `Local Time: ${weekDay}, ${hour}:${minutes}`;

let h3 = document.querySelector("#currentTime");
h3.innerHTML = formattedDate;
//end of date formatting

//Right Now Temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#rightNow");
  temperatureElement.innerHTML = `Right now: ${temperature}ºC`;
}

//city searched in form
function searchCity(event) {
  event.preventDefault();

  let citySearched = document.querySelector("#search-text-input");
  citySearched = citySearched.value;

  let h2city = document.querySelector("#h2city");
  h2city.innerHTML = citySearched;

  //API
  let units = "metric";
  let apiKey = "b0684348b73ea07b122cc59301878b16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let h2city = document.querySelector("#search-form");
h2city.addEventListener("submit", searchCity);
