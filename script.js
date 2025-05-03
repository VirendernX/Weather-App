document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "aeb41b778941986d53b410a01d499e9d";
  const weatherDiv = document.getElementById("weather");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Show loading
  document.getElementById("loading").style.display = "block";
  weatherDiv.style.opacity = "0.5";

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      // Hide loading
      document.getElementById("loading").style.display = "none";
      weatherDiv.style.opacity = "1";

      if (data.cod === "404") {
        alert("City not found!");
        return;
      }

      document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
      document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
      document.getElementById("description").innerText = `Condition: ${data.weather[0].description}`;
      document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;

      // Weather icon
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const iconImg = document.getElementById("icon");
      iconImg.src = iconUrl;
      iconImg.style.display = "block";

      // Trigger animation
      weatherDiv.classList.remove("show");
      void weatherDiv.offsetWidth; // reflow
      weatherDiv.classList.add("show");
    })
    .catch(err => {
      document.getElementById("loading").style.display = "none";
      weatherDiv.style.opacity = "1";
      alert("Error fetching weather data!");
      console.error(err);
    });
}
