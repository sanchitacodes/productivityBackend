
async function fetchWeather(lat, lon) {
    const apiKey = "284d6c33fb271346ec04df1c0943c09c";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch weather data");
      const data = await response.json();
  
      document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
      document.getElementById("city").textContent = data.name;
    } catch (error) {
      document.getElementById("city").textContent = "Unable to fetch weather data.";
    }
  }
  
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          document.getElementById("city").textContent = "Location access denied.";
        }
      );
    } else {
      document.getElementById("city").textContent = "Geolocation is not supported by this browser.";
    }
  }
  
  // Start fetching weather data when the page loads
  getLocation();
  
  