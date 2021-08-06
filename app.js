const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs');

// express app
const app = express();

// mongoDbURI
const mongoDbUri = 'mongodb+srv://aahad:aahadtest1234@expressblogsite.y9kmb.mongodb.net/expressblogdatabase?retryWrites=true&w=majority'

// connect mongoDb with mongoose
mongoose.connect(mongoDbUri).then(res => {
  console.log('-----Connected to DB!-----')
  // listen for requests
  app.listen(3000);
}).catch(err => {
  console.log('-----Unable to connect to DB!-----')
})

// register view engine
app.set('view engine', 'ejs');
// use middleware for static files
app.use(express.static('public'));
// url encoding middleware
app.use(express.urlencoded());
// use morgan to log
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});