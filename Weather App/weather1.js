let weather = {
    apiKey: "2TJUZ6C6Q54AKP9RJGLZUQUPP",
    fetchWeather: function (city) {
      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${this.apiKey}` 
      )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { address,  description } = data;
      const { temp, icon, humidity, windspeed } = data.currentConditions;
      console.log(address, icon, description, temp, humidity, windspeed)
      
      document.querySelector(".city").innerText = "Weather in " + address;
      document.querySelector(".icon").src="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innertext = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + windspeed + "mph";
      
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + address + "')";
      
    } ,
    
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
  
    },
  
  };
  
    document.querySelector(".search button").addEventListener("click", function () {
      weather.search();
  });
  
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
  
  
  weather.fetchWeather("Oklahoma City");