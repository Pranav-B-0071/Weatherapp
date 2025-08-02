const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");
const errorMsg = document.getElementById("errorMsg");

// Fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`/api/weather?city=${city}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}


// Display weather on card
function displayWeather(data) {
    errorMsg.textContent = "";
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherCard.classList.remove("hidden");
}

// Show error message
function showError(message) {
    errorMsg.textContent = message;
    weatherCard.classList.add("hidden");
}

// Event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});
