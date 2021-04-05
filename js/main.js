window.onload = init;

function init(){

    //units
    celciusUnit = "C°";
    farenheitUnit = "F°";
    celcius = "metric";
    farenheit = "imperial";

    //unit details for the conversion
    unitBtn = document.getElementById("convert-units-btn");
    unit = document.getElementById("unit");
    unit.style.display = "none";

    //setting default weather 
    getWeatherApiData(city, celcius);

    //Weather labels and providing label values
    var feelsLike_Label = document.getElementById("feelsLikeLabel");
    feelsLike_Label.innerText = feelsLikeLabel;

    var humidity_Label = document.getElementById("humidityLabel");
    humidity_Label.innerText = humidityLabel;

    var pressure_Label = document.getElementById("pressureLabel");
    pressure_Label.innerText = pressureLabel;

    var windSpeed_Label = document.getElementById("windSpeedLabel");
    windSpeed_Label.innerText = windSpeedLabel;

    var visibility_Label = document.getElementById("visibilityLabel");
    visibility_Label.innerText = visibilityLabel;

}

//function to get the weather api data
function getWeatherApiData(cityValue, unitValue){

    /*  */

    //fetch data from url
    fetch(webServerURL + cityValue + '&appid=' + weatherKey + '&units=' + unitValue)
    /* The response of a fetch() request is a Stream object, which means that when we call the json() method, 
    a Promise is returned since the reading of the stream will happen asynchronously. */
    //converting to json
    .then(x => x.json())
    //getting data 
    .then(data => {

        if (unitValue == celcius){
            unitBtn.innerText = celciusUnit;
            unit.innerText = celciusUnit;
        } else {
            unitBtn.innerText = farenheitUnit;
            unit.innerText = farenheitUnit;
        }

        try {
                //display temperature on screen
                var temperature = document.getElementById("temperature");
                temperature.innerText = data.main.temp + "\u00B0";

                //display city on screen
                var cityDiv = document.getElementById("cityDiv");
                cityDiv.innerText = data.name;

                //display city and country on screen
                var cityCountry = document.getElementById("cityCountry");
                cityCountry.innerText = data.name + ", " + data.sys.country;
            

                //display description image of weather on screen
                var descImage = document.getElementById("descImage");
                descImage.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";

                //display weather description on screen
                var description = document.getElementById("description");
                description.innerText = data.weather[0].description;

                //getting extra weather details of the city

                //display temperature feels like on screen
                var feelsLike = document.getElementById("feelsLike");
                feelsLike.innerText = data.main.feels_like + "\u00B0";

                //display humidity on screen
                var humidity = document.getElementById("humidity");
                humidity.innerText = data.main.humidity + "%";

                //display pressure on screen
                var pressure = document.getElementById("pressure");
                pressure.innerText = data.main.pressure + "mb";

                //display visibility on screen
                var visibility = document.getElementById("visibility");
                visibility.innerText = data.visibility;

                //display wind speed on screen
                var windSpeed = document.getElementById("windSpeed");
                windSpeed.innerText = data.wind.speed + "mph";
          }
          catch(err) {

                //if not then display the error message (i.e. No matching location found!)
                var errorSpan = document.getElementById("errorSpan");
                errorSpan.style.display = "block";
                errorSpan.innerText = errorResult;

                //hide message after 2 seconds
                setTimeout(function(){
                    errorSpan.innerHTML="";
                },2000);
        }

    }) 
}

//function to get the city weather searched by the user
function getCityWeather(){

    //getting the search input value
    inputCity = document.getElementById("city");
    var searchCity = inputCity.value;

    //if search is not empty
    if(searchCity != ''){

        //if searching country length is less more than 3
        if(searchCity.length > 3){
            //fetching Weather Data - calling function
            getWeatherApiData(searchCity, celcius);     
        } else {

            //if not then display the error message (i.e. No matching location found!)
            var errorSpan = document.getElementById("errorSpan");
            errorSpan.style.display = "block";
            errorSpan.innerText = errorResult;

            //hide message after 2 seconds
            setTimeout(function(){
                errorSpan.innerHTML="";
            },2000);
        }
    }
    else{
        //display error message if empty
        errorSpan.style.display = "block";
        errorSpan.innerText = errorResult;

        //hide error message after 2 seconds
        setTimeout(function(){
            errorSpan.innerHTML="";
        },2000);
    }

    //clear the search city form 
    document.getElementById("form").reset();
}

 //function to change or convert the data according to the units i.e. Celcius or Farenhite
 function convertUnit(cityValue,unitValue){

    //if unit is Celcius convert it into Farenhite
    if(unitValue == celciusUnit){
        unit.innerText = farenheitUnit;
        unitBtn.innerText = farenheitUnit;
        getWeatherApiData(cityValue, farenheit);
    }

    //if unit is Farenhite convert it into Celcius
    if(unitValue == farenheitUnit){
        unit.innerText = celciusUnit;
        unitBtn.innerText = celciusUnit;
        getWeatherApiData(cityValue, celcius);
    }
}
