const express = require('express');
const morgan = require('morgan');

const app = express();

module.exports = app;
// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api',apiRouter);

// GET test
app.get('/',(req,res,next) => {
    const message = 'Hello, World';
    res.send(message);
});

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

