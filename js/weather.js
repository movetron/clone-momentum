const city = document.querySelector('.city')
const weatherIco = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind');
const weatherErr = document.querySelector('.weather-error')



async function getWeather() {
  try {
    const cityValue = city.value.trim(); 
    if (!cityValue) {
      throw new Error('City is empty');
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&units=metric&appid=3b7104992b88be72112fac9a4857fb18`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.weather && data.weather.length > 0) {
      weatherIco.className = 'weather-icon owf';
      weatherErr.textContent = ''
      weatherIco.classList.add(`owf-${data.weather[0].id}`)
     
       
    
       
          temperature.textContent = Math.round(data.main.temp) + '°C',
         weatherDescription.textContent = data.weather[0].description
      windSpeed.textContent = `${dictionary.en.weather.wind}: ${Math.round(data.wind.speed)} m/s`
      humidity.textContent = `${dictionary.en.weather.humidity}: ${data.main.humidity}%`
      
    
  } else {
    throw new Error('Weather data not found');
  }
  } catch (e) {
    weatherErr.textContent = 'Error 404 Not found'
    temperature.textContent = '',
      weatherDescription.textContent = ''
    windSpeed.textContent = ''
    humidity.textContent = ''
  }
}


function setCity() {
  const cityValue = city.value.trim(); 
  if (cityValue) {
    localStorage.setItem('city', cityValue);
  }
}



function getCity() {
  const storedCity = localStorage.getItem('city');
  if (storedCity) {
    city.value = storedCity;
  } else {
    city.value = 'Краснодар'; 
  }
  getWeather(); 
}


window.addEventListener('beforeunload', setCity)
window.addEventListener('load', getCity)
city.addEventListener('input', setCity); 
city.addEventListener('change', getWeather)
