const CountryDetail = (props) => {
    return (
        <>
            <div>
                <h2>{props.country.name.common}</h2>
                <p>Capital: {props.country.capital}</p>
                <p>Area: {props.country.area}</p>
            </div>
            <div>
                <h3>Languajes</h3>
                <ul>
                    {Object.entries(props.country.languages)
                        .map(([key, value]) => (
                            <li key={key}>{value}</li>
                        ))
                    }
                </ul>
                <img src={props.country.flags.png} alt="country flag" />
            </div>
        </>
    )
}

export default CountryDetail;