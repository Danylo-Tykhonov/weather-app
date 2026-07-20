import "./WeatherCard.css";

export default function WeatherCard({weather, selectedDay, setSelectedDay}) {
    
    const hourlyForecastInfo = weather.hourlyForecast.filter(hourly => hourly.fullTime.startsWith(selectedDay));

    return (
    <div className="card">

    <div className="card-icon">
        {weather.icon}
    </div>

    <h2 className="card-city">
        {weather.city}
    </h2>

    <p className="card-temperature">
        {weather.temperature}°C
    </p>

     <p className="card-feelsLike">
        Feels Like: {weather.feelsLike}°C
    </p>

    <p className="card-time">
        {weather.time}
    </p>

    <p className="card-timezone">
        {weather.timezone}
    </p>

    <p className="card-windSpeed">
        Wind Speed: {weather.windSpeed}km/h
    </p>

     <p className="card-humidity">
        Humidity: {weather.humidity}%
    </p>

        <h3>Today's forecast</h3>

    <div className="hourly">
        {hourlyForecastInfo.map(hour => (
    <div key={hour.fullTime}>
      <p>{hour.time}</p>
      <div>{hour.icon}</div>
      <p>{hour.temperature}°C</p>
    </div>
  ))}
</div>
        <h3>Weekly forecast</h3>

    <div className="daily">
        {weather.dailyForecast.map(daily => (
      <div className={`daily-time ${selectedDay === daily.time ? "active" : ""}`} key={daily.time} onClick={() => setSelectedDay(daily.time)}>
      <p>{daily.weekDay}</p>
      <div>{daily.icon}</div>
      <p>{daily.temperatureMin}/{daily.temperatureMax}°C</p>
    </div>
  ))}
</div>
</div>
    )
}