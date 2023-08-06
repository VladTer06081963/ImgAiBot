//новый вариант с массивом рисунков

// import axios from 'axios';
// import fs from 'fs';
// import path from 'path';
// import { createImage } from '../service/openaiService.js';
// import { fileURLToPath } from 'url';

// Получаем путь к текущему модулю
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let images = [];

// try {
//   images = JSON.parse(
//     fs.readFileSync(path.resolve(__dirname, 'images.json'), 'utf-8')
//   );
// } catch (error) {
//   console.log('Failed to load images from file', error);
// }

// try {
//   images = JSON.parse(
//     fs.readFileSync(path.resolve(__dirname, 'images.json'), 'utf-8')
//   );
// } catch (error) {
//   console.log('Failed to load images from file', error);
// }

// export const getHome = (_, res) => {
//   res.render('index');
// };

// export const postHome = async (req, res) => {
//   const prompt = req.body.prompt;
//   const size = req.body.size ?? '256x256';
//   const number = req.body.number ?? 1;

//   try {
//     const response = await createImage(prompt, size, number);
//     res.render('index', {
//       Images: response.data.data,
//     });
//   } catch (e) {
//     res.render('index', {
//       error: e.message,
//     });
//   }
// };

// const downloadImage = async (url, imagePath) => {
//   const response = await axios.get(url, { responseType: 'stream' });
//   response.data.pipe(fs.createWriteStream(imagePath));
// };

// export const saveImage = async (req, res) => {
//   const imageUrl = req.body.url;
//   const imageName = `${images.length}.png`;
//   const savePath = path.resolve(__dirname, 'public', 'images', imageName);

//   try {
//     await downloadImage(imageUrl, savePath);
//     images.push(imageName);

//     fs.writeFileSync(
//       path.resolve(__dirname, 'images.json'),
//       JSON.stringify(images)
//     );

//     res.send({ status: 'success' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ status: 'failed' });
//   }
// };

//New Cod

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { createImage } from '../service/openaiService.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let imageCounter = 0;

try {
  imageCounter = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../imageCounter.json'), 'utf-8')
  );
} catch (error) {
  console.log('Failed to load image counter from file', error);
}

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
      Images: response.data.data,
    });
  } catch (e) {
    res.render('index', {
      error: e.message,
    });
  }
};

const downloadImage = (url, imagePath) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { responseType: 'stream' })
      .then((response) => {
        const writer = fs.createWriteStream(imagePath);
        writer.on('finish', resolve);
        writer.on('error', reject);
        response.data.pipe(writer);
      })
      .catch((error) => {
        console.log('Failed to download image', error);
        reject(error);
      });
  });
};

export const saveImage = async (req, res) => {
  const imageUrl = req.body.url;
  const imageName = `${imageCounter}.png`;
  const savePath = path.resolve(process.cwd(), 'public', 'images', imageName);

  try {
    await downloadImage(imageUrl, savePath);
    imageCounter++;

    try {
      fs.writeFileSync(
        path.resolve(process.cwd(), 'imageCounter.json'),
        JSON.stringify(imageCounter)
      );
    } catch (error) {
      console.log('Failed to write image counter to file', error);
    }

    res.send({ status: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'failed' });
  }
};
