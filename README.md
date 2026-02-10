# Travel API

A GraphQL-based travel recommendation API that suggests cities, provides weather forecasts, and ranks activities based on weather conditions.

## Features

- **City Suggestions**: Search and get city recommendations with geographic coordinates
- **Weather Forecasts**: Real-time weather data for any location
- **Activity Ranking**: Intelligent activity suggestions based on current weather conditions
- **GraphQL API**: Modern, flexible API built with Apollo Server

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **API**: Apollo Server with GraphQL
- **Testing**: Jest
- **Data Sources**: OpenMeteo Geolocation & Weather APIs
- **Containerization**: Docker & Docker Compose

## Project Structure

```
travel-api/
├── src/
│   ├── server.ts                 # Application entry point
│   ├── application/              # Business logic layer
│   │   ├── activityRankingService.ts
│   │   ├── citySuggestionService.ts
│   │   └── weatherService.ts
│   ├── domain/                   # Domain models
│   │   ├── entities.ts
│   │   └── interfaces.ts
│   ├── infrastructure/           # External integrations
│   │   ├── geolocationClient.ts
│   │   └── weatherClient.ts
│   ├── presentation/             # GraphQL layer
│   │   ├── resolvers.ts
│   │   └── schema.ts
│   └── tests/                    # Test suite
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── jest.config.js
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose (optional, for containerized deployment)

### Installation

1. Navigate to the travel-api directory:
```bash
cd travel-api
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode
```bash
npm run dev
```
The GraphQL server will start at `http://localhost:4000`

#### Build & Production
```bash
npm run build
npm start
```

#### With Docker
```bash
docker-compose up
```

## Usage

### GraphQL Endpoints

#### Suggest Cities
```graphql
query {
  suggestCities(query: "Paris") {
    name
    country
    latitude
    longitude
  }
}
```

#### Get Weather Forecast
```graphql
query {
  getWeather(city: "Paris") {
    city
    temperature
    condition
    precipitation
    windSpeed
    date
  }
}
```

#### Get Activity Ranking
```graphql
query {
  getActivityRanking(city: "Paris") {
    activity
    score
  }
}
```

## Testing

Run the test suite:
```bash
npm test
```

Test files are located in `src/tests/` and include:
- Unit tests for activity ranking service
- Integration tests for GraphQL endpoints
- Simple service tests

## Architecture

### Application Layer (`application/`)
Contains business logic services that orchestrate domain models and coordinate with infrastructure.

### Domain Layer (`domain/`)
Defines core business entities and interfaces that represent the problem domain.

### Infrastructure Layer (`infrastructure/`)
Handles external API integrations (OpenMeteo for geolocation and weather data).

### Presentation Layer (`presentation/`)
GraphQL schema definitions and resolvers that expose the API to clients.

## API Reference

### Types

**CitySuggestion**
- `name: String!` - City name
- `country: String` - Country name
- `latitude: Float!` - Latitude coordinate
- `longitude: Float!` - Longitude coordinate

**WeatherForecast**
- `city: String!` - City name
- `temperature: Float!` - Temperature in Celsius
- `condition: String` - Weather condition description
- `precipitation: Float!` - Precipitation in mm
- `windSpeed: Float!` - Wind speed in km/h
- `date: String!` - Forecast date

**ActivityRanking**
- `activity: String!` - Activity name
- `score: Float!` - Suitability score (0-10)

## Configuration

- **Port**: 4000 (configurable in `server.ts`)
- **External APIs**: OpenMeteo API (free, no authentication required)

## Development

### Building TypeScript
```bash
npm run build
```

### Project Scripts
- `npm test` - Run Jest test suite
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled application
- `npm run dev` - Run development server with hot reload

## License

ISC

## Version

1.0.0
