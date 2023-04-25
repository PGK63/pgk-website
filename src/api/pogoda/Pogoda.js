
const API_key = "8204a85e19dcde428041024b18da9321";
const base= 'http://api.openweathermap.org/data/2.5/';

export default class WeatherService {
static async Pogoda (){

    const response = await fetch(`${base}weather?q=Samara&units=metric&appid=${API_key}`)
    const data = await response.json();
    Math.trunc(data.main.temp);

    console.log(data.main.temp);
return data
}

}
