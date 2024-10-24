import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number
  windSpeed: number
  humidity: number
  description: string
  date: number
  icon: string
  constructor(
    temperature: number,
    windSpeed: number,
    humidity: number,
    description: string,
    date: number,
    icon: string
  ) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.description = description;
    this.date = date;
    this.icon = icon;

  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = 'https://api.openweathermap.org/data/2.5';
  private apiKey = process.env.WEATHER_API_KEY || ''; // Load from .env


  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string): Promise<any> {
  //   const geocodeURL = this.buildGeocodeQuery(query);
  //   const response = await fetch(geocodeURL);
  //   const locationData = await response.json();
  //   return locationData;
  // }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: any): Coordinates {
  //   const { lat, lon } = locationData[0];
  //   return { latitude: lat, longitude: lon };
  // }
  // // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(query: string): string {
  //   console.log("buildGeocodeQuery",query);
  //   return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
  // }
  // Fetch location data based on city name
  private async fetchLocationData(city: string): Promise<Coordinates> {
    const queryURL = `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    const response = await fetch(queryURL);
    // console.log(response, "fetchLocationData");
    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }
    const data = await response.json();
    //console.log(data);
    return this.destructureLocationData(data);
  }
  // Destructure location data to get coordinates
  private destructureLocationData(locationData: any): Coordinates {
    return {
      lat: locationData.coord.lat,
      lon: locationData.coord.lon,
    };
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return `${this.baseURL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData(city: string): Promise<Coordinates> {
  //   const locationData = await this.fetchLocationData(city);
  //  // console.log(locationData, "fetchAndDestructureLocationData");

  // }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    const data = response.json();

    return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.main.temp;
    const windSpeed = response.wind.speed;
    const humidity = response.main.humidity;
    const description = response.weather[0].description;
    const date = response.dt;
    const icon = response.weather[0].icon;

    return new Weather(temperature, windSpeed, humidity, description, date, icon);
  }
  // TODO: Complete buildForecastArray method
  public processWeatherData(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = this.buildForecastArray(currentWeather, weatherData); // Call the method here
    // Do something with the forecastArray, like logging or storing it
    console.log(forecastArray);
  }
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    for (const dataPoint of weatherData) {
      const temperature = dataPoint.main.temp;
      const windSpeed = dataPoint.wind.speed;
      const humidity = dataPoint.main.humidity;
      const description = dataPoint.weather[0].description;
      const date = dataPoint.dt;
      const icon = dataPoint.weather[0].icon;
      const forecast = new Weather(temperature, windSpeed, humidity, description, date, icon);
      forecastArray.push(forecast);
    }
    forecastArray.unshift(currentWeather);
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    console.log("getWeatherForCity");
    const coordinates = await this.fetchLocationData(city);
    // console.log(coordinates);
    const weatherData = await this.fetchWeatherData(coordinates);
    console.log(weatherData);

    return this.parseCurrentWeather(weatherData);
  }
}


export default new WeatherService();
