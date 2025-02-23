const Country = ({ country, showCountry }) => {
    return (
        <li>{country.name.common}&nbsp;
            <button onClick={() => showCountry(country.name.common)}>Show</button>
        </li>
    )
}

export default Country;