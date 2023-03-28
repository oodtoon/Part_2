import axios from 'axios'
const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = process.env.REACT_APP_API_KEY

const getWeather = (cityName) => {
    return axios.get(baseURL+`?q=${cityName}&appid=${API_KEY}`)
}

export default {
    getWeather
}