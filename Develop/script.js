//VARIABLE DECLARATION
var searchBtn = document.getElementById("search-button");
var searchValue = document.querySelector("city-value");
var savedCities = document.getElementById("saved-cities");
var currentCity = document.getElementById("current-city");
var cityName = document.getElementById("city-title");
var citytemp = document.getElementById("city-temperature");
var cityHumidity = document.getElementById("city-humidity");
var cityWindSpeed = document.getElementById("city-windspeed");
var cityUV = document.getElementById("city-UV");

//FUNCTION DECLARATION

function searchedCity() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    "#city-value".value.trim() +
    "&appid=11cc6738fb7101f2239490031655308f";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var nameValue = data["name"];
      var tempValue = data["main.temp"];
      var windValue = data["wind"];
      var uvValue = data["uv"];

      "#city-title".innerHTML = nameValue;
      "#city-temperature".innerHTML = tempValue;
      "city-windspeed".innerHTML = windValue;
      "city-UV".innerHTML = uvValue;
    });
}

function listCity() {
  var cityText = $(this).siblings(".text").val();

  localStorage.setItem(key, value);
}

//EVENTS
searchBtn.addEventListener("click", searchedCity());
