const express = require('express');

const app = express();

const morgan = require('morgan');

const port = process.env.PORT || 3000;

// getting routes
const movieRoutes = require('./routes/movieRoutes');
const directorRoutes = require('./routes/directorRoutes');

const logger = require('./logger');

app.use(logger);
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/movies', movieRoutes);
app.use('/api/directors', directorRoutes);

// server starting function
app.listen(port, () => {
  console.log(`Server started at http://127.0.0.1:${port}`);
});
