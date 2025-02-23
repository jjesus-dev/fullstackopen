import { useState, useEffect } from 'react'

import countryService from './services/countries';
import CountryDetail from './components/CountryDetail';
import Content from './components/Content';
import Search from './components/Search';

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

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
    console.log('Busqueda: ', searchValue);

    if(searchValue !== '') {
      const countriesToShow = countries.filter(
        country => country.name.common.toLowerCase()
        .includes(searchValue.toLowerCase())
      );

      setFilteredCountries(countriesToShow);
    } else {
      setFilteredCountries([]);
    }
  }

  const showCountryInfo = (name) => {
    console.log(name);
    const countryInfo = countries.filter(
      country => country.name.common.toLowerCase()
      .includes(name.toLowerCase())
    );
    
    setFilteredCountries(countryInfo);
    setSearch(name);
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
    </>
  )
}

export default App
