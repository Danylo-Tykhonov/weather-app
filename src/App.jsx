import { useState } from "react";
import Search from "./components/Search";

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
    const weat = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m&timezone=${timezone}`)
    const weat_data = await weat.json(); 

    if(!weat.ok) {
        throw new Error("City not found");
      }
  
      const weatherInfo = {
        city,
        timezone,
        temperature: weat_data.hourly.temperature_2m[0],
        time: weat_data.hourly.time[0]  
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
    <div>
      <Search 
      city={city}
      setCity={setCity}
      onSearch={onSearch}
      loading={loading}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
    </div>
  )
}