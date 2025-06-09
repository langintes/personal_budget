const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/',(req,res,next) => {
    const message = 'Hello, World';
    res.send(message);
});

module.exports = apiRouter;