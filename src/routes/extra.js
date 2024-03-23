import { Router } from 'express';
import axios from 'axios';

const extra = Router();

extra.get('/about', (req, res) => {
  res.send('About Page');
});

// status route
extra.get('/status', async (req, res) => {
  const uri = 'https://www.google.com';

  try {
    await axios.get(uri, { timeout: 5000 }); 
    res.json({ status: 'ok' });
  } catch (error) {
    res.json({ status: 'down' });
  }
});



export default extra;
