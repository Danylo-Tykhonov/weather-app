import { useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import "./App.css"
import { WiDaySunny, WiCloud, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function onSearch() {
    setLoading(true);
    setError(null);

    try {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
    const data = await res.json();
    
      if(data.results.length === 0) {
        throw new Error("No data")
      }

      if(!res.ok) {
        throw new Error("City not found");
      }

    const { latitude: lat, longitude: long, timezone } = data.results[0];
    const weat = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=${timezone}`)
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
        city,
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


  return (
    <div className="app">
      <Search 
      city={city}
      setCity={setCity}
      onSearch={onSearch}
      loading={loading}
      />

      {weather && <WeatherCard weather ={weather} />}

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

    </div>
  )
}