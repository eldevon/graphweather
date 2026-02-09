// Domain entities
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

export interface ActivityRanking {
  activity: string;
  score: number;
}


export enum ActivityType {
  SKIING = 'Skiing',
  SURFING = 'Surfing',
  INDOOR_SIGHTSEEING = 'Indoor Sightseeing',
  OUTDOOR_SIGHTSEEING = 'Outdoor Sightseeing'
}
