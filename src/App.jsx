import { useEffect, useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import "./App.css"
import { WiDaySunny, WiCloud, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

export default function App() {
  const [cityName, setCityName] = useState(""); //input text
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]); //city list
  const [chosenCity, setChosenCity] = useState(null); //picked city

  async function fetchWeather() {
    setLoading(true);
    setError(null);
    const { latitude, longitude, timezone } = chosenCity;

    if(!chosenCity) {
      return;
    }

    try {
    const weat = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=${timezone}`)
    const weat_data = await weat.json(); 

    if(!weat.ok) {
        throw new Error("City not found");
      }

      const weatherCode = weat_data.current.weather_code;

      let icon = null;

      switch (weatherCode) {
        case 0:
          icon = <WiDaySunny />;
          break;
      
        case 1:
        case 2:
        case 3:
          icon = <WiCloud />;
          break

        case 45:
        case 48:
          icon = <WiFog />;
          break;

        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
          icon = <WiRain />;
          break;

        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
          icon = <WiRain />;
          break;

        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
          icon = <WiSnow />;
          break;

        case 95:
        case 96:
        case 99:
          icon = <WiThunderstorm />;
          break;

        default:
          icon = "Unknown weather";
}

      const weatherInfo = {
        city: chosenCity.name,
        country: chosenCity.country,
        timezone,
        temperature: weat_data.current.temperature_2m,
        time: weat_data.current.time.slice(11,16),
        windSpeed: weat_data.current.wind_speed_10m,
        humidity: weat_data.current.relative_humidity_2m,
        feelsLike: weat_data.current.apparent_temperature,
        icon
      }

      setWeather(weatherInfo);
    } 
    
    catch (error) {
      setError(error.message);
    }

    finally {
      setLoading(false);
    }
  }

  async function searchCities() {
    
    try {
    if(cityName.length < 2) {
      setCities([]);
      return;
    }
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`);
    
    if(!res.ok) {
      throw new Error("Api failed")
    }
    
    const data = await res.json();
   
    if (!data.results) {
    setCities([]);
    return;
    }
      setCities(data.results);
    }
    catch(error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if(!chosenCity)
    searchCities();
  }, [cityName, chosenCity]);

  function selectCity(city) {
    setChosenCity(city);
    setCityName(city.name);
    setCities([]);
  }

useEffect(() => {
  if(chosenCity){
  fetchWeather();
  }
}, [chosenCity])

  return (
    <div className="app">
      <Search 
      cityName={cityName}
      setCityName={setCityName}
      fetchWeather={fetchWeather}
      loading={loading}
      cities={cities}
      selectCity={selectCity}
      setChosenCity={setChosenCity}
      />

      {weather && <WeatherCard weather ={weather} />}

    </div>
  )
}