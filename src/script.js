//Date
function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

//Weather
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document
    .querySelector("#icon")
    .setAttribute("src", changeImage(response.data.weather[0].icon));
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
}

function changeImage(icon) {
  let sunny = "media/sun.svg";
  let sunnyCloudy = "media/cloud-sun.svg";
  let cloudy = "media/cloud.svg";
  let rainy = "media/cloud-rain.svg";
  let stormy = "media/cloud-showers-heavy.svg";
  let snowy = "media/snowflake.svg";
  let clearNight = "media/moon.svg";
  let cloudyNight = "media/cloud-moon.svg";
  let rainyNight = "media/cloud-rain.svg";
  let stormyNight = "media/cloud-showers-heavy.svg";
  let snowyNight = "media/snowflake.svg";

  if (icon === "01d") {
    return sunny;
  } else if (icon === "01n") {
    return clearNight;
  } else if (icon === "02d") {
    return sunnyCloudy;
  } else if (icon === "03d" || icon === "04d") {
    return cloudy;
  } else if (icon === "02n" || icon === "03n" || icon === "04n") {
    return cloudyNight;
  } else if (icon === "09d") {
    return rainy;
  } else if (icon === "09n" || icon === "10n") {
    return rainyNight;
  } else if (icon === "11d") {
    return stormy;
  } else if (icon === "11n") {
    return stormyNight;
  } else if (icon === "13d") {
    return snowy;
  } else if (icon === "13n") {
    return snowyNight;
  } else {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}

function searchCity(city) {
  let apiKey = "452364353698f2262270ab4439ea49bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "452364353698f2262270ab4439ea49bd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
