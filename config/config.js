import { Configuration } from 'openai';
import { config } from 'dotenv';
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

// export const openai = new OpenAIApi(configuration);
export const PORT = process.env.PORT || 3000;

// export default configuration;
export { configuration };
