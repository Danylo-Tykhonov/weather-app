export default function Search({city, setCity, onSearch, loading}){
    return(
        <div className="search-button">
         <input 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                     onSearch();
                }
             }}
        />
         <button onClick={onSearch} disabled={city.trim() ===   "" || loading}>
                Search
          </button>
        </div>

    )
}