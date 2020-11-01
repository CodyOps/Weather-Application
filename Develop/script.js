//VARIABLE DECLARATION
var searchBtn = document.getElementById("search-button");
var searchValue = document.getElementById("city-value");
var savedCities = document.getElementById("saved-cities");
var currentCity = document.getElementById("current-city");
var cityName = document.getElementById("city-title");
var citytemp = document.getElementById("city-temperature");
var cityHumidity = document.getElementById("city-humidity");
var cityWindSpeed = document.getElementById("city-windspeed");
var cityUV = document.getElementById("city-UV");

//FUNCTION DECLARATION

function searchedCity(name) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=11cc6738fb7101f2239490031655308f&units=imperial";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.main.temp);

      var nameValue = data.name;
      var tempValue = data.main.temp;
      var windValue = data.wind;
      var uvValue = data["uv"];

      cityName = nameValue;
      citytemp.textContent = tempValue;
      "city-windspeed".innerHTML = windValue;
      "city-UV".innerHTML = uvValue;
    });
}

function listCity() {
  var cityText = $(this).siblings(".text").val();

  localStorage.setItem(key, value);
}

//EVENTS
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log(searchValue.value);
  searchedCity(searchValue.value);
});
