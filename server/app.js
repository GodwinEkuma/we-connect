import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Business from './routes/business';
import Users from './routes/users';

const app = express();

// Configure middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure the routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to we-connect where businesses and humans meet' });
});
app.get('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to we-connect where businesses and humans meet' });
});
app.use('/api/v1', Business);
app.use('/api/v1', Users);

// Configure the port
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

export default app;
