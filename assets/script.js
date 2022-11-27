const cityEl = document.getElementById("citysearch");
const srchBtn = document.getElementById("fetch-button");

function getApi(lat, lon) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
             console.log(data);
             //data[0].list
        })
}

function getCurrentWeather(lat, lon) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${ApiKey}`

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
         console.log(data);
         //data[0].weather
         //data[0].list
         // etc
    })
}

function getLatLon(city) {
    const requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${ApiKey}`;
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
         console.log(data);
         const lat = data[0].lat;
         const lon = data[0].lon;
         //getApi, pass lat and lon
         getCurrentWeather(lat, lon);
         getApi(lat, lon);
    })
}

function citySearch() {
    // get the city name from input
    const city = cityEl.value;
    getLatLon(city);
}

// event listener for search button
srchBtn.addEventListener('click', citySearch);