function getWeather() {
    const location = document.getElementById("locationInput").value;
    const apiKey = "0c80b2b56f1943ada19100744230103";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const weatherInfo = document.getElementById("weatherInfo");
            weatherInfo.innerHTML = "";

            const placeInput = data.location.name;
            const temperature = data.current.temp_c;
            const weatherCondition = data.current.condition.text;
            const currentDate = new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            const weatherTypeDisplay = document.querySelector(".weather-type");
            weatherTypeDisplay.innerHTML = weatherCondition;

            const temperatureDisplay = document.querySelector(".temparature");
            temperatureDisplay.innerHTML = `${temperature}°C`;

            const datePlace = document.getElementById("datePlace");
            datePlace.innerHTML = `<div class="day">${currentDate}</div><div class="place"><span><i class="fa-solid fa-location-dot"></i></span>${placeInput}</div>`;

            const section = document.querySelector(".season-section");
            section.classList.remove("cloudy", "rainy", "night");

            if (weatherCondition.toLowerCase().includes("sunny")) {
                section.classList.add("day");
            } else if (weatherCondition.toLowerCase().includes("cloud")) {
                section.classList.add("cloudy");
            } else if (weatherCondition.toLowerCase().includes("rain")) {
                section.classList.add("rainy");
            } else {
                section.classList.add("night");
            }
        })
        .catch((error) => console.log(error));
}
