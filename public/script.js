const city = document.querySelector('.name');
const form = document.querySelector("form");
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const valueSearch = document.getElementById('name');
const clouds = document.getElementById('clouds');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const main = document.querySelector('main');

form.addEventListener("submit", (e) => {
    e.preventDefault();  
    if(valueSearch.value != ''){
        searchWeather();
    }
});

const searchWeather = () => {
    const place = valueSearch.value
    const url = `/api/weather?city=${place}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.cod == 200){
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                temperature.querySelector('span').innerText = data.main.temp;
                description.innerText = data.weather[0].description;

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            }else{
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
}

const initApp = () => {
    valueSearch.value = 'New Delhi';
    searchWeather();
}
initApp();
