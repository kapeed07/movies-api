const express = require('express');

const app = express();

const port = process.env.PORT || 3000;
// dbConfig
const sequelize = require('./dbConfig')

// Models
const Director = require('./models/directorModel')(sequelize);
const Movie = require('./models/movieModel')(sequelize);

// getting routes
const movieRoutes = require('./routes/movieRoutes')(Movie);
const directorRoutes = require('./routes/directorRoutes')(Director);

app.use(express.json());
app.use('/api/movies', movieRoutes);
app.use('/api/directors', directorRoutes);

// server starting function
app.listen(port, () => {
  console.log(`Server started at http://127.0.0.1:${port}`);
})
