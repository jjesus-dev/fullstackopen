const CountryWeather = ({ weatherInfo }) => {
    if (weatherInfo !== null) {
        return (
            <>
                <div>
                    <h2>Weather in {weatherInfo.name}</h2>
                    <p>Temperature: {weatherInfo.main.temp} Celsius</p>
                    <p>Wind: {weatherInfo.wind.speed} m/s</p>

                    {weatherInfo.weather.map(w => {
                        const iconCode = w.icon;
                        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                        return <img src={iconUrl} alt="weather icon" key={w.id} />
                    })}
                </div>
            </>
        )
    }
    
    return (null);
}

export default CountryWeather;