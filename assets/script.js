

function getApi() {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
}