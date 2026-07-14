import "./Search.css"

export default function Search({cityName, setCityName, fetchWeather, loading, cities, selectCity, setChosenCity}){
    return(
        <div className="search">
            <input 
            className="search-input"
            value={cityName}
            onChange={(e) => {
                setCityName(e.target.value)
                setChosenCity(null);
            }}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                     fetchWeather();
                }
             }}
        />
    {cities.length > 0 && (
        <div className="search-results">
            {cities.map((city) => (
                <div
                    key={city.id}
                    className="search-item"
                    onClick={() => selectCity(city)}>
                    <strong>{city.name}</strong>
                    <span>
                        {city.admin1 ? ` ${city.admin1}` : ""}
                        {city.country ? `, ${city.country}` : ""}
                    </span>
                </div>
            ))}
        </div>
    )}
         <button className="search-button" onClick={fetchWeather} disabled={cityName.trim() ===   "" || loading}>
                Search
          </button>
        </div>

    )
}