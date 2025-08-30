 // toggel button code dark aur light mode ka 
 const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light');
            body.classList.toggle('dark');
        });


 // async await ka use krege api se data fetch krne ke liye 

async function getweather() {
    let searchInt = document.getElementById('search-input').value;
    let apiKey = "2b40879e6768a305d293a7a03d0b9b0e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInt}&appid=${apiKey}&units=metric`;

    // try aur catch ka use krke ham erro aur shi data nikalr ge 
    try {
        let response = await fetch(apiUrl)
        if (!response.ok) {
            alert("City not found");
            return
        }
            let data = await response.json(); // yha jason format me convert kr rhe ahi 
            console.log(data);
            
        // ui me data show krege 
        document.querySelector('.temperature').innerHTML = `${data.main.temp}°C`;
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.condition').innerHTML = data.weather[0].description;

        // weather icon ko set krege 
         let iconCode = data.weather[0].icon;
         let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
         document.getElementById("weather-icon").src = iconUrl;

         // details ko show krege ui me 
         let detailBox = document.querySelectorAll('.detail-value');
         detailBox[0].innerHTML = `${data.main.humidity}%`;
         detailBox[1].innerHTML = `${data.wind.speed} km/h`;
         detailBox[2].innerHTML = `${data.main.pressure} hPa`;


    } catch (error) {
        console.error("Error:", error);
        
    }
    
}   

document.addEventListener("DOMContentLoaded", () => {
const searchBtn = document.getElementById('search-btn');
 // yha variable declear krege fir button pe click event lgyaeg
 searchBtn.addEventListener('click', function (e) {
      e.preventDefault(); // prevent form default submit
     let inputVal = document.getElementById('search-input').value.trim();

    // Empty check
    if (inputVal === "") {
        alert("Please enter a city name!");
        return;
    }

    // Number check (agar sirf number hai to alert de)
    if (!isNaN(inputVal)) {
        alert("City name cannot be a number!");
        return;
    }
    getweather();
 })

 //enter click pe search ke button ko click kr rhe ahi 
document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // prevent form default submit
                searchBtn.click();
            }
 });
        
 });