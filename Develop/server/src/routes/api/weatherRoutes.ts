import { Router, type Request, type Response } from 'express';
const router = Router();

 //import HistoryService from '../../service/historyService.js';
//import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  try {
    const {city} = req.body;
    if (!city || typeof city !== 'string') {
      return res.status(400).json({ error: 'Invalid city name' });
    }
    const weatherData = await WeatherService.getWeatherByCity(city);
    await HistoryService.saveSearch(city);
    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving weather data' });
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getSearchHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
