document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "c69107fa1a2b99771c6bc5511da98a97";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search-box input");
    const searchBtn = document.querySelector(".search-box button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        console.log(data);
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".humidity span").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind span").innerHTML = data.wind.speed + " Km/h";

        // Cambios integrados aquí
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
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", function () {
            const city = searchBox.value;
            checkWeather(city);
        });
    }
});