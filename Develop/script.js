//VARIABLE DECLARATION
var searchBtn = document.getElementById("search-button");
var searchInput = document.getElementById("inlineFormInput");
var savedCities = document.getElementById("saved-cities");
var currentCity = document.getElementById("current-city");
var fiveDayForecast = document.getElementById("five-day-forecast");

//FUNCTION DECLARATION

function searchedCity() {
  // fetch request gets a list of all the repos for the node.js organization
  var requestUrl = "https://api.github.com/orgs/nodejs/repos";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//EVENTS
searchedCity();
