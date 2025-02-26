import { useState, useEffect } from 'react'

import weatherService from './services/weather';
import countryService from './services/countries';
import CountryDetail from './components/CountryDetail';
import CountryWeather from './components/CountryWeather';
import Content from './components/Content';
import Search from './components/Search';

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(allCountries => {
        setCountries(allCountries);
      });
  }, []);
  
  const handleCountryChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    searchCountries(newSearch);
  }

  const searchCountries = (searchValue) => {
    // console.log('Busqueda: ', searchValue);

    if (searchValue !== '') {
      const countriesToShow = countries.filter(
        country => country.name.common.toLowerCase()
        .includes(searchValue.toLowerCase())
      );

      setFilteredCountries(countriesToShow);
      fetchCountryWeather(countriesToShow);
    } else {
      setFilteredCountries([]);
      setWeather(null);
    }
  }

  const showCountryInfo = (name) => {
    const countryInfo = countries.filter(
      country => country.name.common.toLowerCase()
      .includes(name.toLowerCase())
    );
    
    setFilteredCountries(countryInfo);
    setSearch(name);

    fetchCountryWeather(countryInfo);
  }

  const fetchCountryWeather = (countries) => {
    if (countries.length === 1) {
      let [latitude = 0, longitude = 0] = countries[0].capitalInfo.latlng;
     
      weatherService.getWeather(latitude, longitude)
      .then(weatherInfo => {
        setWeather(weatherInfo);
      });
    } else {
      setWeather(null);
    }
  }


  return (
    <>
      <h1>Countries App</h1>
      <div>
        <form>
          <Search filter={search} onChangeFilter={handleCountryChange} />
        </form>
      </div>
      <div>
        <Content countries={filteredCountries} 
          showCountryInfo={showCountryInfo} />
      </div>

      <CountryDetail countries={filteredCountries} />

      <CountryWeather weatherInfo={weather} />
    </>
  )
}

export default App
