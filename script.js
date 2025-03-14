document.getElementById("weatherForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let city = document.getElementById("city").value;
    let apiKey = "108b142d121543448b154825251003";
    let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    
    let response = await fetch(apiUrl);
    let data = await response.json();
    
    document.getElementById("weatherData").innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <h3>${data.current.temp_c}&deg;C</h3>
        <p>${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}">
    `;
    let api2=`https://api.weatherapi.com/v1/forecast.json?key=${apiKey }&q=${city}&aqi=yes`
     let res1 = await fetch(api2);
       let data1=await res1.json();
    
       let hourlyHtml = "";
       data1.forecast.forecastday[0].hour.forEach((hour, index) => {
           if (index % 4 === 0) {  
               let timeParts = hour.time.split(" ")[1].split(":");
               let hours = parseInt(timeParts[0]);
               let minutes = timeParts[1];
               let amPm = hours >= 12 ? "PM" : "AM";
               hours = hours % 12 || 12;  
       
               hourlyHtml += `
                   <div class="col forecast-card">
                       <h5>${hours}:${minutes} ${amPm}</h5>
                       <img src="${hour.condition.icon}" alt="Weather">
                       <p>${hour.temp_c}&deg;C</p>
                   </div>
               `;
           }
       });
       
    document.getElementById("hourlyForecast").innerHTML = hourlyHtml;
    let api3 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`;
let res3 = await fetch(api3);
let data3 = await res3.json();

    
    let weeklyHtml = "";
    data3.forecast.forecastday.forEach(day => {
        weeklyHtml += `
            <div class="col forecast-card">
                <h5>${day.date}</h5>
                <img src="${day.day.condition.icon}" alt="Weather">
                <p>${day.day.condition.text}</p>
                <p>Max: ${day.day.maxtemp_c}&deg;C</p>
                <p>Min: ${day.day.mintemp_c}&deg;C</p>
            </div>
        `;
    });
    document.getElementById("weeklyForecast").innerHTML = weeklyHtml;
});