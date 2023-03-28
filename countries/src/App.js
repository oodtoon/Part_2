import { useState, useEffect } from "react";
import axios from "axios";
import mockResponse from "./services/mock-response.json";
import weatherService from "./services/weather"

const Countries = (props) => {
  return (
    <>
      <li>
        {props.country.name.common}
        <button value={props.country.name.official} onClick={props.show}>
          Show
        </button>
      </li>
      <li>
        {props.country.name.official}
        <button value={props.country.name.official} onClick={props.show}>
          Show
        </button>
      </li>
    </>
  );
};

const Languages = ({ languages }) => {
  console.log("I speak", Object.values(languages));

  return (
    <>
      {Object.values(languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </>
  );
};

const FinalCountry = (props) => {
  console.log("The final", [props.country]);
  return (
    <>
      <h2>{props.country.name.common} ({props.country.name.official})</h2>

      <div>capital: {props.country.capital}</div>
      <div>area: {props.country.area}</div>
      <br />
      <h3>Languages:</h3>
      <ul>
        <Languages languages={props.country.languages} />
      </ul>
      <div>
        <img src={props.country.flags.png} alt={props.country.name.common} />
      </div>
    </>
  );
};

const CountryList = ({ countryCount, matchingCountries, handleShow }) => {
  console.log("remaining countries", countryCount);
  if (countryCount > 10) {
    return <div>There are too many matches. Please specify further</div>;
  } else if (countryCount < 11 && countryCount > 1) {
    console.log("match this!", matchingCountries);
    return (
      <>
        <ul id="country-list">
          {matchingCountries.map((country) => (
            <Countries
              key={country.name.common}
              country={country}
              show={handleShow}
            />
          ))}
        </ul>
      </>
    );
  }
  return (
    <>
      {matchingCountries.map((country) => (
        <FinalCountry key={country.name.common} country={country} />
      ))}
    </>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log("effect");
    // TODO: Exract later
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        console.log("promise fulfilled", mockResponse);
        setCountries(response.data);
      })
      .catch(() => {
        setCountries(mockResponse);
      });
  }, []);

  useEffect (() => {
    if (foundCountry) {
      console.log(foundCountry)
      weatherService
      .getWeather(foundCountry.capital)
    }
  }, [foundCountry])



  const matchingCountries = countries.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(foundCountry.toLowerCase()) ||
      country.name.official.toLowerCase().includes(foundCountry.toLowerCase())
    );
  });

  const handleFilterChange = (event) => {
    setFoundCountry(event.target.value);
  };

  const handleShow = (e) => {
    setFoundCountry(e.target.value);
    weatherService
    .getWeather(e.target.value)
    .then(response => console.log(response.data))
  };

  return (
    <div>
      <form>
        find countries <input type="text" onChange={handleFilterChange} />
      </form>
      <CountryList
        countryCount={matchingCountries.length}
        matchingCountries={matchingCountries}
        handleShow={(e) => handleShow(e)}
      />
    </div>
  );
}

export default App;
