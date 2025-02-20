import { useState, useEffect } from 'react'

import countryService from './services/countries';
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
        <Content countries={filteredCountries} />
      </div>
    </>
  )
}

export default App
