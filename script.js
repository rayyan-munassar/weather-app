const selectElement = (selector) => document.querySelector(selector);
const selectAllElements = (selector) => document.querySelectorAll(selector);

const bodyElement = selectElement(".body");
const inputElement = selectElement("input");
const searchButtonElement = selectElement(".search--btn");
const cityNameElement = selectElement(".city-name span");
const countryElement = selectElement(".country span");
const temperatureElement = selectElement(".temp span");
const weatherStateElement = selectElement(".weather-state");
const weatherDescriptionElement = selectElement(".weather-description");
const windSpeedElement = selectElement(".wind-speed");

// Function for changing the weather
const changeWeatherIcon = (newSrc, dayTime = "daytime") => {
  const sunMoonImg = document.querySelector(".icon");

  sunMoonImg.classList.add("fade-out");

  if (dayTime === "night") {
    setTimeout(() => {
      bodyElement.classList.add("night");
      sunMoonImg.src = newSrc;
      sunMoonImg.classList.remove("fade-out");
      sunMoonImg.classList.add("fade-in", "spin");
    }, 300);
  } else {
    setTimeout(() => {
      bodyElement.classList.remove("night");
      sunMoonImg.src = newSrc;
      sunMoonImg.classList.remove("fade-out");
      sunMoonImg.classList.add("fade-in", "spin");
    }, 300);
  }

  sunMoonImg.addEventListener("animationend", () => {
    sunMoonImg.classList.remove("fade-in", "spin");
  });
};

// Fetching data from OpeWeatherApi
searchButtonElement.addEventListener("click", (e) => {
  e.preventDefault();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      inputElement.value
    }&appid=${"71b6ee72a7fa7952e784b1ffd044badc"}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      // Extracting the data
      const city = data.name;
      cityNameElement.textContent = `${city} `;

      const country = data.sys.country;
      countryElement.textContent = country;

      const temperature = data.main.temp;
      temperatureElement.textContent = `${temperature}°F`;

      const weather = data.weather[0].main;
      weatherStateElement.textContent = `Weather: ${weather}`;

      const weatherDescription = data.weather[0].description;
      weatherDescriptionElement.textContent = `Weather Desc: ${weatherDescription}`;

      const windSpeed = data.wind.speed;
      windSpeedElement.textContent = `Wind Speed: ${windSpeed}mph`;

      // Checking if daytime or not
      const currentTime = new Date().getTime() / 1000;
      const sunriseTime = data.sys.sunrise;
      const sunsetTime = data.sys.sunset;

      if (currentTime > sunriseTime && currentTime < sunsetTime) {
        changeWeatherIcon("images/sun.png");
      } else {
        changeWeatherIcon("images/moon.png", "night");
      }
    });
});
