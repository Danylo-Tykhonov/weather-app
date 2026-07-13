import "./Search.css"

export default function Search({city, setCity, onSearch, loading}){
    return(
        <div className="search">
            <input 
            className="search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                     onSearch();
                }
             }}
        />
         
         <div>
         <button className="search-button" onClick={onSearch} disabled={city.trim() ===   "" || loading}>
                Search
          </button>
          </div>
        </div>

    )
}