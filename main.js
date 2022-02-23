const api={
    key: "6a1f9b561e40e3aa82ed26dec910dafc",
    baseurl: "http://api.openweathermap.org/data/2.5/"
}

const searchBox=document.querySelector('.search-box')
searchBox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if (evt.keyCode === 13){
       getResults(searchBox.value);
       //console.log(searchBox.value) 
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather =>{
            return weather.json()
        }).then(displayResults)
}

function displayResults(weather){
    console.log(weather)
    let city = document.querySelector('.location .city');
    city.innerText= `${weather.name},${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    let weather_at = document.querySelector('.current .weather');
    weather_at.innerText = weather.weather[0].main

    let hilow = document.querySelector('.current .hi-low')
    hilow.innerText  = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`

    let humiditi = document.querySelector('.current .humidity')
    humiditi.innerText = `Humidity: ${Math.round(weather.main.humidity)}%`

    let wind = document.querySelector('.current .wind-speed')
    wind.innerText = `Wind: ${Math.round(weather.wind.speed)} km/h`

    if (weather_at.textContent == 'Haze'){
        document.body.style.backgroundImage = 'url("images/Haze.jpg")';
    }
    else if (weather_at.textContent == 'Clear'){
        document.body.style.backgroundImage = 'url("images/clear.jpg")';
    }
    else if (weather_at.textContent == 'Sunny'){
        document.body.style.backgroundImage = 'url("images/sunny.jpg")';
    }
    else if (weather_at.textContent == 'Rain'){
        document.body.style.backgroundImage = 'url("images/rainy.jpg")';
    }
    else if (weather_at.textContent == 'Clouds'){
        document.body.style.backgroundImage = 'url("images/cloudy.jpg")';
    }
    else if (weather_at.textContent == 'Smoke'){
        document.body.style.backgroundImage = 'url("images/smoke.jpg")';
    }
    else if (weather_at.textContent == 'Snow'){
        document.body.style.backgroundImage = 'url("images/snow.jpg")';
    }

}

function dateBuilder(d){
    let months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November','December']

    //let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    //let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`
}
