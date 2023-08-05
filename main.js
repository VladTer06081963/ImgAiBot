import express from 'express';
import { engine } from 'express-handlebars';
import { Configuration, OpenAIApi } from 'openai';
import { config } from 'dotenv';
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (_, res) => {
  res.render('index');
});

app.post('/', async (req, res) => {
  const prompt = req.body.prompt;
  const size = req.body.size ?? '256x256';
  const number = req.body.number ?? 1;

  try {
    const response = await openai.createImage({
      prompt,
      size,
      n: Number(number),
    });
    res.render('index', {
      Images: response.data.data,
    });
  } catch (e) {
    res.render('index'),
      {
        error: e.message,
      };
  }
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
