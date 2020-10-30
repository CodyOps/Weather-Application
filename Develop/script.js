//VARIABLE DECLARATION
var searchBtn = document.getElementById("search-button");
var searchValue = document.querySelector("[data-city-search]");
var savedCities = document.getElementById("saved-cities");
var currentCity = document.getElementById("current-city");
var cityName = document.getElementsByClassName("card-title");
var citytemp = document.getElementById("city-temperature");
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

function listCity() {
  // fetch request gets a list of all the repos for the node.js organization
  var cityText = $(this).siblings(".text").val();

  localStorage.setItem(key, value);
}

//EVENTS
searchedCity();
