import { createImage } from './service/openaiServuce.js';

export const getHome = (_, res) => {
  res.render('index');
};

export const postHome = async (req, res) => {
  const prompt = req.body.prompt;
  const size = req.body.size ?? '256x256';
  const number = req.body.number ?? 1;

  try {
    const response = await createImage(prompt, size, number);
    res.render('index', {
      Image: response.data.data,
    });
  } catch (e) {
    res.render('index', {
      error: e.message,
    });
  }
};
