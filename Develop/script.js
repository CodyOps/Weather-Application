//VARIABLE DECLARATION
var searchBtn = document.getElementById("search-button");
var searchValue = document.querySelector("[data-city-search]");
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
    searchValue.value.trim() +
    "&appid=11cc6738fb7101f2239490031655308f";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var nameValue = data["name"];
      var tempValue = data["temp"];
      var windValue = data["wind"];
      var uvValue = data["uv"];
    });
}

function listCity() {
  // fetch request gets a list of all the repos for the node.js organization
  var cityText = $(this).siblings(".text").val();

  localStorage.setItem(key, value);
}

//EVENTS
searchBtn.addEventListener("click", searchedCity());
