import express from 'express';
import dotenv from 'dotenv';
import swaggerDocs from './swagger.js';
import userRoutes from './routes/UserRoutes/userRoutes.js';
import plantRoutes from './routes/PlantRoutes/plantRoutes.js';
import sensorRoutes from './routes/sensors/sensorRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware
app.use(express.json());
swaggerDocs(app);

app.use(userRoutes);
app.use(sensorRoutes);
app.use(plantRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is live http://localhost:${PORT}/`);
  console.log(
    `Swagger docs documentation is available at http://localhost:${PORT}/api-docs`
  );
});
