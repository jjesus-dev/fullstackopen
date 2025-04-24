const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>Not Found...</div>
    )
  }

  return (
    <div>
      <h3>{country.data.name}</h3>
      <div>Capital {country.data.capital}</div>
      <div>Population {country.data.population}</div>
      <img src={country.data.flag}
        height='100'
        alt={`Flag of ${country.data.name}`} />
    </div>
  )
}

export default Country