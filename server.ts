import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { getFixturesFeed } from './src/services/fixturesBackend';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route: Real-time Fixtures & Live Scores
app.get('/api/fixtures', async (req, res) => {
  try {
    const footballDataKey = process.env.FOOTBALL_DATA_API_KEY || process.env.FOOTBALL_DATA_KEY;
    const result = await getFixturesFeed(footballDataKey);
    return res.json(result);
  } catch (err: any) {
    console.error('Error in /api/fixtures:', err);
    res.status(500).json({
      error: 'Failed to retrieve fixtures',
      message: err.message
    });
  }
});

// API route: Check API provider status
app.get('/api/fixtures/status', (req, res) => {
  const hasKey = Boolean(process.env.FOOTBALL_DATA_API_KEY || process.env.FOOTBALL_DATA_KEY);
  res.json({
    provider: hasKey ? 'football-data.org' : 'espn-public',
    apiKeyConfigured: hasKey,
    supportedProviders: ['football-data.org', 'espn'],
    registrationUrl: 'https://www.football-data.org/client/register'
  });
});

// API route: Live Weather Proxy
app.get('/api/weather', async (req, res) => {
  const lat = req.query.lat || 51.6042;
  const lng = req.query.lng || -0.0662;
  const stadium = req.query.stadium || 'Tottenham Hotspur Stadium';

  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1`
    );

    if (weatherRes.ok) {
      const json = await weatherRes.json();
      const current = json.current;
      const temp = Math.round(current.temperature_2m);
      const humidity = Math.round(current.relative_humidity_2m);
      const windMph = Math.round(current.wind_speed_10m * 0.621371);
      const rainProb = json.hourly?.precipitation_probability?.[14] ?? 20;

      let condition = 'Partly Cloudy';
      let icon = 'cloud';
      const code = current.weather_code;
      if (code === 0) { condition = 'Sunny & Clear'; icon = 'sun'; }
      else if (code === 1 || code === 2) { condition = 'Mainly Clear'; icon = 'cloud-sun'; }
      else if (code === 3) { condition = 'Overcast'; icon = 'cloud'; }
      else if (code >= 51 && code <= 65) { condition = 'Light Rain'; icon = 'cloud-rain'; }
      else if (code >= 80) { condition = 'Passing Showers'; icon = 'cloud-rain'; }

      return res.json({
        tempCelsius: temp,
        feelsLikeCelsius: temp - (windMph > 12 ? 2 : 0),
        condition,
        iconCode: icon,
        rainProbability: rainProb,
        windSpeedMph: windMph,
        humidity,
        stadiumName: stadium,
        isAvailable: true
      });
    }
  } catch (err) {
    console.error('Weather proxy error:', err);
  }

  res.status(503).json({ isAvailable: false, error: 'Weather unavailable' });
});

// API route: Live Transit Line Updates
app.get('/api/transport', async (req, res) => {
  try {
    // Attempt TfL public open data feed
    const tflRes = await fetch('https://api.tfl.gov.uk/line/mode/tube,overground/status').catch(() => null);
    if (tflRes && tflRes.ok) {
      const data = await tflRes.json();
      const victoria = data.find((l: any) => l.id === 'victoria');
      const overground = data.find((l: any) => l.id === 'london-overground');

      return res.json([
        {
          id: 'greater-anglia',
          name: 'Greater Anglia',
          mode: 'train',
          status: 'Good service',
          statusSeverity: 0,
          lastUpdated: 'Just now'
        },
        {
          id: 'london-overground',
          name: 'London Overground',
          mode: 'overground',
          status: overground?.lineStatuses?.[0]?.statusSeverityDescription || 'Minor delays',
          statusSeverity: overground?.lineStatuses?.[0]?.statusSeverity || 1,
          reason: overground?.lineStatuses?.[0]?.reason || undefined,
          lastUpdated: 'Just now'
        },
        {
          id: 'victoria-line',
          name: 'Victoria Line',
          mode: 'tube',
          status: victoria?.lineStatuses?.[0]?.statusSeverityDescription || 'Good service',
          statusSeverity: victoria?.lineStatuses?.[0]?.statusSeverity || 0,
          lastUpdated: 'Just now'
        },
        {
          id: 'national-rail',
          name: 'National Rail',
          mode: 'train',
          status: 'Good service',
          statusSeverity: 0,
          lastUpdated: 'Just now'
        }
      ]);
    }
  } catch {
    // Fallback
  }

  res.json([
    { id: 'greater-anglia', name: 'Greater Anglia', mode: 'train', status: 'Good service', statusSeverity: 0, lastUpdated: 'Just now' },
    { id: 'london-overground', name: 'London Overground', mode: 'overground', status: 'Minor delays', statusSeverity: 1, reason: 'Minor delays between Liverpool Street and Enfield Town / Cheshunt.', lastUpdated: '5 mins ago' },
    { id: 'victoria-line', name: 'Victoria Line', mode: 'tube', status: 'Good service', statusSeverity: 0, lastUpdated: 'Just now' },
    { id: 'national-rail', name: 'National Rail', mode: 'train', status: 'Good service', statusSeverity: 0, lastUpdated: '2 mins ago' }
  ]);
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`COYS Matchday Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
