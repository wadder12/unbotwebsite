import { Router } from 'express';
const main = Router();

main.get('/', (req, res) => {
  res.render('index', { 
    title: 'Home Page' });
});

// route dashy
main.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('dashboard', { 
    user: req.session.user,
    title: 'Dashboard' 
  });
});

export default main;
