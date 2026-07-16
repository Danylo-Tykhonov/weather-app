import { useEffect, useState } from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import "./App.css"
import { WiDaySunny, WiCloud, WiFog, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import getWeatherIcon from "./utilities/WeatherIcon";

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
    const weat = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,weather_code&timezone=${timezone}&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min`)
    const weat_data = await weat.json(); 

    if(!weat.ok) {
        throw new Error("City not found");
      }

      const weatherCode = weat_data.current.weather_code;

      const icon = getWeatherIcon(weatherCode);

      const today = weat_data.current.time.slice(0,10);

      const hourlyForecast = weat_data.hourly.time.map((time, index) => {
      return {
        fullTime: time,
        time: time.slice(11, 16),
        temperature: weat_data.hourly.temperature_2m[index],
        weatherCode: weat_data.hourly.weather_code[index],
        icon: getWeatherIcon(weat_data.hourly.weather_code[index])
      }
    })
      const hourlyForecastInfo = hourlyForecast.filter(hourly => hourly.fullTime.startsWith(today));

      const dailyForecast = weat_data.daily.time.map((time, index) => {
        const date = new Date(time);
        const weekDay = date.toLocaleDateString("en-US", {
          weekday: "short"
        })
        return {
          time,
          weekDay,
          temperatureMax: weat_data.daily.temperature_2m_max[index],
          temperatureMin: weat_data.daily.temperature_2m_min[index],
          weatherCode: weat_data.daily.weather_code[index],
          icon: getWeatherIcon(weat_data.daily.weather_code[index])
        }
      })

      const weatherInfo = {
        city: chosenCity.name,
        country: chosenCity.country,
        timezone,
        temperature: weat_data.current.temperature_2m,
        time: weat_data.current.time.slice(11,16),
        windSpeed: weat_data.current.wind_speed_10m,
        humidity: weat_data.current.relative_humidity_2m,
        feelsLike: weat_data.current.apparent_temperature,
        icon,
        hourlyForecastInfo,
        dailyForecast
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