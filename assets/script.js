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

function forecast(cityname){
    var forecastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityname+"&appid="+APIKey;
    $.ajax({
        url:forecastURL,
        method:"GET"
    }).then(function(res){
        
        for (i=0;i<5;i++){
            var day= new Date((res.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var kel= res.list[((i+1)*8)-1].main.temp;
            var far=(((kel-273.5)*1.80)+32).toFixed(2);
            var humid= res.list[((i+1)*8)-1].main.humidity;
        
            $("#futureDay"+i).html(day);
            $("#futureTemp"+i).html(far);
            $("#futureHumid"+i).html(humid+"%");
        }
        
    });

}
$("#search-button").on("click",weatherResult);