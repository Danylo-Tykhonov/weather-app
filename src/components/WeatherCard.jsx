import "./WeatherCard.css";

export default function WeatherCard({weather}) {
    
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

</div>
    )
}