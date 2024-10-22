import fs from 'node:fs/promises';


// TODO: Define a City class with name and id properties
class City {
    name: string;
    id: string;

    constructor(name: string, id: string) {
        this.name = name;
        this.id = id;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
  
    // TODO: Define a read method that reads from the searchHistory.json file
    private async read(): Promise<City[]> {
        
    const data = await fs.readFile('db/db.json', 'utf-8');
     return JSON.parse(data);        
      
    }

    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    private async write(cities: City[]): Promise<void> {
        try {
          const data = JSON.stringify(cities, null, 2); // Pretty print JSON
          await fs.writeFile('db/db.json', data, 'utf-8'); // Write to file
        } catch (error) {
          throw new Error('Error writing to search history file');
        }
      }

    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities(): Promise<City[]> {
        return await this.read();
      }

    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(cityName: string): Promise<void> {
        const cities = await this.getCities();
        const newCity = new City(cityName, this.generateId()); // Generate a unique ID for the city
        cities.push(newCity);
        await this.write(cities);
      }

    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id: string): Promise<void> {
        const cities = await this.getCities();
        const updatedCities = cities.filter(city => city.id !== id); // Remove city by ID
        await this.write(updatedCities);
      }
    
      private generateId(): string {
        return Math.random().toString(36).substr(2, 9); // Generate random string as ID
      }
    }
  
  export default new HistoryService();
  