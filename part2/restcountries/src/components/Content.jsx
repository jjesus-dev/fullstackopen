import Country from "./Country"

const Content = (props) => {
    const count = props.countries.length;

    if (count === 1) {
        return null;
    } else if (count >= 1 && count <= 10) {
        return (    
            <ol>
            {props.countries.map(country => 
                <Country country={country}
                    key={country.cca2}
                    showCountry={props.showCountryInfo} />
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