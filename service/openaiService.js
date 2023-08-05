import { OpenAIApi } from 'openai';
import configuration from '../config/config';

const openai = new OpenAIApi(configuration);
export const createImage = async (prompt, size = '256x256', number = 1) => {
  return await openai.createImage({
    prompt,
    size,
    n: Number(number),
  });
};
