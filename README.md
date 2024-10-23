Weather Dashboard Application


This repository contains the back-end code and deployment configuration for a weather dashboard application that displays current and future weather forecasts for multiple cities. The application integrates with the OpenWeather API to fetch weather data and provides a user-friendly interface to display this information.

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Features](#features)
- [API Integration](#api-integration)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [License](#license)

## Description
This weather dashboard application helps travelers plan their trips by providing real-time and forecasted weather conditions for selected cities. The application is built with a front-end interface, and this project focuses on connecting the back-end with the front-end to deliver data from the OpenWeather API. The application also supports a search history feature, enabling users to revisit previously searched cities.

## User Story
```css
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria
```vbnet
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city, and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with:
    - City name
    - Current date
    - Icon representation of weather conditions
    - Weather description for the icon's alt tag
    - Temperature
    - Humidity
    - Wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast displaying:
    - Date
    - Icon representation of weather conditions
    - Temperature
    - Wind speed
    - Humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future weather conditions for that city
```

## Features
- **City Search**: Users can input city names to retrieve current and future weather data.
- **Search History**: Previously searched cities are saved, allowing quick access to their weather details.
- **5-Day Forecast**: Displays a detailed forecast with key weather metrics for the upcoming five days.
- **Current Weather**: Shows the current weather conditions including an icon, temperature, wind speed, humidity, and more.

## API Integration
The weather data is retrieved using the OpenWeather API's 5-day weather forecast endpoint:
```bash
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
```
To work with the API:
1. Register for an API key from OpenWeather.
2. Be aware that it may take up to 2 hours for the API key to activate after registration.
3. Refer to the OpenWeather API documentation for detailed usage.

## Getting Started

### Prerequisites
- Node.js installed on your local machine.
- API key from OpenWeather API.

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/weather-dashboard.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the project root and add your API key:
    ```bash
    API_KEY=your_openweather_api_key
    ```
4. Run the application locally:
    ```bash
    npm start
    ```

### Usage
Open your browser and navigate to `http://localhost:3000`. Enter a city name in the search bar and click search to retrieve weather information.

## Deployment
This application is deployed using Render. To deploy the app:
1. Connect your GitHub repository to Render.
2. Set up environment variables (e.g., `API_KEY`).
3. Deploy your application following the Render documentation.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


