
"use strict";
// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?id=593116&units=metric&APPID=d9443486c1295255ac720b15d777bef9', true)

request.onload = function() {
// Begin accessing JSON data here
    var data = JSON.parse(this.response)
    // console.log(data);

    //get current weather 
    let current = data.list[0];
    // console.log(current);

    //get current weather temperature
    let current_temp = current.main['temp'];
    // console.log(current_temp);
    document.querySelector('.temp-now').innerHTML=current_temp.toFixed(0)+'&#8451';

    //get current weather description and icon
    let current_desc = current.weather[0];

    //get current weather icon
    document.querySelector('.weather-icon-now').src = 'http://openweathermap.org/img/wn/'+current_desc.icon+'@2x.png';

    //get current weather description
    document.querySelector('.weather-description').innerHTML = current_desc.main;

    //get location name
    let location = data.city['name'];
    // console.log(location);
    document.querySelector('.town').innerHTML = location;

    //get all weather
    let list=data.list;
    // console.log(list);

    //get 5 days information
    let weekday=[];
    let tempMin=[];
    let tempMax=[];
    let weatherIcon=[];
    for(let i=0; i<list.length; i += 8){
        // change unix timestamp (dt) to weekday name
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
        let dayNum = new Date(list[i].dt * 1000).getDay();
        let dayName = days[dayNum];
        weekday.push(dayName);

        //get min temperatute
        let dayWeather=list[i].main;
        let dayTempMin=dayWeather['temp_min'];
        tempMin.push(dayTempMin);

        //get max temperatute
        let dayTempMax=dayWeather['temp_max'];
        tempMax.push(dayTempMax);

        //get weather icon
        let weekWeatherArr=list[i].weather;
        // console.log(weekWeatherArr);
        let weekIcon=weekWeatherArr[0].icon;
        // console.log(weekIcon);
        weatherIcon.push(weekIcon);
    }

    // console.log(weekday);
    // console.log(tempMin);
    // console.log(tempMax);
    // console.log(weatherIcon);
    
    //get each div with week day name. return nodelist
    let dayEl=document.querySelectorAll('.day-name');
    //nodelist to array
    let dayArr=Array.prototype.slice.call(dayEl);
    // console.log(dayArr);

    //get each element with weekdays icons
    let dayIconEl=document.querySelectorAll('.weather-icon');
    let dayIconArr=Array.prototype.slice.call(dayIconEl);

    //get each element with weekdays max temp
    let maxTempEl=document.querySelectorAll('.max-temp');
    let maxTempArr=Array.prototype.slice.call(maxTempEl);

    //get each element with weekdays min temp
    let minTempEl=document.querySelectorAll('.min-temp');
    let minTempArr=Array.prototype.slice.call(minTempEl);

    // for every week day insert current situation
    for(let i=0 ; i<dayArr.length; i++){
        // insert day name
        dayArr[i].innerHTML=weekday[i];
        //insert weather icon
        dayIconArr[i].src='http://openweathermap.org/img/wn/'+weatherIcon[i]+'@2x.png';
        //insert max temp
        maxTempArr[i].innerHTML=tempMax[i].toFixed(0)+'&#8451';
        //insert min temp
        minTempArr[i].innerHTML=tempMin[i].toFixed(0)+'&#8451';
    }
}

// Send request
request.send();