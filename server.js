const express = require('express');
const morgan = require('morgan');

const app = express();

module.exports = app;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api',apiRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

