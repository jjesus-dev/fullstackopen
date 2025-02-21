import Country from "./Country"
import CountryDetail from "./CountryDetail";

const Content = (props) => {
    const count = props.countries.length;

    if (count == 1) {
        return (
            <CountryDetail country={props.countries[0]} />
        )
    } else if (count >= 1 && count <= 10) {
        return (    
            <ol>
            {props.countries.map(country => 
                <Country name={country.name.common}
                    key={country.cca2} />
            )}
            </ol>
        )
    } else {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
}

export default Content;