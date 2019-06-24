const express = require('express');
const app = express();
const data = require('./file/movies.json');
const Sequelize = require('sequelize');
const port = process.env.PORT || 3000;
const routes = express.Router();


app.use(express.json());
app.use(routes);

// dbConfig
const sequelize = new Sequelize('OB38fuFnUN', 'OB38fuFnUN', 'GtaClODPhi', {
  host: 'remotemysql.com',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// seed DB

// sequelize
//   .sync({
//       logging: console.log,
//       force: true
//   })
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .then(() => {
//     data.map(movie => {
//       let directorName = movie['Director'].trim();
//       Director.findOrCreate({
//         where: {
//           Name: directorName
//         }
//       })
//       .then(data => {
//         delete movie['Director'];
//         movie['directorId'] = data[0].dataValues.id;
//         Movie.create(movie)
//       })
//     });
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });



// Director Model
const Director = sequelize.define('director', {
    'Name': {
    type: Sequelize.STRING,
    },
});

// Movie Model
const Movie = sequelize.define('movie', {
    'Title': {
    type: Sequelize.STRING,
    },
    'Description': {
    type: Sequelize.STRING,
    },
    'Runtime': {
    type: Sequelize.INTEGER,
    },
    'Genre': {
    type: Sequelize.STRING,
    },
    'Rating': {
    type: Sequelize.INTEGER,
    },
    'Metascore': {
    type: Sequelize.INTEGER,
    },
    'Votes': {
    type: Sequelize.INTEGER,
    },
    'Gross_Earning_in_Mil': {
    type: Sequelize.INTEGER,
    },
    'Actor': {
    type: Sequelize.STRING,
    },
    'Year': {
    type: Sequelize.INTEGER,
    }
});

// table association
Director.hasMany(Movie);

// create movie
app.post('/api/movies', (req, res) => {
  let movie = req.body;
  Movie.create(movie)
  .then(() => {
    res.redirect('/api/movies');
  });
});

// read all movies
app.get('/api/movies', (req, res) => {
  Movie.findAll()
  .then(movies => {
    res.send(movies)
  });
});

// read single movie with given id
app.get('/api/movies/:id', (req, res) => {
  let id = req.params.id;
  Movie.findByPk(id)
  .then(movie => {
    res.send(movie)
  });
});

// update movie with given id
app.put('/api/movies/:id', (req, res) => {
  let id = req.params.id;
  let movie = req.body;

  Movie.update(movie, {
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect(`/api/movies/${id}`);
  });
});

// delete movie with given id
app.delete('/api/movies/:id', (req, res) => {
  let id = req.params.id;
  Movie.destroy({
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect('/api/movies');
  });
});

// create director
app.post('/api/directors', (req, res) => {
  let director = req.body;
  Director.create(director).then(() => {
    res.redirect('/api/directors');
  });
});

// read all director
app.get('/api/directors', (req, res) => {
  Director.findAll().then(directors => {
    res.send(directors)
  });
});

// read single director with given id
app.get('/api/directors/:id', (req, res) => {
  let id = req.params.id;
  Director.findByPk(id).then(director => {
    res.send(director)
  });
});

// update single director with given id
app.put('/api/directors/:id', (req, res) => {
  let id = req.params.id;
  let director = req.body;

  Director.update(director, {
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect(`/api/directors/${id}`);
  });
});
// delete single director with given id
app.delete('/api/directors/:id', (req, res) => {
  let id = req.params.id;
  Director.destroy({
    where: {
      'id': id
    }
  })
  .then(() => {
    res.redirect('/api/directors');
  });
});

app.listen(port, () => {
  console.log(`server started at http://127.0.0.1:${port}`);
})
