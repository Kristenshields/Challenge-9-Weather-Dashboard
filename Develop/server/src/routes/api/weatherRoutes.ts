import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const {city} = req.body;
    console.log(city);
    if (!city || typeof city !== 'string') {
      return res.status(500).json({ error: 'Invalid city name' });
    }
    const weatherData = await WeatherService.getWeatherForCity(city);
    
    await HistoryService.addCity(city);
    return res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while retrieving weather data' });
  }
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City id is reuired'});
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history'});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
export default router;
