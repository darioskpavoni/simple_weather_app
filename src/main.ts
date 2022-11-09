const weatherContainer = document.querySelector(".weather")! as HTMLElement;
const inputCity = document.getElementById("inputCity")! as HTMLInputElement;
const inputCityBtn = document.getElementById("btnSearch")! as HTMLInputElement;

// TODO(spa): Get API key from backend via env variables
const API_KEY = "";

let searchedCity: string;

if (inputCityBtn) {
    inputCityBtn.addEventListener("click", async () => {
        searchedCity = inputCity.value;
        const res: any = await fetchWeather(searchedCity);

        console.log(res);

        if (res?.success === false) {
            alert("Cererea nu a avut success. Incercați din nou");
        } else {
            const city = document.createElement("div");
            city.classList.add("city");
            const cityName = document.createElement("div");
            cityName.classList.add("city-name");
            cityName.innerText = res.request.query;
            city.innerText = `Vremea pentru `;
            city.appendChild(cityName);

            const currentWeather = document.createElement("div");
            currentWeather.classList.add("weather-description");
            currentWeather.innerText = res.current.weather_descriptions[0];

            const temperature = document.createElement("div");
            temperature.classList.add("temperature");
            temperature.innerText = `Temperatură: ${res.current.temperature}C°`;

            const feltTemperature = document.createElement("div");
            feltTemperature.classList.add("felt-temperature");
            feltTemperature.innerText = `Temp. percepută: ${res.current.feelslike}C°`;

            const humidity = document.createElement("div");
            humidity.classList.add("humidity");
            humidity.innerText = `Umiditate: ${res.current.humidity}%`;

            removeAllChildNodes(weatherContainer);

            weatherContainer.appendChild(city);
            weatherContainer.appendChild(currentWeather);
            weatherContainer.appendChild(temperature);
            weatherContainer.appendChild(feltTemperature);
            weatherContainer.appendChild(humidity);
        }
    });
}

async function fetchWeather(city: string) {
    return new Promise((resolve, reject) => {
        const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

function removeAllChildNodes(parent: HTMLElement) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
