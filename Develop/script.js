//VARIABLE DECLARATION
var cityInput = document.getElementById("city-input");
var clearCity = document.getElementById("clear-history");
var searchBtn = document.getElementById("search-button");
var cityName = document.getElementById("city-name");
var cityPic = document.getElementById("current-pic");
var cityTemp = document.getElementById("city-temperature");
var cityHumidity = document.getElementById("city-humidity");
var cityWindSpeed = document.getElementById("city-windspeed");
var cityUV = document.getElementById("city-UV");
var cityHistory = document.getElementById("history");
var searchHistory = JSON.parse(localStorage.getItem("search"));
var APIKey = "&appid=11cc6738fb7101f2239490031655308f";

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

      cityName.textContent =
        response.data.name + (month + "/" + day + "/" + year);

      var weatherImage = response.data.weather[0].icon;
      cityPic.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherImage + "@2x.png"
      );
      cityPic.setAttribute("alt", response.data.weather[0].description);
      cityTemp.textContent =
        "Temperature: " + k2f(response.data.main.temp) + " &#176F";
      cityTemp.textContent = "Humidity: " + response.data.main.humidity + "%";
      cityWindSpeed.textContent =
        "Wind Speed: " + response.data.wind.speed + " Miles Per Hour";
    });

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
      UVIndex.setAttribute("class", "badge badge-danger");
      UVIndex.textContent = data[0].value;
      currentUVEl.innerHTML = "UV Index: ";
      currentUVEl.append(UVIndex);
    });
}

// function listCity() {
//   var cityText = $(this).siblings(".text").val();

//   localStorage.setItem(key, value);
// }

// //EVENTS
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(searchValue.value);
  searchedCity(searchValue.value);
});
