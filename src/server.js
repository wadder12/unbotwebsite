import express from 'express';
import session from 'express-session';
import path from 'path';
import main from './routes/main.js';
import auth from './routes/auth.js'; 
import extra from './routes/extra.js';
import { getLocalIP } from './utils/networkUtils.js';
import { env } from 'process';

const app = express();
const port = 6559;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  secure: false, // Set this to true when using HTTPS
  httpOnly: true, // Prevent client-side scripts from accessing the cookie
  sameSite: 'strict', 
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// app routes
app.use('/', main);
app.use('/api', auth); 
app.use('/new', extra);

//start it 
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Also accessible on your local network at http://${getLocalIP()}:${port}`);
});
