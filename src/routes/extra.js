import { Router } from 'express';
const extra = Router();

extra.get('/about', (req, res) => {
  res.send('About Page');
});

export default extra;
