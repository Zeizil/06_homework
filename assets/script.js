// put API key back in 


const cityEl = document.getElementById("citysearch");
const srchBtn = document.getElementById("fetch-button");
const resultsTable = document.getElementById("weather-results");
const today = moment().format('MMM Do, YYYY');

const generateResult = ({city, today, weatherName, weatherIcon, weatherTemp, weatherHumidity, weatherWind}) =>
    `<span class="card-body table mx-auto my-4">
    <h3>${city}, ${today}</h3>
    <p>${weatherIcon} ${weatherName}</p>
    <hr>
    <p>Temperature: ${weatherTemp}<br>Humidity: ${weatherHumidity}<br>Windspeed: ${weatherWind}</p>
    </span>`;

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

function getCurrentWeather(lat, lon, city) {
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
         const weatherName = data.weather[0].main;
        //  const weatherIcon = data.weather[0].icon;
        //  for icons, if-else for each weather type 
        
        
         const weatherTemp = data.main.temp;
         const weatherHumidity= data.main.humidity;
         const weatherWind = data.wind.speed;

         const result = document.createElement("p");
         const resultText = document.createTextNode(city + " " + today + "\n" + weatherName + " Temperature: " + weatherTemp + " Humidity: " + weatherHumidity + " Wind Speed: " + weatherWind);
         result.appendChild(resultText);
         resultsTable.appendChild(result);

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
         getCurrentWeather(lat, lon, city);
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