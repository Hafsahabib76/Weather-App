
//api implemented using OpenWeatherMapAPI - https://openweathermap.org
//webserver url
var webServerURL = "https://api.openweathermap.org/data/2.5/weather?q=";

//weather api key
var weatherKey = "da5b88a829ebf0cce5964530de3d9c39";

//default city - fetech the weather data of the mentioned city 
var city = "Karachi";

//error display message
var errorResult = "No matching location found!";

//weather labels
var feelsLikeLabel = "Feels Like";
var humidityLabel = "Humidity";
var pressureLabel = "Pressure";
var windSpeedLabel = "Wind Speed";
var visibilityLabel = "Visibility";
