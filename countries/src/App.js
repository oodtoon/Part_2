import { useState, useEffect } from "react";
import axios from "axios";
import mockResponse from "./services/mock-response.json";
import weatherService from "./services/weather";

const Countries = (props) => {
  return (
    <>
      <li>
        {props.country.name.common}
        <button
          value={props.country.name.common}
          onClick={(e) => {
            props.show(e.target.value);
          }}
        >
          Show
        </button>
      </li>
      <li>
        {props.country.name.official}
        <button
          value={props.country.name.common}
          onClick={(e) => {
            props.show(e.target.value);
          }}
        >
          Show
        </button>
      </li>
    </>
  );
};

const Languages = ({ languages }) => {
  return (
    <>
      {Object.values(languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </>
  );
};

const FinalCountry = (props) => {
  return (
    <>
      <h2>
        {props.country.name.common} ({props.country.name.official})
      </h2>

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
      <div>
        <h2>Weather in {props.country.capital}</h2>
      </div>
      <div>Temperature: {props.celsius} C</div>
      <div>
        <img
          src={`https://openweathermap.org/img/wn/${props.weather.icon}@2x.png`}
          alt={props.weather.description}
        />
      </div>
      <div>{props.weather.description}</div>
      <div>wind: {props.wind} m/s</div>
    </>
  );
};

const CountryList = ({ countryCount, matchingCountries, handleShow }) => {
  if (countryCount > 10) {
    return <div>There are too many matches. Please specify further</div>;
  } else {
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
};

function App() {
  const [countries, setCountries] = useState([]);
  const [foundCountry, setFoundCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [wind, setWind] = useState("");
  const [matchingCountries, setMatchingCountries] = useState([]);

  const handleShow = (country) => {
    console.log("state", country);
    setFoundCountry(country);
    weatherService.getWeather(country).then((response) => {
      setTemp(response.data.main.temp);
      setWeather(response.data.weather[0]);
      setWind(response.data.wind.speed);
    });
  };

  const handleFilterChange = (event) => {
    setFoundCountry(event.target.value);
  };

  useEffect(() => {
    // TODO: Exract later
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch(() => {
        setCountries(mockResponse);
      });
  }, []);

  const celsiusTemp = (temp - 273.15).toFixed(2);

  useEffect(() => {
    setMatchingCountries(
      countries.filter((country) => {
        return (
          country.name.common
            .toLowerCase()
            .includes(foundCountry.toLowerCase()) ||
          country.name.official
            .toLowerCase()
            .includes(foundCountry.toLowerCase())
        );
      })
    );
  }, [countries, foundCountry]);

  useEffect(() => {
    if (matchingCountries.length === 1) {
      handleShow(matchingCountries[0].name.common);
    }
  }, [matchingCountries]);

  return (
    <div>
      <form>
        find countries <input type="text" onChange={handleFilterChange} />
      </form>
      {matchingCountries.length === 1 ? (
        <FinalCountry
          key={matchingCountries[0].name.common}
          country={matchingCountries[0]}
          celsius={celsiusTemp}
          weather={weather}
          wind={wind}
        />
      ) : (
        <CountryList
          countryCount={matchingCountries.length}
          matchingCountries={matchingCountries}
          handleShow={(e) => handleShow(e)}
          celsiusTemp={celsiusTemp}
          weather={weather}
          wind={wind}
        />
      )}
    </div>
  );
}

export default App;
