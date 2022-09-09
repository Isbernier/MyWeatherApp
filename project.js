//Local time
let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
let hour = now.getHours();
if (hour < 10) hour = "0" + hour;
let day = now.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = days[day];
let month = now.getMonth();
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];
let monthName = months[month];
let year = now.getFullYear();
let dayCalendar = now.getDate();
if (dayCalendar < 10) dayCalendar = "0" + dayCalendar;
let formattedDate = `Local time: ${weekDay}. ${monthName}. ${dayCalendar}, ${year} ${hour}h${minutes}min`;
let h3 = document.querySelector("#localTime");
h3.innerHTML = formattedDate;
//end of local time

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 7) {
            forecastHTML =
                forecastHTML +
                `
                    <div class="col-2">
                        <div class="weather-forecast-date">
                            ${formatDay(forecastDay.dt)}
                        </div>
                        <div class="weather-forecast-icons">
                            <img src=http://openweathermap.org/img/wn/${
                                forecastDay.weather[0].icon
                            }@2x.png alt="" width="50"/>
                        </div>
                        <div class="weather-forecast-temp">
                            <span class="weather-forecast-temp-max tem">${Math.round(
                                forecastDay.temp.max
                            )}</span><span>º /</span>
                            <span class="weather-forecast-temp-min tem">${Math.round(
                                forecastDay.temp.min
                            )}</span><span>º</span>
                        </div>
                    </div>
                `;
        }
        forecastElement.innerHTML = forecastHTML;
    });
}

function getForecast(coordinates) {
    let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let maxTempElement = document.querySelector("#max-temp");
    let maxTemp = Math.round(response.data.main.temp_max);
    maxTempElement.innerHTML = maxTemp;
    let minTempElement = document.querySelector("#min-temp");
    let minTemp = Math.round(response.data.main.temp_min);
    minTempElement.innerHTML = minTemp;
    let humidityElement = document.querySelector("#humidity");
    let humidity = response.data.main.humidity;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    let feelsLikeElement = document.querySelector("#feels-like");
    let feelsLike = Math.round(response.data.main.feels_like);
    feelsLikeElement.innerHTML = feelsLike;
    let temperatureElement = document.querySelector("#temperature-now");
    let temperature = Math.round(response.data.main.temp);
    temperatureElement.innerHTML = temperature;
    let iconElement = document.querySelector("#today-icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    celsiusTemp = Math.round(response.data.main.temp);

    getForecast(response.data.coord);
}

function search(city) {
    let units = "metric";
    let apiKey = "b0684348b73ea07b122cc59301878b16";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value || "Madrid");
}

let isCelsius = true;

const toFahrenheit = (t) => (t * 9) / 5 + 32;

function showFahrenheitTemp(event) {
    event.preventDefault();
    if (!isCelsius) return;
    isCelsius = false;
    let temperatureElements = document.getElementsByClassName("tem");
    for (let temperatureElement of temperatureElements) {
        let celsiusTemp = parseInt(temperatureElement.innerHTML);
        let fahrenheitTemp = toFahrenheit(celsiusTemp);
        temperatureElement.innerHTML = Math.round(fahrenheitTemp);
    }
}

function showCelsiusTemp(event) {
    if (isCelsius) return;
    isCelsius = true;
    handleSubmit(event);
}

let celsiusTemp = null;

search("Madrid");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
