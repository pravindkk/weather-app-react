import React, {useState} from "react"


const api = {
  key: "e6dd88a749dd83987599270a64fb1099",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  

  const search = evt => {
    
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res=> res.json())
        .then(result => {
          setWeather(result)
          setQuery('')
          
        })
    }
  }

  const dateCreator = (passedDate) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let day = days[passedDate.getDay()] 
    let date = passedDate.getDate() 
    let month = months[passedDate.getMonth()] 
    let year = passedDate.getFullYear() 

    return `${day} ${date} ${month} ${year}`
  }
  
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'weather-app warm' : 'weather-app') : 'weather-app'}>
      <main>
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..."
            onChange={ev => setQuery(ev.target.value)} 
            value={query}
            onKeyPress={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-container">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateCreator(new Date())}</div>
          </div>
          <div className="weather-container">
            <div className="temp">{Math.round(weather.main.temp)}°</div>
            {/* <div className="weather">{weather.weather[0].main}</div> */}
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
