# The Weather API

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AndriiSolomka/Nestjs-weather-api.git

2. **Open project:**

   ```bash
   cd Nestjs-weather-api

3. **Install dependencies:**

   ```bash
   npm install
   
4. **Copy the .env.example.txt file to .env**

5. Run Docker
   
   ```bash
   docker-compose up --build

### To Record Weather Data in the Database

To record weather data in the database, send a **POST** request to: **localhost:3000/weather**

With the following JSON data:

```json
{
    "lat": 30,
    "lon": 40,
    "part": "minutely"
}
```

### To Retrieve Weather Data
To retrieve weather data, send a GET request to: **localhost:3000/weather?lat=30&lon=40&part=minutely**
