import { useState, useEffect } from "react"
import axios from "axios"

const Filter = ( {value, onChange} ) => (
  <div>
    find countries <input
      value={value}
      onChange={onChange}/>
  </div>
)

const DisplayCountry = ({country}) => {
  console.log("lang", country.languages);
  Object.entries(country.languages).map(([lang, language]) => console.log(lang, language))
  return (
    <div>
      <h1>{country.name.common} (a.k.a. {country.name.official})</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}m<sup>2</sup></div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([langCode, language]) => <li key={langCode}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} width="200" alt="country flag" />
    </div>
  )
}

const Results = ({countries, countryFilter}) => {
  // If no search query
  if (countryFilter === '') {
    return <div>Enter a Search...</div>
  }

  const filteredCountries = countryFilter
    ? countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
    : countries

  const returnedCountries = filteredCountries.length

  if (returnedCountries > 10) {
    return <div>Too many matches, narrow your search criteria</div>
  }

  if (returnedCountries > 1 && returnedCountries < 10) {
    return (
      <>
        {filteredCountries.map(country => <div key={country.cca3}>{country.name.common}</div> )}
      </>
    )
  }

  if (returnedCountries === 1) {
    return <DisplayCountry country={filteredCountries[0]} />
  }

  return (
    <div>No Countries match your criteria</div>
  )
  
}


const App = () => {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  

  return (
    <div>
      <Filter value={countryFilter} onChange={handleFilterChange} />
      <Results countries={countries} countryFilter={countryFilter} />
    </div>
  )
}

export default App
