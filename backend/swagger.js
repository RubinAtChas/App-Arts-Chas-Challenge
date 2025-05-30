import fs from 'fs';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'App Arts Plant API',
      version: '1.0.0',
      description: 'API documentation for the Plant Monitoring application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

// Skriv bara ut Swagger-specfil i utvecklingsmiljö
if (process.env.NODE_ENV !== 'production') {
  fs.writeFileSync(
    './swagger-output.json',
    JSON.stringify(swaggerSpec, null, 2),
    'utf8'
  );
}
