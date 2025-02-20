import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
    const countries = axios.get(`${baseUrl}/all`);

    return countries.then(response => response.data);
}

const getCountry = (name) => {
    const country = axios.get(`${baseUrl}/name/${name}`);

    return country.then(response => response.data);
}

export default { getAll, getCountry }