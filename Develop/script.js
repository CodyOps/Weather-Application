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

//Function to take user input to run through api fetch
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

      //Grabs the day, month and year from the current data received from the weather api object
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();

      //Added the date to the city-name id on the HTML with a bolded font class
      cityName.textContent =
        data.name + "    " + (month + "/" + day + "/" + year);
      cityName.setAttribute("class", "font-weight-bold");

      //Grabs the current weather icon for the API object returned
      var weatherImage = data.weather[0].icon;

      //Setss the attribute of the id current-pic to the link of icon gathered from openWeather
      cityPic.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherImage + "@2x.png"
      );

      //adds and alt for screen readers
      cityPic.setAttribute("alt", data.weather[0].description);

      //adding the value of the temp, humidity and wind to teh html
      cityTemp.textContent =
        "Temperature: " + convert(data.main.temp) + " degrees Fahrenheit";
      cityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      cityWindSpeed.textContent =
        "Wind Speed: " + data.wind.speed + " Miles Per Hour";

      //Grabs the lat and long of the coordinates of the searched city
      var latitude = data.coord.lat;
      var longitude = data.coord.lon;

      //Gathers the uv url from the coordinates for the fetch function
      var UVUrl =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey +
        "&cnt=1";

      //fetches the uv URL and take the object returned
      fetch(UVUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //create a new element in the html to append the UV value obtained
          var UVIndex = document.createElement("span");
          // UVIndex.setAttribute("class", "badge badge-primary");
          UVIndex.textContent = data[0].value;

          if (data[0].value > 8) {
            cityUV.textContent = "UV Index: ";
            cityUV.setAttribute("class", "badge badge-danger");
            cityUV.append(UVIndex);
          } else if (5 < data[0].value < 8) {
            cityUV.textContent = "UV Index: ";
            cityUV.setAttribute("class", "badge badge-warning");
            cityUV.append(UVIndex);
          } else if (data[0].value < 5) {
            cityUV.textContent = "UV Index: ";
            cityUV.setAttribute("class", "badge badge-primary");
            cityUV.append(UVIndex);
          }

          console.log(data[0]);
        });

      //Grabs the city id value from the returned object and uses the id to run the five day forecast URL + API Key
      var cityIdValue = data.id;
      var forecastURL =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityIdValue +
        "&appid=" +
        APIKey;

      //Fetches the URL returned object
      fetch(forecastURL)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //created a variable to grab the class names of the elements in the html
          var forecastElements = document.getElementsByClassName("forecast");

          //for loop to create the five day forecast elements to append to the html
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

            //creates an image tag to append the obtained weather condition image
            var forecastWeatherImage = document.createElement("img");
            forecastWeatherImage.setAttribute(
              "src",
              "https://openweathermap.org/img/wn/" +
                data.list[forecastIndex].weather[0].icon +
                "@2x.png"
            );
            forecastElements[index].append(forecastWeatherImage);

            //creates a new h4 tag to hold the temperature text content
            var forecastTemp = document.createElement("h4");
            forecastTemp.textContent =
              "Temperature: " + data.list[forecastIndex].main.temp;
            forecastElements[index].append(forecastTemp);

            //creates a new p tag to hold the humidity text content
            var forecastHumidity = document.createElement("p");
            forecastHumidity.textContent =
              "Humidity: " + data.list[forecastIndex].main.humidity + "%";
            forecastElements[index].append(forecastHumidity);
          }
        });
    });
}

//function to convert the returned Kelvin value to Fahrenheit
function convert(temp) {
  return Math.floor((temp - 273.15) * 1.8 + 32);
}

//function to save the searchHistory of the user's cities and append to the html, added eventListener to listen for the user's clicks to run though the searchWeather function to open up the forecast
function saveSearchHistory() {
  cityHistory.textContent = "";
  for (let index = 0; index < searchHistory.length; index++) {
    var historyContent = document.createElement("input");
    historyContent.setAttribute("type", "text");
    historyContent.setAttribute("class", "font-weight-bold btn btn-warning");
    historyContent.setAttribute("value", searchHistory[index]);
    historyContent.addEventListener("click", function () {
      searchWeather(historyContent.value);
    });
    cityHistory.append(historyContent);
  }
}

// //EVENTS
//added event listener to the search button that takes the input value to run through the searchWeather Function and store the input into local storage
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var searchInput = cityInput.value;
  console.log(cityInput.value);
  searchWeather(cityInput.value);
  searchHistory.push(searchInput);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  saveSearchHistory();
});

//added an eventlistener to the clear city button to allow the user to clear their searched cities
clearCity.addEventListener("click", function () {
  searchHistory = [];
  saveSearchHistory();
});
