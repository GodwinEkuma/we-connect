import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import Business from './routes/business';
import Users from './routes/users';

const app = express();
const swaggerDocument = YAML.load('./server/docs/swagger.yaml');

// enable cors
app.use(cors({ credentials: true, origin: true }));

// Configure middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure the routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to we-connect where businesses and humans meet' });
});
app.use('/api/v1', Business);
app.use('/api/v1', Users);
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Welcome to the begining of nothingness' });
});

// Configure the port
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

export default app;
