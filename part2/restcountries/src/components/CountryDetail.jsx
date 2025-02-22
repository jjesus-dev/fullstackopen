const CountryDetail = ({ countries }) => {
    if (countries !== null && countries.length === 1) {
        return (
            <>
                <div>
                    <h2>{countries[0].name.common}</h2>
                    <p>Capital: {countries[0].capital}</p>
                    <p>Area: {countries[0].area}</p>
                </div>
                <div>
                    <h3>Languajes</h3>
                    <ul>
                        {Object.entries(countries[0].languages)
                            .map(([key, value]) => (
                                <li key={key}>{value}</li>
                            ))
                        }
                    </ul>
                    <img src={countries[0].flags.png} alt="country flag" />
                </div>
            </>
        )
    }
    
    return (null);
}

export default CountryDetail;