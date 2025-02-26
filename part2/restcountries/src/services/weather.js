import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherKey = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (latitude, longitude) => {
     // metric = Celsius
    const weatherCondition = axios.get(`${baseUrl}?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${weatherKey}`);

    return weatherCondition.then(response => response.data);
}

export default { getWeather }