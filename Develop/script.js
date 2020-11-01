//VARIABLE DECLARATION
var cityInput = document.getElementById("city-value");
var clearCity = document.getElementById("clear-history");
var searchBtn = document.getElementById("search-button");
var cityName = document.getElementById("city-name");
var cityPic = document.getElementById("current-pic");
var cityTemp = document.getElementById("city-temperature");
var cityHumidity = document.getElementById("city-humidity");
var cityWindSpeed = document.getElementById("city-windspeed");
var cityUV = document.getElementById("city-UV");
var cityHistory = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var APIKey = "11cc6738fb7101f2239490031655308f";

//FUNCTION DECLARATION

function searchWeather(name) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=" +
    APIKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var currentDate = new Date(data.dt * 1000);
      console.log(currentDate);

      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();

      cityName.textContent = data.name + " " + (month + "/" + day + "/" + year);

      var weatherImage = data.weather[0].icon;

      cityPic.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherImage + "@2x.png"
      );
      cityPic.setAttribute("alt", data.weather[0].description);
      cityTemp.textContent =
        "Temperature: " + convert(data.main.temp) + " degrees Fahrenheit";
      cityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      cityWindSpeed.textContent =
        "Wind Speed: " + data.wind.speed + " Miles Per Hour";

      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      var UVUrl =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey +
        "&cnt=1";

      fetch(UVUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var UVIndex = document.createElement("span");
          UVIndex.setAttribute("class", "badge badge-info");
          UVIndex.textContent = data[0].value;
          cityUV.textContent = "UV Index: ";
          cityUV.append(UVIndex);
        });

      var cityIdValue = data.id;
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityIdValue +
        "&appid=" +
        APIKey;

      fetch(forecastURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var forecastElements = document.getElementsByClassName("forecast");

          for (let index = 0; index < forecastElements.length; index++) {
            forecastElements[index].textContent = "";

            var forecastIndex = index * 8 + 4;

            var foreCastDate = new Date(data.list[forecastIndex].dt * 1000);
            var foreCastDay = foreCastDate.getDate();
            var foreCastMonth = foreCastDate.getMonth() + 1;
            var foreCastYear = foreCastDate.getFullYear();
            var addForecastDate = document.createElement("p");
            addForecastDate.setAttribute("class", "mt-3 mb-0 forecast-date");
            addForecastDate.textContent =
              foreCastMonth + "/" + foreCastDay + "/" + foreCastYear;
            forecastElements[index].append(foreCastDate);

            var forecastWeatherImage = document.createElement("img");
            forecastWeatherImage.setAttribute(
              "src",
              "https://openweathermap.org/img/wn/" +
                data.list[forecastIndex].weather[0].icon +
                "@2x.png"
            );
            forecastElements[index].append(forecastWeatherImage);

            var forecastTemp = document.createElement("h4");
            forecastTemp.textContent =
              "Temperature: " + data.list[forecastIndex].main.temp;
            forecastElements[index].append(forecastTemp);

            var forecastHumidity = document.createElement("p");
            forecastHumidity.textContent =
              "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastElements[index].append(forecastHumidity);
          }
        });
    });
}

function convert(temp) {
  return Math.floor((temp - 273.15) * 1.8 + 32);
}

function saveSearchHistory() {
  cityHistory.textContent = "";
  for (let index = 0; index < searchHistory.length; index++) {
    var historyContent = document.createElement("input");
    historyContent.setAttribute("type", "text");
    historyContent.setAttribute("class", "form bg-white");
    historyContent.setAttribute("value", searchHistory[i]);
    historyContent.addEventListener("click", function () {
      searchWeather(historyContent.value);
    });
    cityHistory.append(historyContent);
  }
}

// //EVENTS
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var searchInput = cityInput.value;
  console.log(cityInput.value);
  searchWeather(cityInput.value);
  searchHistory.push(searchInput);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  saveSearchHistory();
});

clearCity.addEventListener("click", function () {
  searchHistory = [];
  saveSearchHistory();
});
