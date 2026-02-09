
// External API Interfaces
export interface GeolocationAPI {
  getCitySuggestions(query: string): Promise<CitySuggestion[]>;
}

export interface WeatherAPI {
  getWeather(latitude: number, longitude: number): Promise<WeatherForecast>;
}

// These types are exported
export interface CitySuggestion {
  name: string;
  country?: string;
  latitude: number;
  longitude: number;
}

export interface WeatherForecast {
  city: string;
  temperature: number; // Celsius
  condition: string;
  precipitation: number; // mm
  windSpeed: number; // m/s
  date: Date;
}
