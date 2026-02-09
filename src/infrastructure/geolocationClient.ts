import axios from 'axios';
import { GeolocationAPI, CitySuggestion } from '../domain/interfaces';

export class OpenMeteoGeolocationClient implements GeolocationAPI {
  async getCitySuggestions(query: string): Promise<CitySuggestion[]> {
    const response = await axios.get(
      'https://geocoding-api.open-meteo.com/v1/search',
      { params: { name: query, limit: 5 } }
    );

    const results = response.data.results || [];
    return results.map((res: any) => ({
      name: res.name,
      country: res.country,
      latitude: res.latitude,
      longitude: res.longitude,
    }));
  }
}
