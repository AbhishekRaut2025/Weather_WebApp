let form = document.querySelector(".search-box");
let defaultCity = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let pressure = document.querySelector("#press");
let visibility = document.querySelector("#visible");
let windSpeed = document.querySelector("#wind");
let clouds = document.querySelector("#cloud");
let time1 = document.querySelector("#sunrise");
let time2 = document.querySelector("#sunset");
let feelsLike = document.querySelector("#feelsLike");
let min = document.querySelector("#min");
let max = document.querySelector("#max");
let gust = document.querySelector("#gust");
let datetime = document.querySelector(".datetime");
let defData;
let cityName;
let APIdata;

async function defaultt(){
    let defRawData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=c6c6ddb15be0efeaf596ff3d2b806426&units=metric`);
    defData = await defRawData.json();
    showData(defData);
}
defaultt();



form.addEventListener("submit", function(dets){
    dets.preventDefault();
    cityName = document.querySelector("#cityName").value.trim();
    if(cityName ===""){
        alert("please enter valid name")
    }else{

        async function getAPIdata() {
            let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c6c6ddb15be0efeaf596ff3d2b806426&units=metric`);
            APIdata = await raw.json();
            console.log(APIdata);
            showData(APIdata);
        }
        getAPIdata();
    }
})





function showData(data){
    defaultCity.textContent = data.name;
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    pressure.textContent = `🔼 Pressure: ${data.main.pressure} hPa`
    visibility.textContent = `🌫️ Visibility: ${data.visibility}m`
    windSpeed.textContent = `🌬️ Wind: ${Math.floor(data.wind.speed)} km/h`;
    feelsLike.textContent = `${Math.floor(data.main.feels_like)}°C`;
    min.textContent = `${Math.floor(data.main.temp_min)}°C`;
    max.textContent = `${Math.floor(data.main.temp_max)}°C`;
    gust.textContent = `${Math.floor(data.wind.gust)} km/h`;
    let cloudMessage = "";
    let cloudiness = data.clouds.all
    if (cloudiness < 20) {
        cloudMessage = "Clear skies ☀️";
    } else if (cloudiness < 60) {
        cloudMessage = "Partly cloudy ⛅";
    } else {
        cloudMessage = "Overcast ☁️";
    }
    clouds.textContent = cloudMessage;

    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    time1.textContent = `🌅 Sunrise: ${sunriseTime}`;
    time2.textContent = `🌇 Sunset: ${sunsetTime}`

    // updae time
    const APItime = data.dt;
    console.log(APItime+600);
    const time = new Date(APItime * 1000);
    const formats = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12 : true
    }
    const finalTime = time.toLocaleString('en-US', formats);
    datetime.textContent = finalTime.replace(',',' -');
    datetime.textContent = finalTime.replace('at',' ,');
}



// console.log(pressuree)






