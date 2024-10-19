const windspeed = document.querySelector(".windspeed");
const pressure = document.querySelector(".Pressure");
const Humidity = document.querySelector(".Humidity");
const indoor = document.querySelector(".indoor");
const UV_index = document.querySelector(".UV_index");
const Gusts = document.querySelector(".Gusts");
const Wind_deg = document.querySelector(".Wind_deg");
const Visibility = document.querySelector(".Visibility");
const cloud = document.querySelector(".cloud");
const dew = document.querySelector(".dew");
const search_button = document.querySelector(".search_button");
const inputcity = document.querySelector("#input_city");
const temperature = document.querySelector(".top_reading p");
const weather = document.querySelector(".bottom_weather p");
const realfeel = document.querySelector(".realfeel p");
const time = document.querySelector(".time");
const nav_city = document.querySelector(".city");
const nav_temp = document.querySelector(".temp");
const nav_icons = document.querySelectorAll(".nav_icons ul li ");
const aqi=document.querySelector(".aqi_number h3");
const aqi_status=document.querySelector(".aqi_status");
const aqi_status_des=document.querySelector(".aqi_sat_about");
const weather_img=document.querySelector(".top_reading img");
console.log(aqi_status);
console.log(aqi_status_des);

let temp_data = [];
const x=[];
console.log(nav_icons)

async function disp_weather(city) {
    const api_key = "b0dd04d2e7fb1ca25413acf6bcb0c143"
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    const data = await fetch(api_url);
    const weather_data = await data.json();
    console.log(weather_data);

    nav_city.innerText = `${weather_data.name}`
    nav_temp.innerText = `${Math.floor((weather_data.main.temp) - 273)}°C`
    windspeed.innerText = `${weather_data.wind.speed} Km/Hr`;
    temperature.innerText = `${Math.floor((weather_data.main.temp) - 273)}°C`;
    pressure.innerText = `↓ ${weather_data.main.pressure} mb`;
    Humidity.innerText = `${weather_data.main.humidity} %`;
    Gusts.innerText = `${weather_data.wind.gust} Km/Hr`;
    weather.innerText = `${weather_data.weather[0].main}`
    realfeel.innerText = `Feels Like: ${Math.floor((weather_data.main.feels_like) - 273)}°C`

    if(weather_data.weather[0].main==='Rain'){
        weather_img.src='rain.png';
    }
    else if(weather_data.weather[0].main==='Clear'){
        weather_img.src='sun.png';
    }
    else if(weather_data.weather[0].main==='Haze'){
        weather_img.src='haze.png'
    }
    else if(weather_data.weather[0].main==='Thunderstorm'){
        weather_img.src='storm.png'
    }

    if (weather_data.wind.gust === undefined) {
        Gusts.innerText = "Data Not Available"
    }
    Visibility.innerText = `${(weather_data.visibility) / 1000} Km`;

    Wind_deg.innerText = `${weather_data.wind.deg}°`;
    cloud.innerText = `${weather_data.clouds.all} %`;
    const lat = weather_data.coord.lat;
    const lon = weather_data.coord.lon;
    console.log(lat, lon);
    if (weather_data.weather[0].main === "Thunderstorm") {
        document.body.style.backgroundImage = "linear-gradient(to right, #243949 0%, #517fa4 100%)"
        document.querySelector(".weather_card").style.color = "white";
        // document.querySelectorAll(".nav_icons ul li a").style.color = "white";
    }
    if (weather_data.weather[0].main === "Clear") {
        document.body.style.backgroundImage = "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
    }
    if (weather_data.weather[0].main === "Haze") {
        document.body.style.backgroundColor = "background-color: #E4E4E1";
        document.body.style.backgroundImage = "radial-gradient(at top center, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.03) 100%), linear-gradient(to top, rgba(255,255,255,0.1) 0%, rgba(143,152,157,0.60) 100%)";
        document.body.style.backgroundBlendMode = "normal, multiply";
        document.querySelector(".weather_card").style.color = "black";

    }
    if (weather_data.weather[0].main == "Clouds") {
        document.body.style.backgroundImage = "linear-gradient(to top, #6a85b6 0%, #bac8e0 100%)"
        document.querySelector(".weather_card").style.color = "white";
        // document.querySelectorAll(".nav_icons ul li a").style.color = "white";
    }
    if (weather_data.weather[0].main == "Rain") {
        document.body.style.backgroundImage = "linear-gradient(to top, #30cfd0 0%, #330867 100%)"
        document.querySelector(".weather_card").style.color = "white";
        // document.querySelectorAll(".nav_icons ul li a").style.color = "white";
    }
    air_quality(lat,lon)
    disp_weather_2(lat, lon);
}
async function disp_weather_2(lat, lon) {
    const api_key = "ef16c764a8ea48eb8b0111d8306fda8a"
    const api_url = `http://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}6&lon=${lon}&key=${api_key}&hours=48`
    const data = await fetch(api_url);
    const weather_data2 = await data.json();
    const weather_tab_data = weather_data2.data;

    console.log(typeof weather_tab_data);
    if (weather_data2.data[0].uv >= 0 && weather_data2.data[0].uv < 3) {
        UV_index.innerText = `${weather_data2.data[0].uv} LOW`;
    }
    else if (weather_data2.data[0].uv >= 3 && weather_data2.data[0].uv < 6) {
        UV_index.innerText = `${weather_data2.data[0].uv} MODERATE`;
    }
    else if (weather_data2.data[0].uv >= 6 && weather_data2.data[0].uv < 8) {
        UV_index.innerText = `${weather_data2.data[0].uv} HIGH`;
    }
    else if (weather_data2.data[0].uv >= 8 && weather_data2.data[0].uv < 11) {
        UV_index.innerText = `${weather_data2.data[0].uv} VERY HIGH`;
    }
    else UV_index.innerText = `${weather_data2.data[0].uv} EXTREME`;
    dew.innerText = `${weather_data2.data[0].dewpt}°C`;

    // console.log(weather_data2);
    // console.log(weather_tab_data);
    // weather_tab_data.forEach(function (data) {
    //     temp_data.push(data.app_temp);
    // });
    
}
async function air_quality(lat,lon) {
    
    const api_key = "ef16c764a8ea48eb8b0111d8306fda8a"
    const api_url=`https://api.weatherbit.io/v2.0/forecast/airquality?lat=${lat}&lon=${lon}&key=${api_key}`
    const data= await fetch(api_url);
    const aq_data=await data.json();
    console.log(aq_data);
    const aqi_data=aq_data.data;
    console.log(aqi_data)
    aqi_data.forEach(function(data){
        x.push(data.aqi)
    })
    const co=aqi_data[1].co;
    const no2=aqi_data[1].no2;
    const o3=aqi_data[1].o3;
    const pm10=aqi_data[1].pm10;
    const pm25=aqi_data[1].pm25;
    const so2=aqi_data[1].so2;

    aqi.innerText=`${aqi_data[0].aqi}`

    if(aqi_data[0].aqi>=0 && aqi_data[0].aqi<20){
        aqi_status.innerText="Excellent"
        aqi_status_des.innerText="The air quality is ideal for most individuals; enjoy your normal outdoor activities.";
    }
    else if(aqi_data[0].aqi>=20 && aqi_data[0].aqi<50){
        aqi_status.innerText="Fair";
        aqi_status_des.innerText="The air quality is generally acceptable for most individuals. However, sensitive groups may experience minor to moderate symptoms from long-term exposure.";
    }
    else if(aqi_data[0].aqi>=50 && aqi_data[0].aqi<100){
        aqi_status.innerText="Poor";
        aqi_status_des.innerText="The air has reached a high level of pollution and is unhealthy for sensitive groups. Reduce time spent outside if you are feeling symptoms such as difficulty breathing or throat irritation.";
    }
    else if(aqi_data[0].aqi>=100 && aqi_data[0].aqi<150){
        aqi_status.innerText="Unhealthy"
        aqi_status_des.innerText="Health effects can be immediately felt by sensitive groups. Healthy individuals may experience difficulty breathing and throat irritation with prolonged exposure. Limit outdoor activity.";
    }
    else if(aqi_data[0].aqi>=150 && aqi_data[0].aqi<250){
        aqi_status.innerText="Very Unhealthy"
        aqi_status_des.innerText="Health effects will be immediately felt by sensitive groups and should avoid outdoor activity. Healthy individuals are likely to experience difficulty breathing and throat irritation; consider staying indoors and rescheduling outdoor activities.";

    }
    else if(aqi_data[0].aqi>=250){
        aqi_status.innerText="Dangerous"
        aqi_status_des.innerText="Any exposure to the air, even for a few minutes, can lead to serious health effects on everybody. Avoid outdoor activities."
    }

    console.log(x)
    const ctx = document.getElementById('myChart');

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: aqi_data.map((_, index) => `${index + 1}`),
            datasets: [{
              label: 'AQI',
              data: x,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                
                beginAtZero: true,
                grid:{
                    display:false
                }
              },
              x:{
                grid:{
                    display:false
                }
              }
            }
          }
        });
        const pie = document.getElementById('pie');

        new Chart(pie, {
          type: 'pie',
          data: {
            labels: ['CO', 'NO2', 'O3', 'PM10', 'PM25', 'SO2'],
            datasets: [{
              label: ` Concentration(in mg)`,
              data: [co, no2, o3, pm10, pm25, so2],
              borderWidth: 1
            }]
          },
          options: {
            animation:{
                duration: 3000,
                easing: 'easeInQuart'
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      
}

search_button.addEventListener('click', () => {
    const city = inputcity.value;
    console.log(city);
    disp_weather(city);
})

setInterval(() => {
    const date = new Date();
    const time_data = date.toLocaleTimeString();
    time.innerText = time_data;
}, 1000)







