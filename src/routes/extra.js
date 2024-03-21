import { Router } from 'express';
const extra = Router();

extra.get('/about', (req, res) => {
  res.send('About Page');
});

extra.get('/notifications', (req, res) => {
  res.send('Notifications page content here.');

});

export default extra;
