document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "c69107fa1a2b99771c6bc5511da98a97";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const container = document.querySelector(".container-Api");
    const weatherBox = document.querySelector(".weather-box");
    const weatherDetails = document.querySelector(".weather-details");
    const error404 = document.querySelector(".not-found");

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === '404') {
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');



        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".humidity span").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind span").innerHTML = data.wind.speed + " Km/h";

        const weatherIcon = document.querySelector(".weather-icon");
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "image/cloud.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "image/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "image/rain.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "image/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "image/snow.png";
        }
        return false;
    }

    const searchBox = document.querySelector(".search-box input");
    const searchBtn = document.querySelector(".search-box button");

    searchBtn.addEventListener("click", function () {
        const city = searchBox.value.trim();
        if (city === "") {

            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        checkWeather(city);
    });
});
