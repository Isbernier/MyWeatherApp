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

//Right-Now Temperature
function showTemperature(response) {
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let maxTempElement = document.querySelector("#max-temp");
    let maxTemp = Math.round(response.data.main.temp_max);
    maxTempElement.innerHTML = `Max: ${maxTemp}º`;
    let minTempElement = document.querySelector("#min-temp");
    let minTemp = Math.round(response.data.main.temp_min);
    minTempElement.innerHTML = `Min: ${minTemp}º`;
    let humidityElement = document.querySelector("#humidity");
    let humidity = response.data.main.humidity;
    humidityElement.innerHTML = `Humidity: ${humidity}%`;
    let feelsLikeElement = document.querySelector("#feels-like");
    let feelsLike = Math.round(response.data.main.feels_like);
    feelsLikeElement.innerHTML = `Feels like: ${feelsLike}º`;
    let temperatureElement = document.querySelector("#temperature-now");
    let temperature = Math.round(response.data.main.temp);
    temperatureElement.innerHTML = `${temperature}`;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

//city searched in form
function searchCity(event) {
    event.preventDefault();

    let citySearched = document.querySelector("#search-text-input");
    citySearched = citySearched.value;

    let city = document.querySelector("#city");
    city.innerHTML = citySearched;

    //API
    let units = "metric";
    let apiKey = "b0684348b73ea07b122cc59301878b16";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", searchCity);
