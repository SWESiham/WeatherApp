import { config } from './config.js'; 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");
const errorMess = document.querySelector(".error");


async function checkWeather(city) {
  const response = await fetch(config.apiUrl + city + `&appid=${config.apiKey}`);
  var data = await response.json();

  if (response.status == 404) {
    errorMess.style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    }
    if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    }
    if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    }
    if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    }
    if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./images/mist.png";
    }
    errorMess.style.display = "none";

    document.querySelector(".weather").style.display = "block";
  }

  console.log(data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
