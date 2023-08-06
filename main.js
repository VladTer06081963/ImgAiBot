import app from './server/server.js';
import { PORT } from './config/config.js';

// const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
