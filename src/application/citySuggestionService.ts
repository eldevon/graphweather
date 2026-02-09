import { GeolocationAPI } from '../domain/interfaces';
import { CitySuggestion } from '../domain/entities';

export class CitySuggestionService {
  constructor(private geolocationApi: GeolocationAPI) {}

  async suggestCities(query: string): Promise<CitySuggestion[]> {
    return this.geolocationApi.getCitySuggestions(query);
  }
}
