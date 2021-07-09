var city="";
var searchCity = $("#search-city");
var currCity = $("#current-city");
var currTemp = $("#temperature");
var currHumid= $("#humid");
var currWindSpeed=$("#wind-speed");
var searchButton = $("#search-button");


var APIKey="a0aca8a89948154a4182dcecc780b513";
function weatherResult(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);
    }

}
function currentWeather(city) {
    var URL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:URL,
        method:"GET",
    }).then(function(res){

        $(currCity).html(res.name);

        var tempF = (res.main.temp - 273.15) * 1.80 + 32;
        $(currTemp).html((tempF).toFixed(2));
        $(currHumid).html(res.main.humidity+"%");
        
        var windspeed=res.wind.speed;
        var wmph=(windspeed*2.237).toFixed(1);
        $(currWindSpeed).html(wmph+"mph");

    

    });

}
$("#search-button").on("click",weatherResult);