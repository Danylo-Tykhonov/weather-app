import "./WeatherCard.css";
import { WiStrongWind, WiHumidity, WiThermometer, WiWindy  } from 'react-icons/wi';

export default function WeatherCard({weather, selectedDay, setSelectedDay}) {
    
    const hourlyForecastInfo = weather.hourlyForecast.filter(hourly => hourly.fullTime.startsWith(selectedDay));

    return (
    <div className="card">

    <div className="card-icon">
        {weather.icon}
    </div>

    <p className="card-temperature">
        {weather.temperature}°C
    </p>

    <h2 className="card-city">
        {weather.city}
    </h2>

    <div className="sub-info">
        <div className="info-card">
            <WiThermometer/>
            <div>Feels Like</div>
            <div>{weather.feelsLike}°C</div>
        </div>
        <div className="info-card">
            <WiWindy/>
            <div>Wind</div>
            <div>{weather.windSpeed} km/h</div>
        </div>
        <div className="info-card">
            <WiHumidity/>
            <div>Humidity</div>
            <div>{weather.humidity}%</div>
        </div>
    </div>
        <h3>Today's forecast</h3>

    <div className="hourly">
        {hourlyForecastInfo.map(hour => (
    <div className="hourly-item" key={hour.fullTime}>
      <p>{hour.time}</p>
      <div>{hour.icon}</div>
      <p>{hour.temperature}°C</p>
    </div>
  ))}
</div>
        <h3>Weekly forecast</h3>

    <div className="daily">
        {weather.dailyForecast.map(daily => (
      <div className={`daily-item ${selectedDay === daily.time ? "active" : ""}`}  key={daily.time}  onClick={() => setSelectedDay(daily.time)}>
      <p>{daily.weekDay}</p>
      <div>{daily.icon}</div>
      <p>{daily.temperatureMin}/{daily.temperatureMax}°C</p>
    </div>
  ))}
</div>

    <div className="card-footer">
        <p>{weather.time}</p>
        <p>{weather.timezone}</p>
    </div>

</div>
    )}    