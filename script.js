// API KEY
const API_KEY = "01417b4cac694bfe9ae115124251005"; // Replace with your WeatherAPI key

// DOM ELEMENTS 
const cityInput = document.getElementById("cityName");
const searchButton = document.getElementById("searchButton");
const weatherInfo = document.getElementById("weatherInfo");

// GRAB FUNCTION TRIGGER
searchButton.addEventListener("click", getWeatherData);

// GET WEATHER DATA
async function getWeatherData() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        const data = await response.json();

        if (data.error) {
            weatherInfo.innerHTML = "Cannot find city";
            return;
        }

        weatherInfo.innerHTML = `
            <div class="weather-data">
                <h2>The weather in ${data.location.name}, ${data.location.country}:</h2>
                <p><img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}"></p>
                <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
                <p><strong>Weather:</strong> ${data.current.condition.text}</p>
                <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherInfo.innerHTML = "An error occurred while fetching weather data, please try again.";
    }
}
