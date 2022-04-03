window.onload = init(); 

function init(){
    window.app = new App(); 
    app.getLocation(); 
}

function App(){
    this.lat; 
    this.lon;
    this.APIkey = '248d369aa6322178f4f2620b2da7f29c'; 
    this.UiSelectors = {
        weather: document.querySelector('[data-weather]'),
        weatherSpan: document.querySelector('[data-weather-span]'),
        weatherIcon: document.querySelector('[data-weather-icon]'),
        date: document.querySelector('[data-date]'),
        dateSpan: document.querySelector('[data-date-span]'),
        time: document.querySelector('[data-time]'),
        timeSpan: document.querySelector('[data-time-span]')
    }

    this.getLocation = function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lon = position.coords.longitude; 
                this.getWeatherData();
            })
        }
    }

    this.getWeatherData = function(){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.APIkey}`;
        
        fetch(url).then(re => {
            re.json().then(data => {
                this.updateWeatherData(data);
            })
        })
    }

    this.updateWeatherData = function(data){
        console.log(data.weather[0].icon);
        const temp = `${Math.round(data.main.temp)}°C`;
        const city = data.name;
        const img  = `img/weather/${data.weather[0].icon}.png`;
        
        this.UiSelectors.weatherIcon.remove();
        this.UiSelectors.weather.insertAdjacentHTML('beforeend','<img data-weather-img src="" alt="ikona aktualnej pogody"/>');
        this.UiSelectors.weatherImg = document.querySelector('[data-weather-img]'),
        this.UiSelectors.weatherSpan.innerHTML = `${city}: ${temp}`;
        this.UiSelectors.weatherImg.src = img; 
    }

    this.getDate = setInterval(() => {
        const date = new Date(); 
        const timeParms = [];
        const dateParms = [];  

        dateParms[0] = date.getFullYear();
        dateParms[1] = date.getMonth() + 1;
        dateParms[2] = date.getDate(); 

        dateParms.forEach((element, index) => {
            if(element<10){
                dateParms[index] = `0${dateParms[index]}`
            }
        });

        timeParms[0] = date.getSeconds();
        timeParms[1] = date.getMinutes(); 
        timeParms[2] = date.getHours(); 

        timeParms.forEach((element, index) => {
            if(element<10){
                timeParms[index] = `0${timeParms[index]}`
            }
        });

        this.UiSelectors.timeSpan.innerHTML = `${timeParms[2]}:${timeParms[1]}:${timeParms[0]}`
        this.UiSelectors.dateSpan.innerHTML = `${dateParms[2]}.${dateParms[1]}.${dateParms[0]}`
    },1000);
}