import express from 'express';
import { engine } from 'express-handlebars';
import { getHome, postHome, saveImage } from '../router/routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Добавьте это
// app.use(express.static('../public'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', getHome);
app.post('/', postHome);
app.post('/saveImage', saveImage); // И это

export default app;
